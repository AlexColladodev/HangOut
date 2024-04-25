from typing import Dict
from flask import jsonify
from db import mongo
from bson import json_util
from bson.objectid import ObjectId
from pymongo.errors import PyMongoError

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
        try:
            data_insertar = self.__dict__
            id = str(mongo.db.establecimientos.insert_one(data_insertar).inserted_id)
            return {"message": "Establecimiento con id: " + id + " creado con éxito", "id": id}
        except Exception as e:
            raise  RuntimeError("Error en la base de datos al crear establecimiento")


    def eliminar_establecimiento(id):
        try:
            establecimiento_eliminar = mongo.db.establecimientos.find_one({"_id": ObjectId(id)})

            if not establecimiento_eliminar:
                raise ValueError("Establecimiento no encontrado")
            
            resultado = mongo.db.establecimientos.delete_one({"_id": ObjectId(id)})

            if resultado.deleted_count == 0:
                raise RuntimeError("No se pudo eliminar el establecimiento")
            
            return {"message": "Establecimiento " + id + " eliminado con éxito"}
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al eliminar establecimiento: {e}")
        
    def consultar_establecimientos():
        try:
            establecimientos = mongo.db.establecimientos.find()
            return json_util.dumps(establecimientos)
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar los establecimientos: {e}")


    def consultar_establecimiento(id):
        try:
            establecimiento = mongo.db.establecimientos.find_one({"_id": ObjectId(id)})

            if not establecimiento:
                raise ValueError("Establecimiento no encontrado")
            
            respuesta = json_util.dumps(establecimiento)
            return respuesta
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar el establecimiento: {e}")
        
    #def actualizar_establecimiento(id)

    def add_evento_establecimiento(id_establecimiento, id_evento):
        try:
            mongo.db.establecimientos.update_one(
                {"_id": ObjectId(id_establecimiento)},
                {"$addToSet": {"eventos": id_evento}}
            )
            return jsonify({"message": f"Evento {id_evento} agregado al establecimiento {id_establecimiento} con éxito"}), 200
        except Exception as e:
            return jsonify({"error": f"Error al agregar evento al establecimiento: {e}"}), 500


    def add_ofertas_establecimiento(id_establecimiento, id_oferta):
        try:
            mongo.db.establecimientos.update_one(
                {"_id": ObjectId(id_establecimiento)},
                {"$addToSet": {"ofertas": id_oferta}}
            )
            return jsonify({"message": f"Oferta {id_oferta} agregada al establecimiento {id_establecimiento} con éxito"}), 200
        except Exception as e:
            return jsonify({"error": f"Error al agregar oferta al establecimiento: {e}"}), 500


    def filtrar_por_ambientes(ambientes_solicitados):
        try:
            establecimientos = mongo.db.establecimientos.find({
                "ambiente": {"$in": ambientes_solicitados}
            }, {"_id": 1})
            ids = [str(doc['_id']) for doc in establecimientos]
            return json_util.dumps(ids), 200
        except Exception as e:
            return jsonify({"error": f"Error en el filtro de ambientes: {e}"}), 500

    def add_review_establecimiento(id_establecimiento, id_review):
        try:
            mongo.db.establecimientos.update_one(
                {"_id": ObjectId(id_establecimiento)},
                {"$addToSet": {"reviews": id_review}}
            )
            
            return jsonify({"message": "Review añadida a Establecimiento"}), 200
        except Exception as e:
            return jsonify({"error": f"Error al añadir review al establecimiento: {e}"}), 500