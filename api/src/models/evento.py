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
        self.id_establecimiento = data.get("id_establecimiento")

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
                "id_establecimiento": self.id_establecimiento
            }

            id = str(mongo.db.eventos.insert_one(data_insertar).inserted_id)
            return jsonify({"message": "Evento con id: " + id + " creado con éxito", "id": id}), 200
        except Exception as e:
            return jsonify({"error": f"Error al insertar evento: {e}"}), 500


    def eliminar_evento(id):
        try:
            evento_eliminar = mongo.db.eventos.find_one({"_id": ObjectId(id)})
            
            if not evento_eliminar:
                return jsonify({"error": "Evento no encontrado"}), 404
            
            resultado = mongo.db.eventos.delete_one({"_id": ObjectId(id)})
            
            if resultado.deleted_count == 0:
                return jsonify({"error": "No se pudo eliminar el evento"}), 500
            
            return jsonify({"message": "Evento " + id + " eliminado con éxito"}), 200
        except Exception as e:
            return jsonify({"error": f"Error al eliminar evento: {e}"}), 500


    def consultar_eventos():
        try:
            eventos = mongo.db.eventos.find()
            return json_util.dumps(eventos), 200
        except Exception as e:
            return jsonify({"error": f"Error al consultar eventos: {e}"}), 500


    def consultar_evento(id):
        try:
            evento = mongo.db.eventos.find_one({"_id": ObjectId(id)})
            
            if not evento:
                return jsonify({"error": "Evento no encontrado"}), 404
            
            respuesta = json_util.dumps(evento)
            return respuesta, 200
        except Exception as e:
            return jsonify({"error": f"Error al consultar evento: {e}"}), 500


    def actualizar_evento(id, data):
        try:
            updates = {k: v for k, v in data.items() if k not in ["id_establecimiento"]}
            
            if "fecha_evento" in updates:
                updates["fecha_evento"] = date.fromisoformat(updates["fecha_evento"])
            
            if "hora_evento" in updates:
                updates["hora_evento"] = datetime.strptime(updates["hora_evento"], '%H:%M:%S').time().isoformat()
            
            resultado = mongo.db.eventos.update_one({"_id": ObjectId(id)}, {"$set": updates})
            
            if resultado.modified_count == 0:
                return jsonify({"error": "No se pudo actualizar el evento"}), 500
            
            return jsonify({"message": "Evento con id: " + id + " actualizado con éxito"}), 200
        except Exception as e:
            return jsonify({"error": f"Error al actualizar evento: {e}"}), 500
