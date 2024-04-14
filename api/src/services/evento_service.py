from flask import Blueprint, request
from models.evento import Evento
from typing import Dict
from flask import request, Response, jsonify
from schemas.evento_schema import EventoSchema
from marshmallow import ValidationError

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
    except ValidationError as err:
        return jsonify({"error": "Validación fallida", "detalles": err.messages}), 400


@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_evento(id):
    respuesta = Evento.eliminar_evento(id)
    return respuesta


@blueprint.route("", methods=["GET"])
def consultar_eventos():
    respuesta = Evento.consultar_eventos()
    return Response(respuesta, mimetype="application/json")


@blueprint.route("/<id>", methods=["GET"])
def consultar_evento(id):
    respuesta = Evento.consultar_evento(id)
    return Response(respuesta, mimetype="application/json")

@blueprint.route("/<id>", methods=["PUT"])
def actualizar_evento(id):
    data = request.json
    respuesta = Evento.actualizar_evento(id, data)
    return respuesta