from flask import Blueprint, request
from models.actividad import Actividad
from typing import Dict
from flask import request, Response, jsonify
from schemas.actividad_schema import ActividadSchema
from marshmallow import ValidationError

blueprint = Blueprint("Actividad", "actividades", url_prefix="/actividades")

#Insertar Actividad
@blueprint.route("", methods=["POST"])
def crear_actividad():
    data = request.json
    schema = ActividadSchema()

    try:
        datos_validados = schema.load(data)
        actividad = Actividad(datos_validados)
        resultado = actividad.insertar_actividad()
        return resultado
    except ValidationError as err:
        return jsonify({"error": "Validación fallida", "detalles": err.messages}), 400


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
