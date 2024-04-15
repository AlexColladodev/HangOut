from flask import Blueprint, request, Response, jsonify
from models.actividad import Actividad
from schemas.actividad_schema import ActividadSchema
from marshmallow import ValidationError

blueprint = Blueprint("Actividad", "actividades", url_prefix="/actividades")


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


@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_actividad(id):
    respuesta = Actividad.eliminar_actividad(id)
    return respuesta


@blueprint.route("", methods=["GET"])
def consultar_actividades():
    respuesta = Actividad.consultar_actividades()
    return Response(respuesta, mimetype="application/json")


@blueprint.route("/<id>", methods=["GET"])
def consultar_actividad(id):
    respuesta = Actividad.consultar_actividad(id)
    return Response(respuesta, mimetype="application/json")


@blueprint.route("/<id>", methods=["PUT"])
def actualizar_actividad(id):
    respuesta = Actividad.actualizar_actividad(id)
    return respuesta