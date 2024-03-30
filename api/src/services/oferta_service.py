from flask import Blueprint, request
from models.oferta import Oferta
from typing import Dict
from flask import request, Response

blueprint = Blueprint("Oferta", "ofertas", url_prefix="/ofertas")

#Insertar Oferta
@blueprint.route("", methods=["POST"])
def crear_oferta():
    data = request.json
    oferta = Oferta(data)
    resultado = oferta.insertar_oferta()
    return resultado


#Eliminar Oferta
@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_oferta(id):
    respuesta = Oferta.eliminar_oferta(id)
    return respuesta


#Consultar Todas las Oferta
@blueprint.route("", methods=["GET"])
def consultar_ofertas():
    respuesta = Oferta.consultar_ofertas()
    return Response(respuesta, mimetype="application/json")


#Consultar a UNA sola Oferta
@blueprint.route("/<id>", methods=["GET"])
def consultar_oferta(id):
    respuesta = Oferta.consultar_oferta(id)
    return Response(respuesta, mimetype="application/json")
