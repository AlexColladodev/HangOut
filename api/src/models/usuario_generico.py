import re
from flask import jsonify
from db import mongo
from werkzeug.security import generate_password_hash
from bson import json_util
from bson.objectid import ObjectId
from pymongo.errors import PyMongoError

class UsuarioGenerico:

    def __init__(self, data: dict) -> None:
        self.nombre = data.get("nombre")
        self.nombre_usuario = data.get("nombre_usuario")
        self.password = data.get("password")
        self.email = data.get("email")
        self.telefono = data.get("telefono")
        self.seguidos = data.get("seguidos", [])
        self.preferencias = data.get("preferencias", [])
        self.actividades_creadas = data.get("actividades_creadas", [])
        self.reviews = data.get("reviews", [])
        self.fecha_nac = data.get("fecha_nac")
        self.imagen_url = data.get("imagen_url")
        

    def insertar_usuario_generico(self):
        try:
            if not self.correo_es_valido(self.email):
                raise ValueError("Usuario no encontrado")
            
            data_insertar = self.__dict__
            data_insertar["password"] = generate_password_hash(data_insertar["password"])
            id = str(mongo.db.usuarios_genericos.insert_one(data_insertar).inserted_id)
            
            return {"message": "Usuario creado con éxito", "id": id}
        except PyMongoError as e:
            raise RuntimeError(f"Error en la base de datos al crear un usuario: {e}")


    def eliminar_usuario_generico(id):
        try:
            usuario_a_eliminar = mongo.db.usuarios_genericos.find_one({"_id": ObjectId(id)})
            
            if not usuario_a_eliminar:
                raise ValueError("Usuario no encontrado")
            
            resultado = mongo.db.usuarios_genericos.delete_one({"_id": ObjectId(id)})
            
            if resultado.deleted_count == 0:
                raise RuntimeError("No se pudo eliminar al usuario")
            
            return {"message": "Usuario eliminar al usuario"}
        except PyMongoError as e:
            raise RuntimeError(f"Error en la base de datos al eliminar a un usuario: {e}")
    

    def consultar_todos_usuarios():
        try:
            usuarios = mongo.db.usuarios_genericos.find()
            return json_util.dumps(usuarios)
        except PyMongoError as e:
            raise RuntimeError(f"Error en la base de datos al consultar a los usuarios: {e}")


    def consultar_usuario(id):
        try:
            usuario = mongo.db.usuarios_genericos.find_one({"_id": ObjectId(id)})
            
            if not usuario:
                raise ValueError("Usuario no encontrado")
            
            return json_util.dumps(usuario)
        except PyMongoError as e:
            raise RuntimeError("Error en la base de datos al consultar al usuario: {e}")


    def actualizar_usuario(id, data):
        try:
            usuario_actual = mongo.db.usuarios_genericos.find_one({"_id": ObjectId(id)})
            cambios = {}
            nombre = data.get("nombre_usuario")
            usuario = mongo.db.usuarios_genericos.find_one({"nombre_usuario": nombre})
            
            administrador = mongo.db.administradores_establecimientos.find_one({"nombre_usuario": nombre})
            if usuario is not None or administrador is not None:
                raise ValueError("Nombre de usuario en uso")
            
            for campo, valor in data.items():
                if usuario_actual.get(campo) != valor:
                    cambios[campo] = valor
            
            if cambios:
                resultado = mongo.db.usuarios_genericos.update_one({"_id": ObjectId(id)}, {"$set": cambios})
                
                if resultado.modified_count == 0:
                    raise RuntimeError("No se pudo actualizar al usuario")
                
                return {"message": "Usuario actualizado con éxito"}
            
            return {"message": "No hubo cambios que realizar"}
        except PyMongoError as e:
            raise RuntimeError(f"Error en la base de datos al actualizar al usuario: {e}")


    @classmethod
    def correo_es_valido(cls, email):
        patron = r'\w+@\w+\.\w+'
        return re.match(patron, email) is not None


    def add_actividad_usuario(id_usuario_creador, id_actividad):
            try:
                mongo.db.usuarios_genericos.update_one(
                    {"_id": ObjectId(id_usuario_creador)},
                    {"$addToSet": {"actividades_creadas": id_actividad}}
                )
                
                mongo.db.actividades.update_one(
                    {"_id": ObjectId(id_actividad)},
                    {"$addToSet": {"participantes": id_usuario_creador}}
                )
                
                return {"message": "Actividad añadida con éxito al usuario"}
            except PyMongoError as e:
                raise RuntimeError(f"Error en la base de datos al asociar usuario-actividad: {e}")


    def add_seguidos_usuario(id_usuario, id_seguir_usuario):
        try:
            mongo.db.usuarios_genericos.update_one(
                {"_id": ObjectId(id_usuario)},
                {"$addToSet": {"seguidos": id_seguir_usuario}}
            )
            
            return {"message": "Usuario seguido con éxito"}
        except PyMongoError as e:
            raise RuntimeError(f"Error en la base de datos al seguir a un usuario: {e}")
    

    def usuario_participa_actividad(id_usuario, id_actividad):
        try:
            mongo.db.actividades.update_one(
                {"_id": ObjectId(id_actividad)},
                {"$addToSet": {"participantes": id_usuario}}
            )
            
            return {"message": "Usuario participa en la actividad"}
        except PyMongoError as e:
            raise RuntimeError(f"Error en la base de datos al participar en actividad: {e}")


    def usuario_no_participa_actividad(id_usuario, id_actividad):
        try:
            mongo.db.actividades.update_one(
                {"_id": ObjectId(id_actividad)},
                {"$pull": {"participantes": id_usuario}}
            )
            
            return {"message": "Usuario no participa en la actividad"}
        except PyMongoError as e:
            raise RuntimeError(f"Error en la base de datos al no participar en actividad: {e}")
        
    def add_review_usuario(id_usuario, id_review):
        try:
            mongo.db.usuarios_genericos.update_one(
                {"_id": ObjectId(id_usuario)},
                {"$addToSet": {"reviews": id_review}}
            )
            
            return {"message": "Review añadida a usuario"}
        except PyMongoError as e:
            raise RuntimeError(f"Error en la base de datos al asociar review-usuario: {e}")
        

    @classmethod
    def existe_nombre_usuario(cls, nombre):
        try:
            usuario = mongo.db.usuarios_genericos.find_one({"nombre_usuario": nombre})
            
            if usuario:
                id_usuario = str(usuario.get("_id"))
                return id_usuario
            else:
                return None
            
        except Exception as e:
            raise RuntimeError (f"Error en la base de datos al consultar nombre de usuario: {e}")