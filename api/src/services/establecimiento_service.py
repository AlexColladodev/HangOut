from flask import Blueprint, request
from models.establecimiento import Establecimiento
from typing import Dict
from flask import request, Response

blueprint = Blueprint("Establecimiento", "establecimientos", url_prefix="/establecimientos")

#Insertar Establecimiento
@blueprint.route("", methods=["POST"])
def crear_establecimiento():
    data = request.json
    establecimiento = Establecimiento(data)
    resultado = establecimiento.insertar_establecimiento()
    return resultado


#Eliminar Establecimiento
@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_establecimiento(id):
    respuesta = Establecimiento.eliminar_establecimiento(id)
    return respuesta


#Consultar Todos los Establecimientos
@blueprint.route("", methods=["GET"])
def consultar_establecimientos():
    respuesta = Establecimiento.consultar_establecimientos()
    return Response(respuesta, mimetype="application/json")


#Consultar a UN solo Establecimiento
@blueprint.route("/<id>", methods=["GET"])
def consultar_establecimiento(id):
    respuesta = Establecimiento.consultar_establecimiento(id)
    return Response(respuesta, mimetype="application/json")
