from services.usuario_generico_service import *
from models.usuario_generico import UsuarioGenerico
from schemas.usuario_generico_schema import UsuarioGenericoSchema
import pytest
from db import mongo


def test_usuario_generico_schema():
    schema = UsuarioGenericoSchema()
    input_data = {
        "nombre_usuario": "nuevo_usuario",
        "email": "email@valido.com",
        "password": "contraseña_segura",
        "nombre": "Test1",
        "telefono": "1234567899",
        "edad": 20,
        "seguidos": [],
        "preferencias": [],
        "actividades_creadas": []
    }

    result = schema.load(input_data)
    assert result == input_data

    invalid_input = input_data.copy()
    invalid_input["email"] = "email"
    with pytest.raises(ValidationError) as excinfo:
        schema.load(invalid_input)
    assert "email" in str(excinfo.value)


def test_nombre_usuario_unico():
    existe, user_id = UsuarioGenerico.existe_nombre_usuario("TestUsuario1")
   
    assert existe == True
    assert user_id == "661be4933d2e931ccbd71d65"

def test_nombre_usuario_repetido():
    existe, user_id = UsuarioGenerico.existe_nombre_usuario("UsuarioNoExiste")
   
    assert existe == False
    assert user_id == None

def test_crear_usuario_generico_exito(client):
    datos_usuario = {
        "nombre": "Nuevo Usuario",
        "nombre_usuario": "nuevousuario123",
        "password": "password",
        "email": "correo@ejemplo.com",
        "telefono": "1234567890",
        "edad": 25,
        "seguidos": [],
        "preferencias": [],
        "actividades_creadas": []
    }


    respuesta = client.post("/usuario_generico", json=datos_usuario)
    assert respuesta.status_code == 200
    assert respuesta.json == {"message": "Usuario creado con éxito"}

def test_crear_usuario_generico_repetido(client):
    datos_usuario = {
        "nombre": "Nuevo Usuario",
        "nombre_usuario": "nuevousuario123", #Repeticion nombre_usuario
        "password": "password",
        "email": "correo@ejemplo.com",
        "telefono": "1234567890",
        "edad": 25,
        "seguidos": [],
        "preferencias": [],
        "actividades_creadas": []
    }

    respuesta = client.post("/usuario_generico", json=datos_usuario)

    assert respuesta.status_code == 400
    assert respuesta.json == {"error": "Validación fallida", "detalles": {"nombre_usuario": ["El nombre de usuario ya está en uso."]}}

def test_crear_usuario_generico_error(client):
    datos_usuario = {
        "nombre": "Nuevo Usuario",
        "nombre_usuario": "UsuarioNoRepetido1234",
        "password": "password",
        "telefono": "1234567890",
        "edad": 25,
        "seguidos": [],
        "preferencias": [],
        "actividades_creadas": []
    }

    respuesta = client.post("/usuario_generico", json=datos_usuario)

    assert respuesta.status_code == 400
    assert respuesta.json == {"error": "Validación fallida", "detalles": {"email": ["Missing data for required field."]}}


def test_get_usuario_exito(client):
    usuario = mongo.db.usuarios_genericos.find_one({"nombre_usuario": "nuevousuario123"})
    id_usuario = str(usuario["_id"])
    respuesta = client.get(f"/usuario_generico/{id_usuario}")

    assert respuesta is not None

def test_get_usuario_error(client):
    id_usuario = "123456488"
    respuesta = client.get(f"/usuario_generico/{id_usuario}")

    assert respuesta.status_code == 500


def test_actualizar_usuario(client):
    usuario = mongo.db.usuarios_genericos.find_one({"nombre_usuario": "nuevousuario123"})
    id_usuario = str(usuario["_id"])

    datos_usuario = {
        "nombre": "TestActualizar",
        "nombre_usuario": "TestActualizarUsuario",
        "password": "12341234",
        "email": "actualizar@test.com",
        "telefono": "1234567811",
        "edad": 23,
        "seguidos": "",
        "preferencias": ["pop", "rock", "reggaeton", "bar"],
        "actividades_crear": []
    }

    respuesta = client.put(f"/usuario_generico/{id_usuario}", json=datos_usuario)

    assert respuesta.status_code == 200


def test_eliminar_usuario_exito(client):
    usuario = mongo.db.usuarios_genericos.find_one({"nombre_usuario": "TestActualizarUsuario"})
    id_usuario = str(usuario["_id"])
    respuesta = client.delete(f"/usuario_generico/{id_usuario}")

    assert respuesta.status_code == 200

def test_eliminar_usuario_error(client):

    id_usuario = "123456789"

    respuesta = client.delete(f"/usuario_generico/{id_usuario}")

    assert respuesta.status_code == 500
