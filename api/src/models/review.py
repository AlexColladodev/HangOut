from typing import Dict
from flask import jsonify
from db import mongo
from bson import json_util
from bson.objectid import ObjectId
from datetime import date, datetime


class Review:

    def __init__(self, data: Dict) -> None:
        self.calificacion = data.get("calificacion")
        self.mensaje = data.get("mensaje")
        self.id_usuario = data.get("id_usuario")
        self.id_establecimiento = data.get("id_establecimiento")
        #self.fecha = datetime.fromisoformat(data.get("fecha")) if data.get("fecha") else None

    
    def insertar_review(self):
        try:
            data_insertar = self.__dict__

            data_insertar["id_usuario"] = str(data_insertar.get("id_usuario"))
            data_insertar["id_establecimiento"] = str(data_insertar.get("id_establecimiento"))

            id_review = str(mongo.db.reviews.insert_one(data_insertar).inserted_id)

            return jsonify({"message": "Review creada con éxito ", "id": id_review}), 200
        
        except Exception as e:
            return jsonify({"error": f"Error al insertar review: {e}"}), 500
        
    def eliminar_review(id):
        try:
            mongo.db.reviews.delete_one({"_id": id})
        except Exception as e:
            return jsonify({"error": f"Error al eliminar la review: {e}"}), 500