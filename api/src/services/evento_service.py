from flask import Blueprint, request, Response, jsonify
from models.evento import Evento
from schemas.evento_schema import EventoSchema
from uploads_config import photos
from config import DevelopmentConfig


blueprint = Blueprint("Evento", "eventos", url_prefix="/eventos")


@blueprint.route("", methods=["POST"])
def crear_evento():
    data = request.json
    schema = EventoSchema()
    
    print(data)

    try:
        datos_validados = schema.load(data)
        evento = Evento(datos_validados)
        respuesta = evento.insertar_evento()
        return jsonify(respuesta), 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}, 500)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_evento(id):
    try:
        respuesta = Evento.eliminar_evento(id)
        return respuesta, 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500


@blueprint.route("", methods=["GET"])
def consultar_eventos():
    try:
        respuesta = Evento.consultar_eventos()
        return Response(respuesta, mimetype="application/json")
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500


@blueprint.route("/<id>", methods=["GET"])
def consultar_evento(id):
    try:
        respuesta = Evento.consultar_evento(id)
        return Response(respuesta, mimetype="application/json")
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500


@blueprint.route("/<id>", methods=["PUT"])
def actualizar_evento(id):
    data = request.json
    
    try:
        schema = EventoSchema()
        datos_validados = schema.load(data, partial=True)
        respuesta = Evento.actualizar_evento(id, datos_validados)
        return respuesta
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500


@blueprint.route("/ordenado", methods=["GET"])
def consultar_eventos_ordenados():
    try:
        respuesta = Evento.consultar_eventos_ordenados()
        return Response(respuesta, mimetype="application/json"), 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado al consultar actividades: {e}"}), 500