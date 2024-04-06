from flask import Blueprint, request
from models.administrador_establecimiento import AdministradorEstablecimiento
from typing import Dict
from flask import request, Response, jsonify
from schemas.administrador_establecimiento_schema import AdministradorEstablecimientoSchema
from marshmallow import ValidationError

blueprint = Blueprint("AdministradorEstablecimiento", "administrador_establecimiento", url_prefix="/administrador_establecimiento")

#Insertar Administrador de Establecimiento
@blueprint.route("", methods=["POST"])
def crear_administrador_establecimiento():
    data = request.json
    schema = AdministradorEstablecimientoSchema()

    try:
        datos_validados = schema.load(data)
        administrador_establecimiento = AdministradorEstablecimiento(datos_validados)
        resultado = administrador_establecimiento.insertar_administrador_establecimiento()
        return resultado
    except ValidationError as err:
        return jsonify({"error": "Validación fallida", "detalles": err.messages}), 400


#Eliminar Administrador de Establecimiento
@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_administrador_establecimiento(id):
    respuesta = AdministradorEstablecimiento.eliminar_administrador_establecimiento(id)
    return respuesta


#Consultar Todos los Administradores de Establecimiento
@blueprint.route("", methods=["GET"])
def consultar_administradores_establecimiento():
    respuesta = AdministradorEstablecimiento.consultar_administradores_establecimiento()
    return Response(respuesta, mimetype="application/json")


#Consultar a UN solo Administrador de Establecimiento
@blueprint.route("/<id>", methods=["GET"])
def consultar_administrador_establecimiento(id):
    respuesta = AdministradorEstablecimiento.consultar_administrador_establecimiento(id)
    return Response(respuesta, mimetype="application/json")

#Consultar si se hace esta manera o con sesiones
@blueprint.route("/<id>/establecimientos", methods=["POST"])
def aniadir_nuevo_establecimiento(id):
    respuesta = AdministradorEstablecimiento.aniadir_establecimiento(id)
    return Response(respuesta, mimetype="application/json")