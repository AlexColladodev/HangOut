from flask import Blueprint, request
from models.establecimiento import Establecimiento
from typing import Dict
from flask import request, Response, jsonify
from schemas.establecimiento_schema import EstablecimientosSchema
from marshmallow import ValidationError


blueprint = Blueprint("Establecimiento", "establecimientos", url_prefix="/establecimientos")

#Insertar Establecimiento
@blueprint.route("", methods=["POST"])
def crear_establecimiento():
    data = request.json
    schema = EstablecimientosSchema()

    try:
        datos_validados = schema.load(data)
        establecimiento = Establecimiento(datos_validados)
        resultado = establecimiento.insertar_establecimiento()
        return resultado

    except ValidationError as err:
        return jsonify({"error": "Validación fallida", "detalles": err.messages}), 400


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


#Consultar
@blueprint.route("/<id>/ofertas", methods=["POST"])
def aniadir_oferta(id):
    respuesta = Establecimiento.aniadir_oferta(id)
    return Response(respuesta, mimetype="application/json")

@blueprint.route("/<id>/eventos", methods=["POST"])
def aniadir_evento(id):
    respuesta = Establecimiento.aniadir_evento(id)
    return Response(respuesta, mimetype="application/json")