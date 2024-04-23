from flask import Blueprint, request, Response, jsonify
from models.establecimiento import Establecimiento
from schemas.establecimiento_schema import EstablecimientosSchema
import requests

blueprint = Blueprint("Establecimiento", "establecimientos", url_prefix="/establecimientos")


@blueprint.route("", methods=["POST"])
def crear_establecimiento():
    data = request.json
    schema = EstablecimientosSchema()

    try:
        datos_validados = schema.load(data)
        establecimiento = Establecimiento(datos_validados)
        resultado = establecimiento.insertar_establecimiento()
        return resultado
    except Exception as e:
        return jsonify({"error": "Error al crear establecimiento", "detalles": str(e)}), 500


@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_establecimiento(id):
    try:
        respuesta = Establecimiento.eliminar_establecimiento(id)
        return respuesta
    except Exception as e:
        return jsonify({"error": "Error al eliminar establecimiento", "detalles": str(e)}), 500


@blueprint.route("", methods=["GET"])
def consultar_establecimientos():
    try:
        respuesta = Establecimiento.consultar_establecimientos()
        return Response(respuesta, mimetype="application/json")
    except Exception as e:
        return jsonify({"error": "Error al consultar establecimientos", "detalles": str(e)}), 500


@blueprint.route("/nueva_oferta", methods=["POST"])
def add_oferta():
    data = request.json
    id_establecimiento = data.get("id_establecimiento")

    try:
        respuesta_json = requests.post("http://127.0.0.1:5000/ofertas", json=data).json()
        id_oferta = respuesta_json.get("id")
        Establecimiento.add_ofertas_establecimiento(id_establecimiento, id_oferta)
        return respuesta_json
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Error en la solicitud al servicio de ofertas", "detalles": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Error al agregar oferta al establecimiento", "detalles": str(e)}), 500


@blueprint.route("/nuevo_evento", methods=["POST"])
def add_evento():
    data = request.json
    id_establecimiento = data.get("id_establecimiento")

    try:
        respuesta_json = requests.post("http://127.0.0.1:5000/eventos", json=data).json()
        id_evento = respuesta_json.get("id")
        Establecimiento.add_evento_establecimiento(id_establecimiento, id_evento)
        return respuesta_json
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Error en la solicitud al servicio de eventos", "detalles": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Error al agregar evento al establecimiento", "detalles": str(e)}), 500


@blueprint.route("/filtrar", methods=["GET"])
def filtrar():
    ambientes_solicitados = request.args.getlist("ambiente")
    
    try:
        respuesta = Establecimiento.filtrar_por_ambientes(ambientes_solicitados)
        return jsonify(respuesta), 200
    except Exception as e:
        return jsonify({"error": "Error al filtrar establecimientos", "detalles": str(e)}), 500
