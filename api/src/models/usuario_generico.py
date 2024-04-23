import re
from flask import jsonify
from db import mongo
from werkzeug.security import generate_password_hash
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
        self.reviews = data.get("reviews", [])
        

    def insertar_usuario_generico(self):
        try:
            if not self.correo_es_valido(self.email):
                return jsonify({"error_correo": "Formato de correo inválido"}), 400
            
            data_insertar = self.__dict__
            data_insertar["password"] = generate_password_hash(data_insertar["password"])
            id = str(mongo.db.usuarios_genericos.insert_one(data_insertar).inserted_id)
            
            return jsonify({"message": "Usuario creado con éxito", "id": id}), 200
        except Exception as e:
            return jsonify({"error": f"Error al insertar usuario: {e}"}), 500


    def eliminar_usuario_generico(id):
        try:
            usuario_a_eliminar = mongo.db.usuarios_genericos.find_one({"_id": ObjectId(id)})
            
            if not usuario_a_eliminar:
                return jsonify({"error": "Usuario no encontrado"}), 404
            
            resultado = mongo.db.usuarios_genericos.delete_one({"_id": ObjectId(id)})
            
            if resultado.deleted_count == 0:
                return jsonify({"error": "No se pudo eliminar el usuario"}), 500
            
            return jsonify({"message": "Usuario eliminado con éxito"}), 200
        except Exception as e:
            return jsonify({"error": f"Error al eliminar usuario: {e}"}), 500
    

    def consultar_todos_usuarios():
        try:
            usuarios = mongo.db.usuarios_genericos.find()
            return json_util.dumps(usuarios), 200
        except Exception as e:
            return jsonify({"error": f"Error al consultar usuarios: {e}"}), 500


    def consultar_usuario(id):
        try:
            usuario = mongo.db.usuarios_genericos.find_one({"_id": ObjectId(id)})
            
            if not usuario:
                return jsonify({"error": "Usuario no encontrado"}), 404
            
            respuesta = json_util.dumps(usuario)
            return respuesta, 200
        except Exception as e:
            return jsonify({"error": f"Error al consultar usuario: {e}"}), 500


    def actualizar_usuario(id, data):
        try:
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
                
                if resultado.modified_count == 0:
                    return jsonify({"error": "No se pudo actualizar el usuario"}), 500
                
                return jsonify({"message": "Usuario actualizado con éxito"}), 200
            
            return jsonify({"message": "No hubo cambios para actualizar"}), 200
        except Exception as e:
            return jsonify({"error": f"Error al actualizar usuario: {e}"}), 500


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
                
                return jsonify({"message": "Actividad agregada con éxito al usuario."}), 200
            except Exception as e:
                return jsonify({"error": f"Error al agregar actividad al usuario: {e}"}), 500


    def add_seguidos_usuario(id_usuario, id_seguir_usuario):
        try:
            mongo.db.usuarios_genericos.update_one(
                {"_id": ObjectId(id_usuario)},
                {"$addToSet": {"seguidos": id_seguir_usuario}}
            )
            
            return jsonify({"message": "Usuario seguido con éxito."}), 200
        except Exception as e:
            return jsonify({"error": f"Error al seguir al usuario: {e}"}), 500
    

    def usuario_participa_actividad(id_usuario, id_actividad):
        try:
            mongo.db.actividades.update_one(
                {"_id": ObjectId(id_actividad)},
                {"$addToSet": {"participantes": id_usuario}}
            )
            
            return jsonify({"message": "Usuario añadido a la actividad con éxito."}), 200
        except Exception as e:
            return jsonify({"error": f"Error al añadir usuario a la actividad: {e}"}), 500


    def usuario_no_participa_actividad(id_usuario, id_actividad):
        try:
            mongo.db.actividades.update_one(
                {"_id": ObjectId(id_actividad)},
                {"$addToSet": {"participantes": id_usuario}}
            )
            
            return jsonify({"message": "Usuario removido de la actividad con éxito."}), 200
        except Exception as e:
            return jsonify({"error": f"Error al remover usuario de la actividad: {e}"}), 500
        
    def add_review_usuario(id_usuario, id_review):
        try:
            mongo.db.usuarios_genericos.update_one(
                {"_id": ObjectId(id_usuario)},
                {"$addToSet": {"reviews": id_review}}
            )
            
            return jsonify({"message": "Review añadida a usuario."}), 200
        except Exception as e:
            return jsonify({"error": f"Error al añadir review a usuario: {e}"}), 500
        

    @classmethod
    def existe_nombre_usuario(cls, nombre):
        try:
            usuario = mongo.db.usuarios_genericos.find_one({"nombre_usuario": nombre})
            
            if usuario:
                id_usuario = str(usuario.get("_id"))
                return jsonify({"exists": True, "id_usuario": id_usuario}), 200
            else:
                return jsonify({"exists": False}), 200
            
        except Exception as e:
            return jsonify({"error": f"Error al verificar el nombre de usuario: {e}"}), 500