from flask import Blueprint, request, jsonify, Response
from models.usuario_generico import UsuarioGenerico
from schemas.usuario_generico_schema import UsuarioGenericoSchema
from flask_jwt_extended import get_jwt_identity, jwt_required
import requests
from config import DevelopmentConfig
from models.establecimiento import Establecimiento
from uploads_config import photos
from marshmallow import ValidationError

blueprint = Blueprint("UsuarioGenerico", "usuario_generico", url_prefix="/usuario_generico")

url_actividad = f"{DevelopmentConfig.BASE_URL}/actividades"
url_review = f"{DevelopmentConfig.BASE_URL}/reviews"

@blueprint.route("", methods=["POST"])
def crear_usuario_generico():
    if 'imagen' in request.files and request.files['imagen'].filename != '':
        filename = photos.save(request.files['imagen'])
        imagen_url = f"/_uploads/photos/{filename}"
        data = request.form.to_dict()
        data['imagen_url'] = imagen_url
    else:
        data = request.form.to_dict()
        data['imagen_url'] = f'/_uploads/photos/default.png'
        data.pop('imagen')

    data['preferencias'] = data['preferencias'].split(',')
    schema = UsuarioGenericoSchema()
    
    try:
        datos_validados = schema.load(data)
        nuevo_usuario = UsuarioGenerico(datos_validados)
        respuesta = nuevo_usuario.insertar_usuario_generico()
        return respuesta, 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except ValidationError as e:
        errors = e.messages
        first_error_key = next(iter(errors))
        error_message = errors[first_error_key][0]
        return jsonify({"error": error_message}), 400
    except Exception as e:
        return jsonify({"error": f"{e}"}), 500

@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_usuario(id):
    try:
        respuesta = UsuarioGenerico.eliminar_usuario_generico(id)
        return respuesta, 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500

@blueprint.route("", methods=["GET"])
def consultar_usuarios():
    try:
        respuesta = UsuarioGenerico.consultar_usuarios()
        return Response(respuesta, mimetype="application/json"), 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500

@blueprint.route("/<id>", methods=["GET"])
def consultar_unico_usuario(id):
    try:
        respuesta = UsuarioGenerico.consultar_usuario(id)
        return Response(respuesta, mimetype="application/json"), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500

@blueprint.route("/<id>", methods=["PUT"])
def actualizar_usuario(id):
    data = request.json
    
    try:
        respuesta = UsuarioGenerico.actualizar_usuario(id, data)
        return respuesta, 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500

@blueprint.route("/nueva_actividad", methods=["POST"])
def add_actividad():
    data = request.json
    id_usuario_creador = data.get("id_usuario_creador")
    
    try:
        respuesta_json = requests.post(url_actividad, json=data).json()
        id_actividad = respuesta_json.get("id")
        UsuarioGenerico.add_actividad_usuario(id_usuario_creador, id_actividad)
        return respuesta_json, 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Error en la solicitud al servicio de actividades", "detalles": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Error general al añadir actividad al usuario", "detalles": str(e)}), 500

@blueprint.route("/seguir_usuario", methods=["POST"])
@jwt_required()
def seguir_usuario():
    data = request.json
    nombre_usuario = data.get("nombre_usuario")
    usuario = get_jwt_identity()
    id_usuario = usuario.get("_id")

    id_seguir_usuario = UsuarioGenerico.existe_nombre_usuario(nombre_usuario)
    if id_seguir_usuario is not None:
        try:
            respuesta = UsuarioGenerico.add_seguidos_usuario(id_usuario, id_seguir_usuario)
            return respuesta, 200
        except RuntimeError as e:
            return jsonify({"error": str(e)}), 500
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"message": "No existe el usuario con nombre: " + nombre_usuario}), 400
    
@blueprint.route("/invita_actividad", methods=["POST"])
def invita_actividad():
    data = request.json
    id_actividad = data.get("id_actividad")
    id = data.get("id_usuario")

    print(data)
    try:
        respuesta = UsuarioGenerico.invita_actividad(id, id_actividad)
        return respuesta, 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500

@blueprint.route("/participa", methods=["POST"])
@jwt_required()
def participa():
    data = request.json
    id_actividad = data.get("id_actividad")
    usuario = get_jwt_identity()
    id_usuario = usuario.get("_id")
    nombre_usuario = usuario.get("nombre_usuario")

    try:
        respuesta = UsuarioGenerico.usuario_participa_actividad(id_usuario, id_actividad)
        return respuesta, 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500

@blueprint.route("/no_participa", methods=["POST"])
@jwt_required()
def no_participa():
    data = request.json
    id_actividad = data.get("id_actividad")
    usuario = get_jwt_identity()
    id_usuario = usuario.get("_id")

    try:
        respuesta = UsuarioGenerico.usuario_no_participa_actividad(id_usuario, id_actividad)
        return respuesta, 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500

@blueprint.route("/review", methods=["POST"])
@jwt_required()
def crear_review():
    data = request.json
    usuario = get_jwt_identity()
    id_usuario = str(usuario.get("_id"))

    data["id_usuario"] = str(id_usuario)

    id_establecimiento = data.get("id_establecimiento")

    try:
        respuesta_json = requests.post(url_review, json=data).json()
        id_review = respuesta_json.get("id_review")
        UsuarioGenerico.add_review_usuario(id_usuario, id_review)
        Establecimiento.add_review_establecimiento(id_establecimiento, id_review)
        return respuesta_json, 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Error en la solicitud de creación de review", "detalles": str(e)}), 400
    except ValidationError as e:
        return jsonify({"error": f"Error de validación: {e.messages}"}), 400
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500

