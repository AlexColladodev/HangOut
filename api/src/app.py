from flask import Flask
from flask_pymongo import PyMongo
from flask_restful import Api
from services import usuario_generico_service
from db import init_mongo


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/HangOut"

init_mongo(app)

api = Api(app)

app.register_blueprint(usuario_generico_service.blueprint)

if __name__ == "__main__":
    app.run()