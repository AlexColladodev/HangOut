from typing import Dict
from flask import jsonify
from db import mongo
from bson import json_util
from bson.objectid import ObjectId
from datetime import date, datetime


class Evento:

    def __init__(self, data: Dict) -> None:
        self.nombre_evento = data.get("nombre_evento")
        self.descripcion_evento = data.get("descripcion_evento")
        self.fecha_evento = date.fromisoformat(data.get("fecha_evento")) if data.get("fecha_evento") else None
        self.precio = data.get("precio")
        self.hora_evento = datetime.strptime(data.get("hora_evento"), '%H:%M:%S').time() if data.get("hora_evento") else None

    def insertar_evento(self):
        data_insertar = self.__dict__

        id = str(mongo.db.eventos.insert_one(data_insertar).inserted_id)
        
        return jsonify({"message": "Evento con id: " + id + "  creado con éxito"}), 200
    

    def eliminar_evento(id):
        evento_eliminar = mongo.db.eventos.find_one({"_id": ObjectId(id)})

        if not evento_eliminar:
            return jsonify({"error": "Evento no encontrado"}), 404   
        
        resultado = mongo.db.eventos.delete_one({"_id": ObjectId(id)})
    
        if resultado.deleted_count == 0:
            return jsonify({"error": "No se pudo eliminar el evento"}), 500
    
        return jsonify({"message": "Evento " + id + " eliminado con éxito"}), 200
    
    
    def consultar_eventos():
        eventos = mongo.db.eventos.find()
        return json_util.dumps(eventos)


    def consultar_evento(id):
        evento = mongo.db.eventos.find_one({"_id": ObjectId(id)})
        respuesta = json_util.dumps(evento)
        return respuesta
