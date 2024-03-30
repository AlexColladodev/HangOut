from typing import Dict
from flask import jsonify
from db import mongo
from bson import json_util
from bson.objectid import ObjectId
from datetime import date, datetime

class Actividad:

    def __init__(self, data: Dict) -> None:
        self.nombre_actividad = data.get("nombre_actividad")
        self.descripcion_actividad = data.get("descripcion_actividad")
        self.ubicacion = data.get("ubicacion")
        self.fecha_actividad = date.fromisoformat(data.get("fecha_actividad")) if data.get("fecha_actividad") else None
        self.hora_actividad = datetime.strptime(data.get("hora_actividad"), '%H:%M:%S').time() if data.get("hora_actividad") else None


    def insertar_actividad(self):
        data_insertar = self.__dict__

        id = str(mongo.db.actividades.insert_one(data_insertar).inserted_id)
        
        return jsonify({"message": "Actividad con id: " + id + "  creado con éxito"}), 200
    

    def eliminar_actividad(id):
        actividad_eliminar = mongo.db.actividades.find_one({"_id": ObjectId(id)})

        if not actividad_eliminar:
            return jsonify({"error": "Actividad no encontrado"}), 404   
        
        resultado = mongo.db.actividades.delete_one({"_id": ObjectId(id)})
    
        if resultado.deleted_count == 0:
            return jsonify({"error": "No se pudo eliminar la actividad"}), 500
    
        return jsonify({"message": "Actividad " + id + " eliminada con éxito"}), 200
    
    
    def consultar_actividades():
        actividades = mongo.db.actividades.find()
        return json_util.dumps(actividades)


    def consultar_actividad(id):
        actividad = mongo.db.actividades.find_one({"_id": ObjectId(id)})
        respuesta = json_util.dumps(actividad)
        return respuesta
