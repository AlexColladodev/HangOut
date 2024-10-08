from typing import Dict
from flask import jsonify
from db import mongo
from bson import json_util, ObjectId
from pymongo.errors import PyMongoError

class Review:
    def __init__(self, data: Dict) -> None:
        self.calificacion = data.get("calificacion")
        self.mensaje = data.get("mensaje")
        self.id_usuario = data.get("id_usuario")
        self.id_establecimiento = data.get("id_establecimiento")
        self.fecha_creacion = data.get("fecha_creacion")

    def insertar_review(self):
        try:
            data_insertar = self.__dict__
            data_insertar["id_usuario"] = str(data_insertar.get("id_usuario"))
            data_insertar["id_establecimiento"] = str(data_insertar.get("id_establecimiento"))
            id_review = str(mongo.db.reviews.insert_one(data_insertar).inserted_id)
            return {"message": "Review creada con éxito", "id_review": id_review}
        except PyMongoError as e:
            raise RuntimeError(f"Error en la base de datos para insertar una review: {e}")

    @staticmethod
    def eliminar_review(id):
        try:
            review_eliminar = mongo.db.reviews.find_one({"_id": ObjectId(id)})
            if not review_eliminar:
                raise ValueError("Review no encontrada")
            resultado = mongo.db.reviews.delete_one({"_id": ObjectId(id)})
            if resultado.deleted_count == 0:
                raise RuntimeError("No se pudo eliminar la review")
            return {"message": "Review eliminada con éxito"}
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al eliminar actividad: {e}")

    @staticmethod
    def consultar_reviews():
        try:
            reviews = mongo.db.reviews.find()
            return json_util.dumps(reviews)
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar reviews: {e}")

    @staticmethod
    def consultar_review(id):
        try:
            review = mongo.db.reviews.find_one({"_id": ObjectId(id)})
            if not review:
                raise ValueError("Review no encontrada")
            usuario = mongo.db.usuarios_genericos.find_one({"_id": ObjectId(review["id_usuario"])})
            if not usuario:
                raise ValueError("Usuario no encontrado")
            establecimiento = mongo.db.establecimientos.find_one({"_id": ObjectId(review["id_establecimiento"])})
            if not establecimiento:
                raise ValueError("Establecimiento no encontrado")
            resultado = {
                "review": review,
                "nombre_usuario": usuario.get("nombre_usuario", ""),
                "nombre_establecimiento": establecimiento.get("nombre_establecimiento", "")
            }
            return json_util.dumps(resultado)
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar review: {e}")

    @staticmethod
    def del_review_establecimiento(id_establecimiento):
        resultado = mongo.db.reviews.delete_many({"id_establecimiento": id_establecimiento})
        if resultado.deleted_count > 0:
            return {"mensaje": f"Se eliminaron {resultado.deleted_count} reviews."}
        else:
            return {"message": "No hay reviews que eliminar"}
