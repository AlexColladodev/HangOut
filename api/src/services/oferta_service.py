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
        return resultado
    except Exception as e:
        return jsonify({"error": "Error al crear oferta", "detalles": str(e)}), 500


@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_oferta(id):
    try:
        respuesta = Oferta.eliminar_oferta(id)
        return respuesta
    except Exception as e:
        return jsonify({"error": "Error al eliminar oferta", "detalles": str(e)}), 500


@blueprint.route("", methods=["GET"])
def consultar_ofertas():
    try:
        respuesta = Oferta.consultar_ofertas()
        return Response(respuesta, mimetype="application/json")
    except Exception as e:
        return jsonify({"error": "Error al consultar ofertas", "detalles": str(e)}), 500


@blueprint.route("/<id>", methods=["GET"])
def consultar_oferta(id):
    try:
        respuesta = Oferta.consultar_oferta(id)
        return Response(respuesta, mimetype="application/json")
    except Exception as e:
        return jsonify({"error": "Error al consultar oferta", "detalles": str(e)}), 500


@blueprint.route("/<id>", methods=["PUT"])
def actualizar_oferta(id):
    data = request.json
    schema = OfertaSchema()
    
    try:
        datos_validados = schema.load(data, partial=True)
        respuesta = Oferta.actualizar_oferta(id, datos_validados)
        return respuesta
    except Exception as e:
        return jsonify({"error": "Error al actualizar oferta", "detalles": str(e)}), 500
