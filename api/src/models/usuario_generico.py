import re
from typing import Dict
from flask import jsonify
from db import mongo
from werkzeug.security import generate_password_hash, check_password_hash
from bson import json_util
from bson.objectid import ObjectId

class UsuarioGenerico:


    def __init__(self, data: dict) -> None:
        self.nombre = data.get("nombre")
        self.nombre_usuario = data.get("nombre_usuario")
        self.password = data.get("password")
        self.email = data.get("email")
        self.telefono = data.get("telefono")
        self.edad = data.get("edad")
        self.seguidos = data.get("seguidos", [])
        self.preferencias = data.get("preferencias", [])
        
    def insertar_usuario_generico(self):
        data_insertar = self.__dict__

        if not (UsuarioGenerico.correo_es_valido(data_insertar.get("email"))):
            return jsonify({"error_correo: ": "Formato de correo inválido"}), 400
        
        hash_password = generate_password_hash(data_insertar.get("password"))

        data_insertar["password"] = hash_password

        id = str(mongo.db.usuarios_genericos.insert_one(data_insertar).inserted_id)


        
        return jsonify({"message": "Usuario con id: " + id + "  creado con éxito"}), 200

    def eliminar_usuario_generico(id):
        usuario_a_eliminar = mongo.db.usuarios_genericos.find_one({"_id": ObjectId(id)})

        if not usuario_a_eliminar:
            return jsonify({"error": "Usuario no encontrado"}), 404   
        
        resultado = mongo.db.usuarios_genericos.delete_one({"_id": ObjectId(id)})
    
        if resultado.deleted_count == 0:
            return jsonify({"error": "No se pudo eliminar el usuario"}), 500
    
        return jsonify({"message": "Usuario " + id + " eliminado con éxito"}), 200
    
    def consultar_todos_usuarios():
        usuarios = mongo.db.usuarios_genericos.find()
        return json_util.dumps(usuarios)


    def consultar_usuario(id):
        usuario = mongo.db.usuarios_genericos.find_one({"_id": ObjectId(id)})
        respuesta = json_util.dumps(usuario)
        return respuesta


    def actualizar_usuario(id, data):
            usuario_actual = mongo.db.usuarios_genericos.find_one({"_id": ObjectId(id)})

            
            cambios = {}

            for campo, valor in data.items():
                
                if campo == 'password':
                    
                    if not usuario_actual.get(campo) and check_password_hash(usuario_actual[campo], valor):
                        cambios[campo] = generate_password_hash(valor)
                
                elif usuario_actual.get(campo) != valor:
                    cambios[campo] = valor

            
            if cambios:
                resultado = mongo.db.usuarios_genericos.update_one({"_id": ObjectId(id)}, {"$set": cambios})
                if resultado.modified_count == 1:
                    return jsonify({"message": f"Usuario con ID " + id + " actualizado con éxito"}), 200
                else:
                    return jsonify({"error": "No se pudo actualizar el usuario"}), 500

            return jsonify({"message": "No hubo cambios para actualizar"}), 200


    @classmethod
    def correo_es_valido(self, email):
        
        patron = r'\w+@\w+\.\w+'

        if re.match(patron, email):
            return True
        else:
            return False
    

