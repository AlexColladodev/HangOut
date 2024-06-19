from typing import Dict, List
from flask import jsonify
from db import mongo
from bson import json_util
from bson.objectid import ObjectId
from pymongo.errors import PyMongoError
import math

class Establecimiento:
    def __init__(self, data: Dict) -> None:
        self.cif = data.get("cif")
        self.nombre_establecimiento = data.get("nombre_establecimiento")
        self.id_administrador = data.get("id_administrador")
        self.ambiente = data.get("ambiente", [])
        self.ofertas = data.get("ofertas", [])
        self.eventos = data.get("eventos", [])
        self.reviews = data.get("reviews", [])
        self.imagen_url = data.get("imagen_url")

    def insertar_establecimiento(self):
        try:
            data_insertar = self.__dict__
            id = str(mongo.db.establecimientos.insert_one(data_insertar).inserted_id)
            return {"message": "Establecimiento con id: " + id + " creado con éxito", "id": id}
        except Exception as e:
            raise RuntimeError("Error en la base de datos al crear establecimiento: " + str(e))

    @staticmethod
    def eliminar_establecimiento(id):
        try:
            establecimiento_eliminar = mongo.db.establecimientos.find_one({"_id": ObjectId(id)})
            if not establecimiento_eliminar:
                raise ValueError("Establecimiento no encontrado")
            id_administrador = establecimiento_eliminar.get("id_administrador")
            resultado = mongo.db.establecimientos.delete_one({"_id": ObjectId(id)})
            if resultado.deleted_count == 0:
                raise RuntimeError("No se pudo eliminar el establecimiento")
            return {"message": "Establecimiento " + id + " eliminado con éxito", "id_administrador": id_administrador}
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al eliminar establecimiento: {e}")

    @staticmethod
    def consultar_establecimientos():
        try:
            establecimientos = mongo.db.establecimientos.find({}, {"_id": 1})
            ids_establecimientos = [str(establecimiento["_id"]) for establecimiento in establecimientos]
            return json_util.dumps(ids_establecimientos)
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar los establecimientos: {e}")

    @staticmethod
    def consultar_establecimientos_ordenados() -> List[List]:
        try:
            establecimientos = mongo.db.establecimientos.find({}, {"_id": 1})
            ids_establecimientos = [str(establecimiento["_id"]) for establecimiento in establecimientos]
            ids_ordenados = Establecimiento.ordenar(ids_establecimientos)
            resultado = []
            for id_establecimiento in ids_ordenados:
                establecimiento = mongo.db.establecimientos.find_one({"_id": ObjectId(id_establecimiento)})
                media_data = Establecimiento.media_reviews(id_establecimiento)
                resultado.append([
                    establecimiento,
                    media_data["media"],
                    media_data["n_reviews"]
                ])
            return json_util.dumps(resultado)
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar los establecimientos ordenados: {e}")

    @staticmethod
    def consultar_establecimiento(id):
        try:
            establecimiento = mongo.db.establecimientos.find_one({"_id": ObjectId(id)})
            if not establecimiento:
                raise ValueError("Establecimiento no encontrado")
            respuesta = json_util.dumps(establecimiento)
            return respuesta
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al consultar el establecimiento: {e}")

    @staticmethod
    def actualizar_establecimiento(id_establecimiento, data):
        try:
            establecimiento = mongo.db.establecimientos.find_one({"_id": ObjectId(id_establecimiento)})
            if not establecimiento:
                raise ValueError(f"Establecimiento con id {id_establecimiento} no encontrado")
            update_data = {}
            if 'nombre_establecimiento' in data:
                update_data['nombre_establecimiento'] = data['nombre_establecimiento']
            if 'ambiente' in data:
                update_data['ambiente'] = data['ambiente']
            if update_data:
                mongo.db.establecimientos.update_one(
                    {"_id": ObjectId(id_establecimiento)},
                    {"$set": update_data}
                )
            return {"message": "Establecimiento actualizado exitosamente"}
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al actualizar el establecimiento: {e}")

    @staticmethod
    def add_evento_establecimiento(id_establecimiento, id_evento):
        try:
            mongo.db.establecimientos.update_one(
                {"_id": ObjectId(id_establecimiento)},
                {"$addToSet": {"eventos": str(id_evento)}}
            )
            return {"message": f"Evento {id_evento} agregado al establecimiento {id_establecimiento} con éxito"}
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al añadir evento al establecimiento: {e}")

    @staticmethod
    def add_ofertas_establecimiento(id_establecimiento, id_oferta):
        try:
            mongo.db.establecimientos.update_one(
                {"_id": ObjectId(id_establecimiento)},
                {"$addToSet": {"ofertas": str(id_oferta)}}
            )
            return {"message": f"Oferta {id_oferta} agregada al establecimiento {id_establecimiento} con éxito"}
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al actualizar ambiente de establecimiento: {e}")

    @staticmethod
    def filtrar_personalizado(id) -> List[List]:
        try:
            usuario = mongo.db.usuarios_genericos.find_one({"_id": ObjectId(id)})
            if not usuario:
                raise RuntimeError(f"Usuario con id {id} no encontrado.")

            ambientes_solicitados = usuario.get("preferencias", [])
            if not ambientes_solicitados:
                raise RuntimeError(f"El usuario con id {id} no tiene preferencias definidas.")
            
            establecimientos = mongo.db.establecimientos.find({
                "ambiente": {"$in": ambientes_solicitados}
            }, {"_id": 1})

            ids_establecimientos = [str(doc["_id"]) for doc in establecimientos]

            ids_ordenados = Establecimiento.ordenar(ids_establecimientos)

            resultado = []
            for id_establecimiento in ids_ordenados:
                establecimiento = mongo.db.establecimientos.find_one({"_id": ObjectId(id_establecimiento)})
                media_data = Establecimiento.media_reviews(id_establecimiento)
                resultado.append([
                    establecimiento,
                    media_data["media"],
                    media_data["n_reviews"]
                ])

            return json_util.dumps(resultado)

        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al filtrar establecimientos por ambientes: {e}")

    @staticmethod
    def filtrar_and(ambientes_solicitados: List[str]) -> List[List]:
        try:
            establecimientos = mongo.db.establecimientos.find({
                "ambiente": {"$all": ambientes_solicitados}
            }, {"_id": 1})
            ids_establecimientos = [str(doc["_id"]) for doc in establecimientos]
            ids_ordenados = Establecimiento.ordenar(ids_establecimientos)
            resultado = []
            for id_establecimiento in ids_ordenados:
                establecimiento = mongo.db.establecimientos.find_one({"_id": ObjectId(id_establecimiento)})
                media_data = Establecimiento.media_reviews(id_establecimiento)
                resultado.append([
                    establecimiento,
                    media_data["media"],
                    media_data["n_reviews"]
                ])
            return json_util.dumps(resultado)
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al filtrar establecimientos por ambientes: {e}")

    @staticmethod
    def add_review_establecimiento(id_establecimiento, id_review):
        try:
            mongo.db.establecimientos.update_one(
                {"_id": ObjectId(id_establecimiento)},
                {"$addToSet": {"reviews": id_review}}
            )
            return {"message": "Review añadida a Establecimiento"}
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al actualizar ambiente de establecimiento: {e}")

    @staticmethod
    def wilson_score(id):
        try:
            establecimiento = mongo.db.establecimientos.find_one({"_id": ObjectId(id)})
            if not establecimiento:
                raise ValueError("Establecimiento no encontrado")
            suma = 0.0
            cantidad_reviews = len(establecimiento.get("reviews", []))
            reviews = establecimiento.get("reviews", [])
            for review_id in reviews:
                review = mongo.db.reviews.find_one({"_id": ObjectId(review_id)})
                if review:
                    suma += review["calificacion"]
            media_establecimiento = suma / cantidad_reviews if cantidad_reviews > 0 else 0
            p = media_establecimiento / 5
            n = cantidad_reviews
            z = 1.96
            if n == 0:
                return {"wilson_score": 0, "media": 0, "n_reviews": 0}
            denominator = 1 + z**2 / n
            center_adjusted_probability = p + z**2 / (2 * n)
            adjusted_standard_deviation = math.sqrt((p * (1 - p) + z**2 / (4 * n)) / n)
            lower_bound = (center_adjusted_probability - z * adjusted_standard_deviation) / denominator
            wilson_score = lower_bound * 5
            return {
                "wilson_score": wilson_score,
                "media": media_establecimiento,
                "n_reviews": cantidad_reviews
            }
        except PyMongoError as e:
            raise RuntimeError(f"No se pudo calcular el Wilson Score: {e}")

    @staticmethod
    def ordenar(ids_establecimientos: List[str]) -> List[str]:
        try:
            puntajes = []
            for id_establecimiento in ids_establecimientos:
                puntaje_result = Establecimiento.wilson_score(id_establecimiento)
                puntaje = puntaje_result.get("wilson_score")
                puntajes.append((id_establecimiento, puntaje))
            puntajes.sort(key=lambda x: x[1], reverse=True)
            ids_ordenados = [id_puntaje[0] for id_puntaje in puntajes]
            return ids_ordenados
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al ordenar los establecimientos: {e}")

    @staticmethod
    def media_reviews(id):
        try:
            establecimiento = mongo.db.establecimientos.find_one({"_id": ObjectId(id)})
            if not establecimiento:
                raise ValueError("Establecimiento no encontrado")
            suma = 0.0
            media = 0.0
            cantidad_reviews = len(establecimiento.get("reviews", []))
            reviews = establecimiento.get("reviews", [])
            for review_id in reviews:
                review = mongo.db.reviews.find_one({"_id": ObjectId(review_id)})
                if review:
                    suma += review["calificacion"]
                if cantidad_reviews > 0:
                    media = suma / cantidad_reviews
                else:
                    media = 0
            return {"media": media, "n_reviews": cantidad_reviews}
        except PyMongoError as e:
            raise RuntimeError(f"No se pudo contar la media: {e}")

    @staticmethod
    def detalle_establecimiento(id_establecimiento):
        try:
            establecimiento = mongo.db.establecimientos.find_one({"_id": ObjectId(id_establecimiento)})
            if not establecimiento:
                raise ValueError("Establecimiento no encontrado")
            media_info = Establecimiento.media_reviews(id_establecimiento)
            reviews_detalles = []
            for review_id in establecimiento.get("reviews", []):
                review = mongo.db.reviews.find_one({"_id": ObjectId(review_id)})
                if review:
                    usuario = mongo.db.usuarios_genericos.find_one({"_id": ObjectId(review["id_usuario"])})
                    if usuario:
                        review["nombre_usuario"] = usuario.get("nombre_usuario")
                    review["nombre_establecimiento"] = establecimiento.get("nombre_establecimiento")
                    reviews_detalles.append(review)
            establecimiento_detalle = {
                "_id": establecimiento.get("_id"),
                "cif": establecimiento.get("cif"),
                "nombre_establecimiento": establecimiento.get("nombre_establecimiento"),
                "ambiente": establecimiento.get("ambiente"),
                "ofertas": establecimiento.get("ofertas"),
                "eventos": establecimiento.get("eventos"),
                "imagen_url": establecimiento.get("imagen_url"),
                "rating": media_info.get("media"),
                "numero_reviews": media_info.get("n_reviews"),
                "reviews": reviews_detalles
            }
            return json_util.dumps(establecimiento_detalle)
        except PyMongoError as e:
            raise RuntimeError(f"Error de base de datos al obtener detalles del establecimiento: {e}")
