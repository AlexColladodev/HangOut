import re
from typing import Dict
from flask import jsonify
from db import mongo
from werkzeug.security import generate_password_hash, check_password_hash
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
        data_insertar = self.__dict__

        if not (AdministradorEstablecimiento.correo_es_valido(data_insertar.get("email_empresa"))):
            return jsonify({"error_correo: ": "Formato de correo inválido"}), 400
        
        hash_password = generate_password_hash(data_insertar.get("password"))

        data_insertar["password"] = hash_password

        id = str(mongo.db.administradores_establecimientos.insert_one(data_insertar).inserted_id)


        
        return jsonify({"message": "Administrador de Establecimiento con id: " + id + "  creado con éxito"}), 200

    def eliminar_administrador_establecimiento(id):
        administrador_eliminar = mongo.db.administradores_establecimientos.find_one({"_id": ObjectId(id)})

        if not administrador_eliminar:
            return jsonify({"error": "Administrador de Establecimiento no encontrado"}), 404   
        
        resultado = mongo.db.administradores_establecimientos.delete_one({"_id": ObjectId(id)})
    
        if resultado.deleted_count == 0:
            return jsonify({"error": "No se pudo eliminar el administrador de establecimiento"}), 500
    
        return jsonify({"message": "Administrador de establecimiento con id: " + id + " eliminado con éxito"}), 200
    
    def consultar_administradores_establecimiento():
        administradores_establecimientos = mongo.db.administradores_establecimientos.find()
        return json_util.dumps(administradores_establecimientos)


    def consultar_administrador_establecimiento(id):
        administradores_establecimientos = mongo.db.administradores_establecimientos.find_one({"_id": ObjectId(id)})
        respuesta = json_util.dumps(administradores_establecimientos)
        return respuesta

    @classmethod
    def correo_es_valido(self, email):
        
        patron = r'\w+@\w+\.\w+'

        if re.match(patron, email):
            return True
        else:
            return False
    
    def add_establecimiento_administrador(id_administrador, id_establecimiento):
        mongo.db.administradores_establecimientos.update_one(
            {"_id": ObjectId(id_administrador)},
            {"$addToSet": {"establecimientos": id_establecimiento}} #No guardar ObjectId por problemas en create_access_token
        )




