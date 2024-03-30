from flask import Blueprint, request
from models.actividad import Actividad
from typing import Dict
from flask import request, Response

blueprint = Blueprint("Actividad", "actividades", url_prefix="/actividades")

#Insertar Actividad
@blueprint.route("", methods=["POST"])
def crear_actividad():
    data = request.json
    evento = Evento(data)
    resultado = evento.insertar_evento()
    return resultado


#Eliminar Actividad
@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_actividad(id):
    respuesta = Actividad.eliminar_actividad(id)
    return respuesta


#Consultar Todas las Actividades
@blueprint.route("", methods=["GET"])
def consultar_actividades():
    respuesta = Actividad.consultar_actividades()
    return Response(respuesta, mimetype="application/json")


#Consultar a UNA sola Actividad
@blueprint.route("/<id>", methods=["GET"])
def consultar_actividad(id):
    respuesta = Actividad.consultar_actividad(id)
    return Response(respuesta, mimetype="application/json")
