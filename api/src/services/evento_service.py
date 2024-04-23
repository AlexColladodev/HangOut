from flask import Blueprint, request, Response, jsonify
from models.evento import Evento
from schemas.evento_schema import EventoSchema

blueprint = Blueprint("Evento", "eventos", url_prefix="/eventos")


@blueprint.route("", methods=["POST"])
def crear_evento():
    data = request.json
    schema = EventoSchema()
    
    try:
        datos_validados = schema.load(data)
        evento = Evento(datos_validados)
        resultado = evento.insertar_evento()
        return resultado
    except Exception as e:
        return jsonify({"error": "Error al crear evento", "detalles": str(e)}), 500


@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_evento(id):
    try:
        respuesta = Evento.eliminar_evento(id)
        return respuesta
    except Exception as e:
        return jsonify({"error": "Error al eliminar evento", "detalles": str(e)}), 500


@blueprint.route("", methods=["GET"])
def consultar_eventos():
    try:
        respuesta = Evento.consultar_eventos()
        return Response(respuesta, mimetype="application/json")
    except Exception as e:
        return jsonify({"error": "Error al consultar eventos", "detalles": str(e)}), 500


@blueprint.route("/<id>", methods=["GET"])
def consultar_evento(id):
    try:
        respuesta = Evento.consultar_evento(id)
        return Response(respuesta, mimetype="application/json")
    except Exception as e:
        return jsonify({"error": "Error al consultar evento", "detalles": str(e)}), 500


@blueprint.route("/<id>", methods=["PUT"])
def actualizar_evento(id):
    data = request.json
    
    try:
        schema = EventoSchema()
        datos_validados = schema.load(data, partial=True)
        respuesta = Evento.actualizar_evento(id, datos_validados)
        return respuesta
    except Exception as e:
        return jsonify({"error": "Error al actualizar evento", "detalles": str(e)}), 500
