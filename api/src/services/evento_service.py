from flask import Blueprint, request
from models.evento import Evento
from typing import Dict
from flask import request, Response

blueprint = Blueprint("Evento", "eventos", url_prefix="/eventos")

#Insertar Evento
@blueprint.route("", methods=["POST"])
def crear_evento():
    data = request.json
    evento = Evento(data)
    resultado = evento.insertar_evento()
    return resultado


#Eliminar Evento
@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_evento(id):
    respuesta = Evento.eliminar_evento(id)
    return respuesta


#Consultar Todos los Eventos
@blueprint.route("", methods=["GET"])
def consultar_eventos():
    respuesta = Evento.consultar_eventos()
    return Response(respuesta, mimetype="application/json")


#Consultar UN solo Evento
@blueprint.route("/<id>", methods=["GET"])
def consultar_evento(id):
    respuesta = Evento.consultar_evento(id)
    return Response(respuesta, mimetype="application/json")
