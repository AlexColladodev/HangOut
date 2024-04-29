from flask import Blueprint, request, Response, jsonify
from models.administrador_establecimiento import AdministradorEstablecimiento
from schemas.administrador_establecimiento_schema import AdministradorEstablecimientoSchema
from flask_jwt_extended import get_jwt_identity, jwt_required
import requests
from config import DevelopmentConfig

blueprint = Blueprint("AdministradorEstablecimiento", "administrador_establecimiento", url_prefix="/administrador_establecimiento")

url = f"{DevelopmentConfig.BASE_URL}/establecimientos"


@blueprint.route("", methods=["POST"])
def crear_administrador_establecimiento():
    data = request.json
    schema = AdministradorEstablecimientoSchema()

    try:
        datos_validados = schema.load(data)
        administrador_establecimiento = AdministradorEstablecimiento(datos_validados)
        resultado = administrador_establecimiento.insertar_administrador_establecimiento()
        return jsonify(resultado), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_administrador_establecimiento(id):
    try:
        respuesta = AdministradorEstablecimiento.eliminar_administrador_establecimiento(id)
        return jsonify(respuesta), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500


@blueprint.route("", methods=["GET"])
def consultar_administradores_establecimiento():
    try:
        respuesta = AdministradorEstablecimiento.consultar_administradores_establecimiento()
        return Response(respuesta, mimetype="application/json"), 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado al consultar administradores de establecimientos: {e}"}), 500


@blueprint.route("/<id>", methods=["GET"])
def consultar_administrador_establecimiento(id):
    try:
        respuesta = AdministradorEstablecimiento.consultar_administrador_establecimiento(id)
        return Response(respuesta, mimetype="application/json"), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado al consultar administradores de establecimientos: {e}"}), 500


@blueprint.route("/<id>", methods=["PUT"])
def actualizar_administrador_establecimiento(id):
    data = request.json
    try:
        respuesta = AdministradorEstablecimiento.actualizar_administrador_establecimiento(id, data)
        return jsonify(respuesta), 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado al consultar administradores de establecimientos: {e}"}), 500


@blueprint.route("/nuevo_establecimiento", methods=["POST"])
@jwt_required()
def crear_establecimiento():
    data = request.json
    administrador = get_jwt_identity()
    id_administrador = administrador.get("_id")

    data["id_administrador"] = str(id_administrador)

    try:
        respuesta_json = requests.post(url, json=data).json()
        return jsonify(respuesta_json), 200
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Error en la solicitud de creación de establecimiento", "detalles": str(e)}), 400
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Error general en crear establecimiento", "detalles": str(e)}), 500
