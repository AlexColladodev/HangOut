from flask import Blueprint, request
from models.oferta import Oferta
from typing import Dict
from flask import request, Response, jsonify
from schemas.oferta_schema import OfertaSchema
from marshmallow import ValidationError

blueprint = Blueprint("Oferta", "ofertas", url_prefix="/ofertas")

@blueprint.route("", methods=["POST"])
def crear_oferta():
    data = request.json
    schema = OfertaSchema()

    try:
        datos_validados = schema.load(data)
        oferta = Oferta(datos_validados)
        resultado = oferta.insertar_oferta()
        return resultado
    except ValidationError as err:
        return jsonify({"error": "Validación fallida", "detalles": err.messages}), 400


@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_oferta(id):
    respuesta = Oferta.eliminar_oferta(id)
    return respuesta


@blueprint.route("", methods=["GET"])
def consultar_ofertas():
    respuesta = Oferta.consultar_ofertas()
    return Response(respuesta, mimetype="application/json")


@blueprint.route("/<id>", methods=["GET"])
def consultar_oferta(id):
    respuesta = Oferta.consultar_oferta(id)
    return Response(respuesta, mimetype="application/json")


@blueprint.route("/<id>", methods=["PUT"])
def actualizar_oferta(id):
    data = request.json
    respuesta = Oferta.actualizar_oferta(id, data)
    return respuesta