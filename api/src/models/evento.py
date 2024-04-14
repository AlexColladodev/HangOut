from typing import Dict
from flask import jsonify
from db import mongo
from bson import json_util
from bson.objectid import ObjectId
from datetime import date, datetime, time


class Evento:

    def __init__(self, data: Dict) -> None:
        self.nombre_evento = data.get("nombre_evento")
        self.descripcion_evento = data.get("descripcion_evento")
        self.fecha_evento = date.fromisoformat(data.get("fecha_evento")) if data.get("fecha_evento") else None
        self.precio = data.get("precio")
        self.hora_evento = datetime.strptime(data.get("hora_evento"), '%H:%M:%S').time() if data.get("hora_evento") else None
        self.id_establecimiento = data.get("id_establecimiento")

    def insertar_evento(self):

        if self.fecha_evento is not None:
            self.fecha_evento = datetime.combine(self.fecha_evento, datetime.min.time())

            if self.hora_evento is not None:
                self.fecha_evento = datetime.combine(self.fecha_evento, self.hora_evento)
                self.hora_evento = self.hora_evento.isoformat()
            else:
                pass
        else:

            if self.hora_evento is not None:
                self.hora_evento = self.hora_evento.isoformat()

        data_insertar = {
            "nombre_evento": self.nombre_evento,
            "descripcion_evento": self.descripcion_evento,
            "fecha_evento": self.fecha_evento,
            "precio": self.precio,
            "hora_evento": self.hora_evento if self.hora_evento is not None else "No especificado",
            "id_establecimiento": self.id_establecimiento
        }

        id = str(mongo.db.eventos.insert_one(data_insertar).inserted_id)

        return jsonify({"message": "Evento con id: " + id + " creado con éxito",
                        "id": id}), 200
    

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

    def actualizar_evento(id, data):

        data.pop("id_establecimiento", None)

        if 'fecha_evento' in data:
            data['fecha_evento'] = date.fromisoformat(data['fecha_evento'])
        if 'hora_evento' in data:
            data['hora_evento'] = datetime.strptime(data['hora_evento'], '%H:%M:%S').time().isoformat()


        resultado = mongo.db.eventos.update_one(
            {"_id": ObjectId(id)},
            {"$set": data}
        )

        if resultado.modified_count == 0:
            return jsonify({"error": "No se pudo actualizar el evento"}), 500

        return jsonify({"message": "Evento con id: " + id + " actualizado con éxito"}), 200
