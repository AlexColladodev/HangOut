from flask import Blueprint, request, jsonify, Response
from models.usuario_generico import UsuarioGenerico
from schemas.usuario_generico_schema import UsuarioGenericoSchema
from flask_jwt_extended import get_jwt_identity, jwt_required
import requests

blueprint = Blueprint("UsuarioGenerico", "usuario_generico", url_prefix="/usuario_generico")

@blueprint.route("", methods=["POST"])
def crear_usuario_generico():
    datos_usuario = request.json
    schema = UsuarioGenericoSchema()
    
    try:
        datos_validados = schema.load(datos_usuario)
        nuevo_usuario = UsuarioGenerico(datos_validados)
        nuevo_usuario.insertar_usuario_generico()
        return jsonify({"message": "Usuario creado con éxito"}), 200
    except Exception as e:
        return jsonify({"error": "Error al crear usuario", "detalles": str(e)}), 500


@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_usuario(id):
    try:
        respuesta = UsuarioGenerico.eliminar_usuario_generico(id)
        return respuesta
    except Exception as e:
        return jsonify({"error": "Error al eliminar usuario", "detalles": str(e)}), 500


@blueprint.route("", methods=["GET"])
def consultar_usuarios():
    try:
        respuesta = UsuarioGenerico.consultar_todos_usuarios()
        return Response(respuesta, mimetype="application/json")
    except Exception as e:
        return jsonify({"error": "Error al consultar usuarios", "detalles": str(e)}), 500


@blueprint.route("/<id>", methods=["GET"])
def consultar_unico_usuario(id):
    try:
        respuesta = UsuarioGenerico.consultar_usuario(id)
        return Response(respuesta, mimetype="application/json")
    except Exception as e:
        return jsonify({"error": "Error al consultar usuario", "detalles": str(e)}), 500


@blueprint.route("/<id>", methods=["PUT"])
def actualizar_usuario(id):
    data = request.json
    
    try:
        respuesta = UsuarioGenerico.actualizar_usuario(id, data)
        return respuesta
    except Exception as e:
        return jsonify({"error": "Error al actualizar usuario", "detalles": str(e)}), 500


@blueprint.route("/nueva_actividad", methods=["POST"])
def add_actividad():
    data = request.json
    id_usuario_creador = data.get("id_usuario_creador")
    
    try:
        respuesta_json = requests.post("http://127.0.0.1:5000/actividades", json=data).json()
        id_actividad = respuesta_json.get("id")
        UsuarioGenerico.add_actividad_usuario(id_usuario_creador, id_actividad)
        return respuesta_json
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

    respuesta_bool, id_seguir_usuario = UsuarioGenerico.existe_nombre_usuario(nombre_usuario)
    if respuesta_bool:
        try:
            respuesta = UsuarioGenerico.add_seguidos_usuario(id_usuario, id_seguir_usuario)
            return respuesta
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"message": "No existe el usuario con nombre: " + nombre_usuario}), 400


@blueprint.route("/participa", methods=["POST"])
@jwt_required()
def participa():
    data = request.json
    id_actividad = data.get("id_actividad")
    usuario = get_jwt_identity()
    id_usuario = usuario.get("_id")
    nombre_usuario = usuario.get("nombre_usuario")

    try:
        UsuarioGenerico.usuario_participa_actividad(id_usuario, id_actividad)
        return jsonify({"message": "El usuario " + nombre_usuario + " participa en la actividad " + str(id_actividad)}), 200
    except Exception as e:
        return jsonify({"error": "Error al añadir usuario a la actividad", "detalles": str(e)}), 500


@blueprint.route("/no_participa", methods=["POST"])
@jwt_required()
def no_participa():
    data = request.json
    id_actividad = data.get("id_actividad")
    usuario = get_jwt_identity()
    id_usuario = usuario.get("_id")
    nombre_usuario = usuario.get("nombre_usuario")

    try:
        UsuarioGenerico.usuario_no_participa_actividad(id_usuario, id_actividad)
        return jsonify({"message": "El usuario " + nombre_usuario + " no participa en la actividad " + str(id_actividad)}), 200
    except Exception as e:
        return jsonify({"error": "Error al retirar usuario de la actividad", "detalles": str(e)}), 500

