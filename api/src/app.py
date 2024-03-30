from flask import Flask
from flask_pymongo import PyMongo
from flask_restful import Api
from services import usuario_generico_service, administrador_establecimientos_service, establecimiento_service, actividad_service, evento_service, oferta_service
from db import init_mongo


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/HangOut"

init_mongo(app)

api = Api(app)

app.register_blueprint(usuario_generico_service.blueprint)
app.register_blueprint(administrador_establecimientos_service.blueprint)
app.register_blueprint(establecimiento_service.blueprint)
app.register_blueprint(oferta_service.blueprint)
app.register_blueprint(actividad_service.blueprint)
app.register_blueprint(evento_service.blueprint)


if __name__ == "__main__":
    app.run()