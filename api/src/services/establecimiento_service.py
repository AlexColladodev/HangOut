from flask import Blueprint, request, Response, jsonify
from models.establecimiento import Establecimiento
from schemas.establecimiento_schema import EstablecimientosSchema
import requests
from config import DevelopmentConfig
from models.administrador_establecimiento import AdministradorEstablecimiento
from models.oferta import Oferta
from models.evento import Evento
from models.review import Review
from uploads_config import photos

blueprint = Blueprint("Establecimiento", "establecimientos", url_prefix="/establecimientos")

url_oferta = f"{DevelopmentConfig.BASE_URL}/ofertas"
url_evento = f"{DevelopmentConfig.BASE_URL}/eventos"

@blueprint.route("", methods=["POST"])
def crear_establecimiento():
    if 'imagen' in request.files and request.files['imagen'].filename != '':
        filename = photos.save(request.files['imagen'])
        imagen_url = photos.url(filename)
        data = request.form.to_dict()
        data['imagen_url'] = str(imagen_url)
    else:
        data = request.form.to_dict()
        data['imagen_url'] = f'{DevelopmentConfig.IP_URL}/_uploads/photos/default_establecimiento.png'
        data.pop('imagen')

    data['ambiente'] = data['ambiente'].split(',')

    schema = EstablecimientosSchema()
    
    try:
        datos_validados = schema.load(data)
        establecimiento = Establecimiento(datos_validados)
        resultado = establecimiento.insertar_establecimiento()
        id_establecimiento = str(resultado.get("id"))
        AdministradorEstablecimiento.add_establecimiento_administrador(data.get("id_administrador"), id_establecimiento)
        return jsonify(resultado), 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Error al crear establecimiento", "detalles": str(e)}), 500


@blueprint.route("/<id>", methods=["DELETE"])
def eliminar_establecimiento(id):
    try:
        respuesta = Establecimiento.eliminar_establecimiento(id)
        id_administrador = respuesta.get("id_administrador")

        #Al eliminar un establecimiento se debe:

        id_establecimiento = str(id)

        #Eliminar el id de la lista "establecimientos" del administrador
        AdministradorEstablecimiento.del_establecimiento_administrador(id_administrador, id_establecimiento)

        #Eliminar Ofertas-Eventos-Reviews asociadas a ese establecimiento
        Oferta.del_oferta_establecimiento(id)
        Evento.del_evento_establecimiento(id)
        Review.del_review_establecimiento(id)

        return respuesta, 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {e}"}), 500



@blueprint.route("", methods=["GET"])
def consultar_establecimientos():
    try:
        respuesta = Establecimiento.consultar_establecimientos()
        return Response(respuesta, mimetype="application/json"), 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado al consultar actividades: {e}"}), 500
    
@blueprint.route("/ordenados", methods=["GET"])
def consultar_establecimientos_ordenados():
    try:
        respuesta = Establecimiento.consultar_establecimientos_ordenados()
        return Response(respuesta, mimetype="application/json"), 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado al consultar actividades: {e}"}), 500
    
@blueprint.route("<id>", methods=["GET"])
def consultar_establecimiento(id):
    try:
        respuesta = Establecimiento.consultar_establecimiento(id)
        return Response(respuesta, mimetype="application/json"), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado al consultar actividades: {e}"}), 500


@blueprint.route("/nueva_oferta", methods=["POST"])
def add_oferta():
    if 'imagen' in request.files and request.files['imagen'].filename != '':
        filename = photos.save(request.files['imagen'])
        imagen_url = photos.url(filename)
        data = request.form.to_dict()
        data['imagen_url'] = str(imagen_url)
    else:
        data = request.form.to_dict()
        data['imagen_url'] = f'{DevelopmentConfig.IP_URL}/_uploads/photos/default_no_image.png'
        data.pop('imagen')

    id_establecimiento = data.get("id_establecimiento")

    try:
        respuesta_json = requests.post(url_oferta, json=data).json()
        id_oferta = respuesta_json.get("id_oferta")
        Establecimiento.add_ofertas_establecimiento(id_establecimiento, id_oferta)
        return respuesta_json, 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado al consultar actividades: {e}"}), 500


@blueprint.route("/nuevo_evento", methods=["POST"])
def add_evento():
    if 'imagen' in request.files and request.files['imagen'].filename != '':
        filename = photos.save(request.files['imagen'])
        imagen_url = photos.url(filename)
        data = request.form.to_dict()
        data['imagen_url'] = str(imagen_url)
    else:
        data = request.form.to_dict()
        data['imagen_url'] = f'{DevelopmentConfig.IP_URL}/_uploads/photos/default_no_image.png'
        data.pop('imagen')

    id_establecimiento = data.get("id_establecimiento")

    try:
        respuesta_json = requests.post(url_evento, json=data).json()
        id_evento = respuesta_json.get("id_evento")
        Establecimiento.add_evento_establecimiento(id_establecimiento, id_evento)
        return respuesta_json, 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado al consultar actividades: {e}"}), 500


@blueprint.route("/filtrar", methods=["GET"])
def filtrar():
    ambientes_solicitados = request.args.getlist("ambiente")
    
    try:
        respuesta = Establecimiento.filtrar_por_ambientes(ambientes_solicitados)
        return jsonify(respuesta), 200
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado al consultar actividades: {e}"}), 500
    

@blueprint.route("/rating/<id>", methods=["GET"])
def obtener_calificacion(id):
    try:
        respuesta = Establecimiento.media_reviews(id)
        return respuesta, 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Error inesperado al consultar la media: {e}"}), 500
