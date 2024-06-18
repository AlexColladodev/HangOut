from typing import Dict
from flask import jsonify
from db import mongo
from bson import json_util
from bson.objectid import ObjectId
from pymongo.errors import PyMongoError

class Oferta:
    def __init__(self, data: Dict) -> None:
        self.nombre_oferta = data.get("nombre_oferta")
        self.descripcion_oferta = data.get("descripcion_oferta")
        self.precio_oferta = data.get("precio_oferta")
        self.id_establecimiento = data.get("id_establecimiento")
        self.imagen_url = data.get("imagen_url")

    def insertar_oferta(self):
        try:
            data_insertar = self.__dict__
            id = str(mongo.db.ofertas.insert_one(data_insertar).inserted_id)
            return {"message": "Oferta creada con éxito", "id_oferta": str(id)}
        except PyMongoError as e:
            raise RuntimeError(f"Error en la base de datos al crear una oferta: {e}")

    @staticmethod
    def eliminar_oferta(id):
        try:
            oferta_eliminar = mongo.db.ofertas.find_one({"_id": ObjectId(id)})
            if not oferta_eliminar:
                raise ValueError("Oferta no encontrada")
            id_establecimiento = oferta_eliminar.get("id_establecimiento")
            resultado_update = mongo.db.establecimientos.update_one(
                {"_id": ObjectId(id_establecimiento)},
                {"$pull": {"ofertas": id}}
            )
            if resultado_update.modified_count == 0:
                raise RuntimeError("No se pudo eliminar la oferta del establecimiento")
            resultado_delete = mongo.db.ofertas.delete_one({"_id": ObjectId(id)})
            if resultado_delete.deleted_count == 0:
                raise RuntimeError("No se pudo eliminar la oferta")
            return {"message": "Oferta eliminada con éxito"}
        except PyMongoError as e:
            raise RuntimeError(f"Error en la base de datos al eliminar la oferta: {e}")

    @staticmethod
    def consultar_ofertas():
        try:
            ofertas = mongo.db.ofertas.find()
            return json_util.dumps(ofertas)
        except PyMongoError as e:
            raise RuntimeError(f"Error en la base de datos al consultar las ofertas: {e}")

    @staticmethod
    def consultar_oferta(id):
        try:
            oferta = mongo.db.ofertas.find_one({"_id": ObjectId(id)})
            if not oferta:
                raise ValueError("Oferta no encontrada")
            respuesta = json_util.dumps(oferta)
            return respuesta
        except PyMongoError as e:
            raise RuntimeError(f"Error en la base de datos al consultar la oferta: {e}")

    @staticmethod
    def actualizar_oferta(id, data):
        try:
            data.pop("id_establecimiento", None)
            data.pop("imagen_url", None)
            resultado = mongo.db.ofertas.update_one({"_id": ObjectId(id)}, {"$set": data})
            if resultado.modified_count == 0:
                raise ValueError("No se pudo actualizar la oferta")
            return {"message": "Oferta actualizada con éxito"}
        except PyMongoError as e:
            raise RuntimeError(f"Error en la base de datos al actualizar la oferta: {e}")

    @staticmethod
    def del_oferta_establecimiento(id_establecimiento):
        resultado = mongo.db.ofertas.delete_many({"id_establecimiento": id_establecimiento})
        if resultado.deleted_count > 0:
            return {"mensaje": f"Se eliminaron {resultado.deleted_count} ofertas."}
        else:
            return {"message": "No hay ofertas que eliminar"}
