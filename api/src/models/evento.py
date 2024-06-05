from typing import Dict
from flask import jsonify
from db import mongo
from bson import json_util
from bson.objectid import ObjectId
from datetime import date, datetime
from pymongo.errors import PyMongoError
from pymongo import ASCENDING

class Evento:

    def __init__(self, data: Dict) -> None:
        self.nombre_evento = data.get("nombre_evento")
        self.descripcion_evento = data.get("descripcion_evento")
        self.fecha_evento = date.fromisoformat(data.get("fecha_evento")) if data.get("fecha_evento") else None
        self.precio = data.get("precio")
        self.hora_evento = datetime.strptime(data.get("hora_evento"), '%H:%M:%S').time() if data.get("hora_evento") else None
        self.id_establecimiento = data.get("id_establecimiento")
        self.imagen_url = data.get("imagen_url")

    def insertar_evento(self):
        try:
            
            if self.fecha_evento:
                self.fecha_evento = datetime.combine(self.fecha_evento, self.hora_evento if self.hora_evento else datetime.min.time())
            
            data_insertar = {
                "nombre_evento": self.nombre_evento,
                "descripcion_evento": self.descripcion_evento,
                "fecha_evento": self.fecha_evento,
                "precio": self.precio,
                "hora_evento": self.hora_evento.isoformat() if self.hora_evento else "No especificado",
                "id_establecimiento": str(self.id_establecimiento),
                "imagen_url": self.imagen_url
            }

            id = str(mongo.db.eventos.insert_one(data_insertar).inserted_id)
            return {"message": "Evento con id: " + id + " creado con éxito", "id_evento": id}
        except PyMongoError as e:
            raise RuntimeError("Error al insertar evento en la base de datos") from e


    def eliminar_evento(id):
        try:
            evento_eliminar = mongo.db.eventos.find_one({"_id": ObjectId(id)})
            
            if not evento_eliminar:
                raise ValueError("Evento no encontrado")
            
            resultado = mongo.db.eventos.delete_one({"_id": ObjectId(id)})
            
            if resultado.deleted_count == 0:
                raise RuntimeError("No se pudo eliminar la actividad")
            
            return {"message": "Evento eliminado con éxito"}
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al eliminar evento: {e}")


    def consultar_eventos():
        try:
            eventos = mongo.db.eventos.find()
            return json_util.dumps(eventos)
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar evento: {e}")


    def consultar_evento(id):
        try:
            evento = mongo.db.eventos.find_one({"_id": ObjectId(id)})
            
            if not evento:
                raise ValueError("Evento no encontrado")
            
            return json_util.dumps(evento)
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar evento: {e}")


    def consultar_eventos_ordenados():
        try:
            fecha_actual = datetime.now()

            eventos = mongo.db.eventos.find({"fecha_evento": {"$gte": fecha_actual}}).sort("fecha_evento", ASCENDING)

            eventos_ids = [str(evento["_id"]) for evento in eventos]

            return {"eventos_ordenados": eventos_ids}
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar y ordenar eventos: {e}")


    def actualizar_evento(id, data):
        try:
            data.pop("id_establecimiento")
           
            if 'fecha_evento' in data:
                data['fecha_evento'] = datetime.strptime(data['fecha_evento'], '%Y-%m-%d').isoformat()
            
            resultado = mongo.db.eventos.update_one({"_id": ObjectId(id)}, {"$set": data})
            
            if resultado.modified_count == 0:
                raise RuntimeError("No se pudo actualizar el evento")
            
            return {"message": "Evento actualizado con éxito"}
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar evento: {e}")


    def del_evento_establecimiento(id_establecimiento):

        resultado = mongo.db.eventos.delete_many({"id_establecimiento": id_establecimiento})

        if resultado.deleted_count > 0:
            return {"mensaje": f"Se eliminaron {resultado.deleted_count} eventos."}
        else:
            return {"message": "No hay eventos que eliminar"}
