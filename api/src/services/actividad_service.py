from flask import Blueprint, request, Response, jsonify
from models.actividad import Actividad
from schemas.actividad_schema import ActividadSchema

blueprint = Blueprint("Actividad", "actividades", url_prefix="/actividades")

@blueprint.route("", methods=["POST"])
def crear_actividad():
    data = request.json
    schema = ActividadSchema()

    try:
        datos_validados = schema.load(data)
        actividad = Actividad(datos_validados)
        resultado = actividad.insertar_actividad()
        return resultado
    except Exception as e:
        return jsonify({"error": "Error al crear la actividad", "detalles": str(e)}), 500


@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_actividad(id):
    try:
        respuesta = Actividad.eliminar_actividad(id)
        return respuesta
    except Exception as e:
        return jsonify({"error": "Error al eliminar la actividad", "detalles": str(e)}), 500


@blueprint.route("", methods=["GET"])
def consultar_actividades():
    try:
        respuesta = Actividad.consultar_actividades()
        return Response(respuesta, mimetype="application/json")
    except Exception as e:
        return jsonify({"error": "Error al consultar actividades", "detalles": str(e)}), 500


@blueprint.route("/<id>", methods=["GET"])
def consultar_actividad(id):
    try:
        respuesta = Actividad.consultar_actividad(id)
        return Response(respuesta, mimetype="application/json")
    except Exception as e:
        return jsonify({"error": "Error al consultar la actividad", "detalles": str(e)}), 500


@blueprint.route("/<id>", methods=["PUT"])
def actualizar_actividad(id):
    data = request.json
    
    try:
        schema = ActividadSchema()
        datos_validados = schema.load(data)
        respuesta = Actividad.actualizar_actividad(id, datos_validados)
        return respuesta
    except Exception as e:
        return jsonify({"error": "Error al actualizar la actividad", "detalles": str(e)}), 500
