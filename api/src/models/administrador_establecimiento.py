import re
from typing import Dict
from flask import jsonify
from db import mongo
from werkzeug.security import generate_password_hash
from bson import json_util
from bson.objectid import ObjectId

class AdministradorEstablecimiento:

    def __init__(self, data: Dict) -> None:
        self.nombre = data.get("nombre")
        self.nombre_usuario = data.get("nombre_usuario")
        self.password = data.get("password")
        self.dni = data.get("dni")
        self.email_empresa = data.get("email_empresa")
        self.establecimientos = data.get("establecimientos", [])


    def insertar_administrador_establecimiento(self):
        try:
            if not self.correo_es_valido(self.email_empresa):
                return jsonify({"error_correo": "Formato de correo inválido"}), 400
            
            data_insertar = self.__dict__
            data_insertar["password"] = generate_password_hash(data_insertar["password"])
            id = str(mongo.db.administradores_establecimientos.insert_one(data_insertar).inserted_id)
            
            return jsonify({"message": f"Administrador de Establecimiento con id: {id} creado con éxito"}), 200
        
        except Exception as e:
            return jsonify({"error": f"Error al insertar administrador: {e}"}), 500


    def eliminar_administrador_establecimiento(id):
        try:
            administrador_eliminar = mongo.db.administradores_establecimientos.find_one({"_id": ObjectId(id)})

            if not administrador_eliminar:
                return jsonify({"error": "Administrador de Establecimiento no encontrado"}), 404
            
            resultado = mongo.db.administradores_establecimientos.delete_one({"_id": ObjectId(id)})

            if resultado.deleted_count == 0:
                return jsonify({"error": "No se pudo eliminar el administrador de establecimiento"}), 500
            
            return jsonify({"message": f"Administrador de establecimiento con id: {id} eliminado con éxito"}), 200
        
        except Exception as e:
            return jsonify({"error": f"Error al eliminar administrador: {e}"}), 500


    def consultar_administradores_establecimiento():
        try:
            administradores_establecimientos = mongo.db.administradores_establecimientos.find()
            return json_util.dumps(administradores_establecimientos), 200
        except Exception as e:
            return jsonify({"error": f"Error al consultar administradores: {e}"}), 500


    def consultar_administrador_establecimiento(id):
        try:
            administrador = mongo.db.administradores_establecimientos.find_one({"_id": ObjectId(id)})

            if not administrador:
                return jsonify({"error": "Administrador de Establecimiento no encontrado"}), 404
            
            respuesta = json_util.dumps(administrador)
            return respuesta, 200
        except Exception as e:
            return jsonify({"error": f"Error al consultar administrador: {e}"}), 500


    def actualizar_administrador_establecimiento(id, data):
        try:
            updates = {k: v for k, v in data.items() if k not in ["dni", "establecimientos", "password", "email_empresa"]}
            resultado = mongo.db.administradores_establecimientos.update_one({"_id": ObjectId(id)}, {"$set": updates})

            if resultado.modified_count == 0:
                return jsonify({"error": "No se pudo actualizar el administrador de establecimiento"}), 500
            
            return jsonify({"message": f"Administrador de establecimiento con id: {id} actualizado con éxito"}), 200
        except Exception as e:
            return jsonify({"error": f"Error al actualizar administrador: {e}"}), 500


    @classmethod
    def correo_es_valido(cls, email):
        patron = r'\w+@\w+\.\w+'
        return re.match(patron, email) is not None


    def add_establecimiento_administrador(id_administrador, id_establecimiento):
        try:
            mongo.db.administradores_establecimientos.update_one(
                {"_id": ObjectId(id_administrador)},
                {"$addToSet": {"establecimientos": id_establecimiento}}
            )
            
            return jsonify({"message": f"Establecimiento {id_establecimiento} agregado al administrador {id_administrador} con éxito"}), 200
        except Exception as e:
            return jsonify({"error": f"Error al agregar establecimiento al administrador: {e}"}), 500
