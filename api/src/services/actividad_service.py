from flask import Blueprint, request, Response, jsonify
from models.actividad import Actividad
from schemas.actividad_schema import ActividadSchema
from marshmallow import ValidationError

blueprint = Blueprint("Actividad", "actividades", url_prefix="/actividades")

@blueprint.route("", methods=["POST"])
def crear_actividad():
    data = request.json
    schema = ActividadSchema()

    try:
        datos_validados = schema.load(data)
        actividad = Actividad(datos_validados)
        resultado = actividad.insertar_actividad()
        return jsonify(resultado), 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}, 500)
    except ValidationError as e:
        errors = e.messages
        first_error_key = next(iter(errors))
        error_message = errors[first_error_key][0]
        return jsonify({"error": error_message}), 400
    except Exception as e:
        return jsonify({"error": f"{e}"}), 500

@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_actividad(id):
    try:
        resultado = Actividad.eliminar_actividad(id)
        return jsonify(resultado), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500

@blueprint.route("", methods=["GET"])
def consultar_actividades():
    try:
        respuesta = Actividad.consultar_actividades()
        return Response(respuesta, mimetype='application/json'), 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado al consultar actividades: {e}"}), 500

@blueprint.route("/<id>", methods=["GET"])
def consultar_actividad(id):
    try:
        respuesta = Actividad.consultar_actividad(id)
        return Response(respuesta, mimetype='application/json'), 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado al consultar actividad: {e}"}), 500

@blueprint.route("/<id>", methods=["PUT"])
def actualizar_actividad(id):
    data = request.json
    try:
        resultado = Actividad.actualizar_actividad(id, data)
        return jsonify(resultado), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500

@blueprint.route("/participa/<id>", methods=["GET"])
def usuario_participa(id):
    try:
        resultado = Actividad.usuario_participa(id)
        return Response(resultado, mimetype="application/json"), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500