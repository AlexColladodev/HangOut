from typing import Dict
from flask import jsonify
from db import mongo
from bson import json_util
from bson.objectid import ObjectId
from datetime import date, datetime
from pymongo.errors import PyMongoError

class Actividad:

    def __init__(self, data: Dict) -> None:
        self.nombre_actividad = data.get("nombre_actividad")
        self.descripcion_actividad = data.get("descripcion_actividad")
        self.ubicacion = data.get("ubicacion")
        self.fecha_actividad = date.fromisoformat(data.get("fecha_actividad")) if data.get("fecha_actividad") else None
        self.hora_actividad = datetime.strptime(data.get("hora_actividad"), '%H:%M:%S').time() if data.get("hora_actividad") else None
        self.id_usuario_creador = data.get("id_usuario_creador")
        self.participantes = data.get("participantes", [])

    def insertar_actividad(self):
        try:
            if self.fecha_actividad:
                self.fecha_actividad = datetime.combine(self.fecha_actividad, self.hora_actividad if self.hora_actividad else datetime.min.time())
            
            data_insertar = {
                "nombre_actividad": self.nombre_actividad,
                "descripcion_actividad": self.descripcion_actividad,
                "fecha_actividad": self.fecha_actividad,
                "hora_actividad": self.hora_actividad.isoformat() if self.hora_actividad else "No especificado",
                "ubicacion": self.ubicacion,
                "id_usuario_creador": self.id_usuario_creador,
                "participantes": self.participantes
            }

            id = str(mongo.db.actividades.insert_one(data_insertar).inserted_id)
            return {"message": "Actividad creada con éxito", "id": id}
        except PyMongoError as e:
            raise ValueError("Error al insertar actividad en la base de datos") from e


    def eliminar_actividad(id):
        try:
            actividad_eliminar = mongo.db.actividades.find_one({"_id": ObjectId(id)})
            
            if not actividad_eliminar:
                raise ValueError("Actividad no encontrada")
            
            resultado = mongo.db.actividades.delete_one({"_id": ObjectId(id)})

            if resultado.deleted_count == 0:
                raise RuntimeError("No se pudo eliminar la actividad")
            
            return {"message": "Actividad eliminada con éxito"}
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al eliminar actividad: {e}")


    def consultar_actividades():
        try:
            actividades = mongo.db.actividades.find()
            return json_util.dumps(actividades)
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar actividades: {e}")


    def consultar_actividad(id):
        try:
            actividad = mongo.db.actividades.find_one({"_id": ObjectId(id)})

            if not actividad:
                raise ValueError("Actividad no encontrada")
            
            return json_util.dumps(actividad)
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar actividades: {e}")


    def actualizar_actividad(id, data):
        if 'fecha_actividad' in data:
            data['fecha_actividad'] = datetime.strptime(data['fecha_actividad'], '%Y-%m-%d').isoformat()
        try:
            resultado = mongo.db.actividades.update_one({'_id': ObjectId(id)}, {'$set': data})
            if resultado.matched_count == 0:
                raise ValueError("Actividad no encontrada")
            return {"message": "Actividad actualizada con éxito"}
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos: {e}")
