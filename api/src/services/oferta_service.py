from flask import Blueprint, request, Response, jsonify
from models.oferta import Oferta
from schemas.oferta_schema import OfertaSchema

blueprint = Blueprint("Oferta", "ofertas", url_prefix="/ofertas")

@blueprint.route("", methods=["POST"])
def crear_oferta():
    data = request.json
    schema = OfertaSchema()
    
    try:
        datos_validados = schema.load(data)
        oferta = Oferta(datos_validados)
        resultado = oferta.insertar_oferta()
        return resultado, 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500


@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_oferta(id):
    try:
        respuesta = Oferta.eliminar_oferta(id)
        return respuesta
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500


@blueprint.route("", methods=["GET"])
def consultar_ofertas():
    try:
        respuesta = Oferta.consultar_ofertas()
        return Response(respuesta, mimetype="application/json")
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500


@blueprint.route("/<id>", methods=["GET"])
def consultar_oferta(id):
    try:
        respuesta = Oferta.consultar_oferta(id)
        return Response(respuesta, mimetype="application/json")
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500


@blueprint.route("/<id>", methods=["PUT"])
def actualizar_oferta(id):
    data = request.json
    schema = OfertaSchema()
    
    try:
        datos_validados = schema.load(data, partial=True)
        respuesta = Oferta.actualizar_oferta(id, datos_validados)
        return respuesta
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500
