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
        self.actividades_creadas = data.get("actividades_creadas", [])
        
    def insertar_usuario_generico(self):
        data_insertar = self.__dict__

        if not (UsuarioGenerico.correo_es_valido(data_insertar.get("email"))):
            return jsonify({"error_correo: ": "Formato de correo inválido"}), 400
        
        hash_password = generate_password_hash(data_insertar.get("password"))

        data_insertar["password"] = hash_password

        mongo.db.usuarios_genericos.insert_one(data_insertar).inserted_id

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

            nombre = data.get("nombre_usuario")
        

            usuario = mongo.db.usuarios_genericos.find_one({"nombre_usuario": nombre})
            administrador = mongo.db.administradores_establecimientos.find_one({"nombre_usuario": nombre})

            if usuario is not None or administrador is not None:
                return jsonify({"message": "Nombre de Usuario en uso"}), 400

            for campo, valor in data.items():
                if usuario_actual.get(campo) != valor:
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
        
    def add_actividad_usuario(id_usuario_creador, id_actividad):
        mongo.db.usuarios_genericos.update_one(
            {"_id": ObjectId(id_usuario_creador)},
            {"$addToSet": {"actividades_creadas": id_actividad}}
        )

        mongo.db.actividades.update_one(
            {"_id": ObjectId(id_actividad)},
            {"$addToSet": {"participantes": id_usuario_creador}}
        )


    def add_seguidos_usuario(id_usuario, id_seguir_usuario):
        mongo.db.usuarios_genericos.update_one(
            {"_id": ObjectId(id_usuario)},
            {"$addToSet": {"seguidos": id_seguir_usuario}}
        )

        return jsonify({"message": "Se ha seguido al usuario con ID " + id_seguir_usuario}), 200
    
    def usuario_participa_actividad(id_usuario, id_actividad):
        mongo.db.actividades.update_one(
            {"_id": id_actividad},
            {"$addToSet": {"participantes": id_usuario}}
        )

    def usuario_no_participa_actividad(id_usuario, id_actividad):
        mongo.db.actividades.update_one(
            {"_id": id_actividad},
            {"$pull": {"participantes": id_usuario}}
        )
    
    
    @classmethod
    def existe_nombre_usuario(cls, nombre):
        usuario = mongo.db.usuarios_genericos.find_one({"nombre_usuario": nombre})
        if usuario is not None:
            id_usuario = str(usuario.get("_id"))
            return True, id_usuario
        else:
            return False, None

    