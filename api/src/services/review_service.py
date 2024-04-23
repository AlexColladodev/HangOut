from flask import Blueprint, request, Response, jsonify
from models.review import Review
from schemas.review_schema import ReviewSchema

blueprint = Blueprint("Review", "reviews", url_prefix="/reviews")


@blueprint.route("", methods=["POST"])
def crear_review():
    data = request.json
    schema = ReviewSchema()

    try:
        datos_validados = schema.load(data)
        review = Review(datos_validados)
        resultado = review.insertar_review()
        return resultado
    except Exception as e:
        return jsonify({"error": "Error al crear review", "detalles": str(e)}), 500
        
