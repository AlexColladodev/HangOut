#Trabajar con expresiones regulares
import re
from typing import Dict
from flask import jsonify
from db import mongo
from werkzeug.security import generate_password_hash, check_password_hash
from bson import json_util
from bson.objectid import ObjectId

class UsuarioGenerico:


    def __init__(self, data: dict) -> None:
        self._id = data.get("_id")
        self.nombre = data.get("nombre")
        self.nombre_usuario = data.get("nombre_usuario")
        self.password = data.get("password")
        self.email = data.get("email")
        self.telefono = data.get("telefono")
        self.edad = data.get("edad")
        self.seguidos = data.get("seguidos", [])
        self.preferencia = data.get("preferencias", [])
        
    def insertar(self):
        data_insertar = self.__dict__

        if not (UsuarioGenerico.correo_es_valido(data_insertar.get("email"))):
            return jsonify({"error_correo: ": "Formato de correo inválido"}), 400
        
        hash_password = generate_password_hash(data_insertar.get("password"))

        data_insertar["password"] = hash_password

        id = mongo.db.users.insert_one(data_insertar).inserted_id

        if id != -1:
            return jsonify({"message": "Usuario con id: " + id + " creado con éxito"}), 200

    def eliminar(id):
        usuario_a_eliminar = mongo.db.users.find_one({"_id": id})

        if not usuario_a_eliminar:
            return jsonify({"error": "Usuario no encontrado"}), 404   
        
        resultado = mongo.db.users.delete_one({"_id": id})
    
        if resultado.deleted_count == 0:
            return jsonify({"error": "No se pudo eliminar el usuario"}), 500
    
        return jsonify({"message": "Usuario " + id + " eliminado con éxito"}), 200
    
    def consultar_todos_usuarios():
        usuarios = mongo.db.users.find()
        return json_util.dumps(usuarios)


    def consultar_usuario(id):
        usuario = mongo.db.users.find_one({"_id": id}) #Por que no ObjectId
        respuesta = json_util.dumps(usuario)
        return respuesta


    @classmethod
    def correo_es_valido(self, email):
        
        patron = r'\w+@\w+\.\w+'

        if re.match(patron, email):
            return True
        else:
            return False
    

