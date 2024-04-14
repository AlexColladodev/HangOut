from flask import Blueprint, request, jsonify
from models.usuario_generico import UsuarioGenerico
from typing import Dict
from flask import request, Response
from schemas.usuario_generico_schema import UsuarioGenericoSchema
from marshmallow import ValidationError
import requests
from flask_jwt_extended import get_jwt_identity, jwt_required
from db import mongo

blueprint = Blueprint("UsuarioGenerico", "usuario_generico", url_prefix="/usuario_generico")

@blueprint.route("", methods=["POST"])
def crear_usuario_generico():
    datos_usuario = request.json
    schema = UsuarioGenericoSchema()
    try:
        datos_validados = schema.load(datos_usuario)
        nuevo_usuario = UsuarioGenerico(datos_validados)
        nuevo_usuario.insertar_usuario_generico()

        return jsonify({"message": "Usuario creado con éxito"}), 200
    except ValidationError as err:
        return jsonify({"error": "Validación fallida", "detalles": err.messages}), 400


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



@blueprint.route("/<id>", methods=["PUT"])
def actualizar_usuario(id):
    data = request.json

    respuesta = UsuarioGenerico.actualizar_usuario(id, data)

    return respuesta


@blueprint.route("/nueva_actividad", methods=["POST"])
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
    

@blueprint.route("/seguir_usuario", methods=["POST"])
@jwt_required()
def seguir_usuario():
    data = request.json
    nombre_usuario = data.get("nombre_usuario")
    usuario = get_jwt_identity()
    id_usuario = usuario.get("_id")

    respuesta_bool, id_seguir_usuario = UsuarioGenerico.existe_nombre_usuario(nombre_usuario)

    if(respuesta_bool):
        try:

            respuesta = UsuarioGenerico.add_seguidos_usuario(id_usuario, id_seguir_usuario)

            return respuesta
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        
    else:
        return jsonify({"message": "No existe el usuario con nombre: " + nombre_usuario})


@blueprint.route("/participa", methods=["POST"])
@jwt_required()
def participa():
    data = request.json
    id_actividad = data.get("id_actividad")
    usuario = get_jwt_identity()
    id_usuario = usuario.get("_id")
    nombre_usuario = usuario.get("nombre_usuario")

    UsuarioGenerico.usuario_participa_actividad(id_usuario, id_actividad)

    return jsonify({"message": "El usuario " + nombre_usuario + " participa en la actividad " + str(id_actividad)}), 200

    

@blueprint.route("/no_participa", methods=["POST"])
@jwt_required()
def no_participa():
    data = request.json
    id_actividad = data.get("id_actividad")
    usuario = get_jwt_identity()
    id_usuario = usuario.get("_id")
    nombre_usuario = usuario.get("nombre_usuario")

    UsuarioGenerico.usuario_no_participa_actividad(id_usuario, id_actividad)

    return jsonify({"message": "El usuario " + nombre_usuario + " no participa en la actividad " + str(id_actividad)})