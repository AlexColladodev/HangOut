from typing import Dict
from flask import jsonify
from db import mongo
from bson import json_util
from bson.objectid import ObjectId
from datetime import date, datetime

#from flask_restx

#Trabajar con TimeStamp

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
        if self.fecha_actividad is not None:
            self.fecha_actividad = datetime.combine(self.fecha_actividad, datetime.min.time())

            if self.hora_actividad is not None:
                self.fecha_actividad = datetime.combine(self.fecha_actividad, self.hora_actividad)
                self.hora_actividad = self.hora_actividad.isoformat()
            else:
                pass
        else:

            if self.hora_actividad is not None:
                self.hora_actividad = self.hora_actividad.isoformat()

        data_insertar = {
            "nombre_actividad": self.nombre_actividad,
            "descripcion_actividad": self.descripcion_actividad,
            "fecha_actividad": self.fecha_actividad,
            "hora_actividad": self.hora_actividad if self.hora_actividad is not None else "No especificado",
            "ubicacion": self.ubicacion,
            "id_usuario_creador": self.id_usuario_creador,
            "participantes": self.participantes
        }

        id = str(mongo.db.actividades.insert_one(data_insertar).inserted_id)

        return jsonify({"message": "Actividad con id: " + id + " creada con éxito",
                        "id": id}), 200
    

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


    def actualizar_actividad(id, data):

        data.pop("participantes", None)
        data.pop("id_usuario_creador", None)
        
        if 'fecha_actividad' in data:
            data['fecha_actividad'] = date.fromisoformat(data['fecha_actividad'])
        if 'hora_actividad' in data:
            data['hora_actividad'] = datetime.strptime(data['hora_actividad'], '%H:%M:%S').time().isoformat()

        
        resultado = mongo.db.actividades.update_one(
            {"_id": ObjectId(id)},
            {"$set": data}
        )

        if resultado.modified_count == 0:
            return jsonify({"error": "No se pudo actualizar la actividad"}), 500

        return jsonify({"message": "Actividad con id: " + id + " actualizada con éxito"}), 200
