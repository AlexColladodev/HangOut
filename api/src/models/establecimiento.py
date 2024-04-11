from typing import Dict
from flask import jsonify
from db import mongo
from bson import json_util
from bson.objectid import ObjectId

class Establecimiento:

    def __init__(self, data: Dict) -> None:
        self.cif = data.get("cif")
        self.nombre_establecimiento = data.get("nombre_establecimiento")
        self.id_administrador = data.get("id_administrador")
        self.ambiente = data.get("ambiente", [])
        self.ofertas = data.get("ofertas", [])
        self.eventos = data.get("eventos", [])
        self.reviews = data.get("reviews", [])


    def insertar_establecimiento(self):
        data_insertar = self.__dict__

        id = str(mongo.db.establecimientos.insert_one(data_insertar).inserted_id)
        
        return jsonify({"message": "Establecimiento con id: " + id + "  creado con éxito",
                       "id": id}), 200
    

    def eliminar_establecimiento(id):
        establecimiento_eliminar = mongo.db.establecimientos.find_one({"_id": ObjectId(id)})

        if not establecimiento_eliminar:
            return jsonify({"error": "Establecimiento no encontrado"}), 404   
        
        resultado = mongo.db.establecimientos.delete_one({"_id": ObjectId(id)})
    
        if resultado.deleted_count == 0:
            return jsonify({"error": "No se pudo eliminar el establecimimento"}), 500
    
        return jsonify({"message": "Establecimiento " + id + " eliminado con éxito"}), 200
    
    
    def consultar_establecimientos():
        establecimientos = mongo.db.establecimientos.find()
        return json_util.dumps(establecimientos)


    def consultar_establecimiento(id):
        establecimiento = mongo.db.establecimientos.find_one({"_id": ObjectId(id)})
        respuesta = json_util.dumps(establecimiento)
        return respuesta
    
    def add_evento_establecimiento(id_establecimiento, id_evento):
        mongo.db.establecimientos.update_one(
            {"_id": ObjectId(id_establecimiento)},
            {"$addToSet": {"eventos": id_evento}}
        )

    def add_ofertas_establecimiento(id_establecimiento, id_oferta):
        mongo.db.establecimientos.update_one(
            {"_id": ObjectId(id_establecimiento)},
            {"$addToSet": {"ofertas": id_oferta}}
        )