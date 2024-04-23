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
            return jsonify({"message": "Actividad con id: " + id + " creada con éxito", "id": id}), 200
        except Exception as e:
            return jsonify({"error": f"Error al insertar actividad: {e}"}), 500


    def eliminar_actividad(id):
        try:
            actividad_eliminar = mongo.db.actividades.find_one({"_id": ObjectId(id)})
            
            if not actividad_eliminar:
                return jsonify({"error": "Actividad no encontrada"}), 404
            
            resultado = mongo.db.actividades.delete_one({"_id": ObjectId(id)})

            if resultado.deleted_count == 0:
                return jsonify({"error": "No se pudo eliminar la actividad"}), 500
            
            return jsonify({"message": "Actividad " + id + " eliminada con éxito"}), 200
        except Exception as e:
            return jsonify({"error": f"Error al eliminar actividad: {e}"}), 500


    def consultar_actividades():
        try:
            actividades = mongo.db.actividades.find()
            return json_util.dumps(actividades), 200
        except Exception as e:
            return jsonify({"error": f"Error al consultar actividades: {e}"}), 500


    def consultar_actividad(id):
        try:
            actividad = mongo.db.actividades.find_one({"_id": ObjectId(id)})

            if not actividad:
                return jsonify({"error": "Actividad no encontrada"}), 404
            
            respuesta = json_util.dumps(actividad)
            return respuesta, 200
        except Exception as e:
            return jsonify({"error": f"Error al consultar actividad: {e}"}), 500


    def actualizar_actividad(id, data):
        try:
            updates = {k: v for k, v in data.items() if k in ["nombre_actividad", "descripcion_actividad", "ubicacion", "fecha_actividad", "hora_actividad"]}
            
            if "fecha_actividad" in updates:
                updates["fecha_actividad"] = date.fromisoformat(updates["fecha_actividad"])
            
            if "hora_actividad" in updates:
                updates["hora_actividad"] = datetime.strptime(updates["hora_actividad"], '%H:%M:%S').time().isoformat()
            
            resultado = mongo.db.actividades.update_one({"_id": ObjectId(id)}, {"$set": updates})
            
            if resultado.modified_count == 0:
                return jsonify({"error": "No se pudo actualizar la actividad"}), 500
            
            return jsonify({"message": "Actividad con id: " + id + " actualizada con éxito"}), 200
        except Exception as e:
            return jsonify({"error": f"Error al actualizar actividad: {e}"}), 500
