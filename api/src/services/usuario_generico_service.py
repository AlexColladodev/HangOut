from flask import Blueprint, request, jsonify
from models.usuario_generico import UsuarioGenerico
from typing import Dict
from flask import request, Response

blueprint = Blueprint("UsuarioGenerico", "usuario_generico", url_prefix="/usuario_generico")

#Insertar Usuario
@blueprint.route("", methods=["POST"])
def crear_usuario():
    data = request.json
    usuario_generico = UsuarioGenerico(data)
    resultado = usuario_generico.insertar()
    return resultado


#Eliminar Usuario
@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_usuario(id):
    respuesta = UsuarioGenerico.eliminar(id)
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