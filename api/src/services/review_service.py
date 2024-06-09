from flask import Blueprint, request, Response, jsonify
from models.review import Review
from schemas.review_schema import ReviewSchema
from marshmallow import ValidationError

blueprint = Blueprint("Review", "reviews", url_prefix="/reviews")

@blueprint.route("", methods=["POST"])
def crear_review():
    data = request.json
    schema = ReviewSchema()

    try:
        datos_validados = schema.load(data)
        review = Review(datos_validados)
        resultado = review.insertar_review()
        return resultado, 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except ValidationError as e:
        errors = e.messages
        first_error_key = next(iter(errors))
        error_message = errors[first_error_key][0]
        return jsonify({"error": error_message}), 400
    except Exception as e:
        return jsonify({"error": f"{e}"}), 500

@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_review(id):
    try:
        respuesta = Review.eliminar_review(id)
        return respuesta, 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500

@blueprint.route("", methods=["GET"])
def consultar_reviews():
    try:
        respuesta = Review.consultar_reviews()
        return respuesta, 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500

@blueprint.route("/<id>", methods=["GET"])
def consultar_review(id):
    try:
        respuesta = Review.consultar_review(id)
        return respuesta, 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500
