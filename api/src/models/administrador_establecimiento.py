import re
from typing import Dict
from flask import jsonify
from db import mongo
from werkzeug.security import generate_password_hash
from bson import json_util
from bson.objectid import ObjectId
from pymongo.errors import PyMongoError
from datetime import datetime
from models.establecimiento import Establecimiento

class AdministradorEstablecimiento:
    def __init__(self, data: Dict) -> None:
        self.nombre = data.get("nombre")
        self.nombre_usuario = data.get("nombre_usuario")
        self.password = data.get("password")
        self.dni = data.get("dni")
        self.email = data.get("email")
        self.establecimientos = data.get("establecimientos", [])
        self.telefono = data.get("telefono")
        self.fecha_nac = data.get("fecha_nac")
        self.imagen_url = data.get("imagen_url")

    def insertar_administrador_establecimiento(self):
        try:
            if not self.correo_es_valido(self.email):
                raise ValueError("Formato de correo inválido")
            if self.fecha_nac:
                if isinstance(self.fecha_nac, str):
                    self.fecha_nac = datetime.fromisoformat(self.fecha_nac)
            data_insertar = {
                "nombre": self.nombre,
                "nombre_usuario": self.nombre_usuario,
                "email": self.email,
                "password": generate_password_hash(self.password),
                "fecha_nac": self.fecha_nac,
                "telefono": self.telefono,
                "imagen_url": self.imagen_url,
                "dni": self.dni
            }
            id = str(mongo.db.administradores_establecimientos.insert_one(data_insertar).inserted_id)
            return {"message": f"Administrador de establecimiento creado con éxito", "id": id}
        except PyMongoError as e:
            raise ValueError("Error al insertar administrador de establecimiento en la base de datos") from e

    def eliminar_administrador_establecimiento(id):
        try:
            administrador_eliminar = mongo.db.administradores_establecimientos.find_one({"_id": ObjectId(id)})
            if not administrador_eliminar:
                raise ValueError("Administrador de establecimiento no encontrado")
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
                raise ValueError("Administrador de establecimiento no encontrado")
            establecimientos_detalles = []
            for establecimiento_id in administrador.get("establecimientos", []):
                establecimiento = mongo.db.establecimientos.find_one({"_id": ObjectId(establecimiento_id)})
                if establecimiento:
                    media_info = Establecimiento.media_reviews(establecimiento_id)
                    reviews_detalles = []
                    for review_id in establecimiento.get("reviews", []):
                        review = mongo.db.reviews.find_one({"_id": ObjectId(review_id)})
                        if review:
                            usuario = mongo.db.usuarios_genericos.find_one({"_id": ObjectId(review["id_usuario"])})
                            if usuario:
                                review["nombre_usuario"] = usuario.get("nombre_usuario")
                            review["nombre_establecimiento"] = establecimiento.get("nombre_establecimiento")
                            reviews_detalles.append(review)
                    establecimiento_detalle = {
                        "_id": establecimiento.get("_id"),
                        "cif": establecimiento.get("cif"),
                        "nombre_establecimiento": establecimiento.get("nombre_establecimiento"),
                        "ambiente": establecimiento.get("ambiente"),
                        "ofertas": establecimiento.get("ofertas"),
                        "eventos": establecimiento.get("eventos"),
                        "imagen_url": establecimiento.get("imagen_url"),
                        "rating": media_info.get("media"),
                        "numero_reviews": media_info.get("n_reviews"),
                        "reviews": reviews_detalles
                    }
                    establecimientos_detalles.append(establecimiento_detalle)
            respuesta = {
                "administrador": administrador,
                "establecimientos_detalle": establecimientos_detalles
            }
            return json_util.dumps(respuesta)
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar administrador de establecimiento: {e}")

    def actualizar_administrador_establecimiento(id, data):
        try:
            updates = data.copy()
            updates.pop("dni", None)
            updates.pop("establecimientos", None)
            updates.pop("password", None)
            if 'fecha_nac' in updates:
                if isinstance(updates['fecha_nac'], str):
                    try:
                        updates['fecha_nac'] = datetime.fromisoformat(updates['fecha_nac'])
                    except ValueError as e:
                        raise RuntimeError(f"Formato de fecha inválido: {e}")
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

