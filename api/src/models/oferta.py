from typing import Dict
from flask import jsonify
from db import mongo
from bson import json_util
from bson.objectid import ObjectId

class Oferta:

    def __init__(self, data: Dict) -> None:
        self.nombre_oferta = data.get("nombre_oferta")
        self.descripcion_oferta = data.get("descripcion_oferta")
        self.precio_oferta = data.get("precio_oferta")
        self.id_establecimiento = data.get("id_establecimiento")


    def insertar_oferta(self):
        try:
            data_insertar = self.__dict__
            id = str(mongo.db.ofertas.insert_one(data_insertar).inserted_id)
            return jsonify({"message": "Oferta con id: " + id + " creado con éxito", "id": id}), 200
        except Exception as e:
            return jsonify({"error": f"Error al insertar oferta: {e}"}), 500


    def eliminar_oferta(id):
        try:
            
            oferta_eliminar = mongo.db.ofertas.find_one({"_id": ObjectId(id)})
            
            if not oferta_eliminar:
                return jsonify({"error": "Oferta no encontrada"}), 404
            
            resultado = mongo.db.ofertas.delete_one({"_id": ObjectId(id)})
            
            if resultado.deleted_count == 0:
                return jsonify({"error": "No se pudo eliminar la oferta"}), 500
            
            return jsonify({"message": "Oferta " + id + " eliminada con éxito"}), 200
        except Exception as e:
            return jsonify({"error": f"Error al eliminar oferta: {e}"}), 500

    def consultar_ofertas():
        try:
            ofertas = mongo.db.ofertas.find()
            return json_util.dumps(ofertas), 200
        except Exception as e:
            return jsonify({"error": f"Error al consultar ofertas: {e}"}), 500

    def consultar_oferta(id):
        try:
            oferta = mongo.db.ofertas.find_one({"_id": ObjectId(id)})
            
            if not oferta:
                return jsonify({"error": "Oferta no encontrada"}), 404
            
            respuesta = json_util.dumps(oferta)
            return respuesta, 200
        except Exception as e:
            return jsonify({"error": f"Error al consultar oferta: {e}"}), 500
    
    def actualizar_oferta(id, data):
        try:
            updates = {k: v for k, v in data.items() if k not in ["id_establecimiento"]}
            resultado = mongo.db.ofertas.update_one({"_id": ObjectId(id)}, {"$set": updates})
            
            if resultado.modified_count == 0:
                return jsonify({"error": "No se pudo actualizar la oferta"}), 500
           
            return jsonify({"message": "Oferta con id: " + id + " actualizada con éxito"}), 200
        except Exception as e:
            return jsonify({"error": f"Error al actualizar oferta: {e}"}), 500
