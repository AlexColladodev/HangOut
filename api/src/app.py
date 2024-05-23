from flask import Flask, request, jsonify
#from flask_restful import Api
from services import usuario_generico_service, administrador_establecimientos_service, establecimiento_service, actividad_service, evento_service, oferta_service, review_service
from db import init_mongo, mongo
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from werkzeug.security import check_password_hash
from flask_restx import Api
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/HangOut"
app.config["JWT_SECRET_KEY"] = "Ap?&/u]rk0b5=:+E"
jwt = JWTManager(app)
CORS(app)


init_mongo(app)

api = Api(app)

app.register_blueprint(usuario_generico_service.blueprint)
app.register_blueprint(administrador_establecimientos_service.blueprint)
app.register_blueprint(establecimiento_service.blueprint)
app.register_blueprint(oferta_service.blueprint)
app.register_blueprint(actividad_service.blueprint)
app.register_blueprint(evento_service.blueprint)
app.register_blueprint(review_service.blueprint)

@app.route("/login", methods=["POST"])
def login():
    datos = request.json

    usuario = datos.get("nombre_usuario")
    password_comprobar = datos.get("password")


    usuario_generico = mongo.db.usuarios_genericos.find_one({"nombre_usuario": usuario})
    administrador_establecimiento = mongo.db.administradores_establecimientos.find_one({"nombre_usuario": usuario})


    if usuario_generico is not None:
        password = usuario_generico["password"]

        if (check_password_hash(password, password_comprobar)):
            resultado = {
                "acceso": True,
                "token": create_access_token(identity=preparar_para_jwt(usuario_generico)),
                "usuario_generico": usuario_generico,
                "rol": "usuario_generico"
            }

        else:
            resultado = {"acceso": False}

    elif administrador_establecimiento is not None:
        password = administrador_establecimiento["password"]
        
        if (check_password_hash(password, password_comprobar)):
            resultado = {"acceso": True, 
                         "token": create_access_token(identity=preparar_para_jwt(administrador_establecimiento)), 
                         "administrador_establecimiento": administrador_establecimiento, 
                         "rol": "administrador_establecimiento"
                         
                         }
        else:
            resultado = {"acceso": False}
    else:
        resultado = {"acceso": False}

    return resultado


@app.route('/nombre', methods=['GET'])
@jwt_required()
def obtener_nombre_usuario():
    nombre_usuario = get_jwt_identity()
    nombre = nombre_usuario.get("nombre")
    return jsonify({"nombre_usuario": nombre}), 200


def preparar_para_jwt(objeto):
    if "_id" in objeto:
        objeto["_id"] = str(objeto["_id"])
    return objeto


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
