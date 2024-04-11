from flask import Blueprint, request
from models.establecimiento import Establecimiento
from typing import Dict
from flask import request, Response, jsonify
from schemas.establecimiento_schema import EstablecimientosSchema
from marshmallow import ValidationError
import requests


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

@blueprint.route("/eventos", methods=["POST"])
def aniadir_evento():
    data = request.json

    id_establecimiento = data.get("id_establecimiento")
    data["id_establecimiento"] = id_establecimiento

    try:
        respuesta_json = requests.post("http://127.0.0.1:5000/eventos", json=data).json()
        id_evento = respuesta_json.get("id")

        Establecimiento.add_evento_establecimiento(id_establecimiento, id_evento)

        return respuesta_json
    except Exception as e:
        return jsonify({"error": str(e)}), 400


