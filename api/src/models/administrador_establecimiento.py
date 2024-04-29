import re
from typing import Dict
from flask import jsonify
from db import mongo
from werkzeug.security import generate_password_hash
from bson import json_util
from bson.objectid import ObjectId
from pymongo.errors import PyMongoError

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
                raise ValueError("Formato de correo inválido")
            
            data_insertar = self.__dict__
            data_insertar["password"] = generate_password_hash(data_insertar["password"])
            id = str(mongo.db.administradores_establecimientos.insert_one(data_insertar).inserted_id)
            
            return {"message": f"Administrador de establecimiento creado con éxito", "id": id}
        
        except PyMongoError as e:
            raise ValueError("Error al insertar administrador de establecimiento en la base de datos") from e


    def eliminar_administrador_establecimiento(id):
        try:
            administrador_eliminar = mongo.db.administradores_establecimientos.find_one({"_id": ObjectId(id)})

            if not administrador_eliminar:
                raise ValueError("Adminsitrador de establecimiento no encontrado")
            
            resultado = mongo.db.administradores_establecimientos.delete_one({"_id": ObjectId(id)})

            if resultado.deleted_count == 0:
                raise RuntimeError("No se pudo eliminar el administrador de establecimiento")
            
            return {"message": f"Administrador de establecimiento con id: {id} eliminado con éxito"}
        
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al eliminar actividad: {e}")


    def consultar_administradores_establecimiento():
        try:
            administradores_establecimientos = mongo.db.administradores_establecimientos.find()
            return json_util.dumps(administradores_establecimientos)
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar administradores de establecimientos: {e}")


    def consultar_administrador_establecimiento(id):
        try:
            administrador = mongo.db.administradores_establecimientos.find_one({"_id": ObjectId(id)})

            if not administrador:
                raise ValueError("Adminsitrador de establecimiento no encontrado")
            
            respuesta = json_util.dumps(administrador)
            return respuesta
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar administrador de establecimiento: {e}")


    def actualizar_administrador_establecimiento(id, data):
        try:
            updates = data.copy()

            updates.pop("dni")
            updates.pop("establecimientos")
            updates.pop("email_empresa")
            updates.pop("password")

            resultado = mongo.db.administradores_establecimientos.update_one({"_id": ObjectId(id)}, {"$set": updates})

            if resultado.modified_count == 0:
                raise RuntimeError("No ha habido cambios a realizar")
            
            return {"message": f"Administrador de establecimiento con id: {id} actualizado con éxito"}
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al actualizar administrador de establecimiento: {e}")


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
            
            return {"message": f"Establecimiento {id_establecimiento} agregado al administrador {id_administrador} con éxito", "id_admin": id_administrador}
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al actualizar administrador de establecimiento: {e}")


    def del_establecimiento_administrador(id_administrador, id_establecimiento):
        try:
            mongo.db.administradores_establecimientos.update_one(
                {"_id": ObjectId(id_administrador)},
                {"$pull": {"establecimientos": str(id_establecimiento)}}
            )

            return {"message": "Eliminado de la lista de establecimiento del administrador"}
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos de eliminar un establecimiento de la lista de administrador: {e}")
        