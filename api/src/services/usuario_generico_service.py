from flask import Blueprint, request, jsonify
from models.usuario_generico import UsuarioGenerico
from typing import Dict
from flask import request, Response
from schemas.usuario_generico_schema import UsuarioGenericoSchema
from marshmallow import ValidationError
import requests

blueprint = Blueprint("UsuarioGenerico", "usuario_generico", url_prefix="/usuario_generico")

@blueprint.route("", methods=["POST"])
def crear_usuario_generico():
    datos_usuario = request.json
    schema = UsuarioGenericoSchema()
    try:
        datos_validados = schema.load(datos_usuario)
        nuevo_usuario = UsuarioGenerico(datos_validados)
        nuevo_usuario.insertar_usuario_generico()

        return {"mensaje": "Usuario creado con éxito"}
    except ValidationError as err:
        return {"error": "Validación fallida", "detalles": err.messages}


#Eliminar Usuario
@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_usuario(id):
    respuesta = UsuarioGenerico.eliminar_usuario_generico(id)
    return respuesta


#Consultar Todos los Usuarios Genéricos
@blueprint.route("", methods=["GET"])
def consultar_usuarios():
    respuesta = UsuarioGenerico.consultar_todos_usuarios()
    return Response(respuesta, mimetype="application/json")


#Consultar a UN solo Usuario Genérico
@blueprint.route("/<id>", methods=["GET"])
def consultar_unico_usuario(id):
    respuesta = UsuarioGenerico.consultar_usuario(id)
    return Response(respuesta, mimetype="application/json")

#Actualizar algún dato del Usuario Genérico
@blueprint.route("/<id>", methods=["PUT"])
def actualizar_usuario(id):
    data = request.json

    respuesta = UsuarioGenerico.actualizar_usuario(id, data)

    return respuesta


@blueprint.route("/actividades", methods=["POST"])
def add_actividad():
    data = request.json

    id_usuario_creador = data.get("id_usuario_creador")
    data["id_usuario_creador"] = id_usuario_creador

    try:
        respuesta_json = requests.post("http://127.0.0.1:5000/actividades", json=data).json()
        id_actividad = respuesta_json.get("id")

        UsuarioGenerico.add_actividad_usuario(id_usuario_creador, id_actividad)

        return respuesta_json
    except Exception as e:
        return jsonify({"error": str(e)}), 400