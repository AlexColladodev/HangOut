import pytest
from pymongo.errors import PyMongoError
from bson import ObjectId, json_util
from datetime import datetime
from models.usuario_generico import UsuarioGenerico

def test_insertar_usuario_generico(mocker):
    mock_db = mocker.patch('models.usuario_generico.mongo.db')
    mock_usuarios_genericos = mock_db.usuarios_genericos
    mock_usuarios_genericos.insert_one.return_value.inserted_id = 'test_id'
    
    data = {
        "nombre": "Xela",
        "nombre_usuario": "Xela",
        "password": "Xela",
        "email": "Xela@alex.com",
        "telefono": "123456789",
        "seguidos": [],
        "preferencias": ["Chill", "Monólogos"],
        "actividades_creadas": [],
        "reviews": [],
        "fecha_nac": "2000-09-25",
        "imagen_url": "/_uploads/photos/default.png"
    }
    
    usuario = UsuarioGenerico(data)
    result = usuario.insertar_usuario_generico()
    
    expected_result = {"message": "Usuario creado con éxito", "id": "test_id"}
    
    assert result == expected_result
    mock_usuarios_genericos.insert_one.assert_called_once()

def test_eliminar_usuario_generico(mocker):
    mock_db = mocker.patch('models.usuario_generico.mongo.db')
    mock_usuarios_genericos = mock_db.usuarios_genericos
    
    mock_usuarios_genericos.find_one.return_value = {
        '_id': ObjectId('66728d02c621bd5a4cf12906'),
    }
    mock_usuarios_genericos.delete_one.return_value.deleted_count = 1
    
    result = UsuarioGenerico.eliminar_usuario_generico('66728d02c621bd5a4cf12906')
    
    expected_result = {"message": "Usuario eliminado con éxito"}
    
    assert result == expected_result
    mock_usuarios_genericos.find_one.assert_called_once_with({"_id": ObjectId('66728d02c621bd5a4cf12906')})
    mock_usuarios_genericos.delete_one.assert_called_once_with({"_id": ObjectId('66728d02c621bd5a4cf12906')})

def test_consultar_usuarios(mocker):
    mock_db = mocker.patch('models.usuario_generico.mongo.db')
    mock_usuarios_genericos = mock_db.usuarios_genericos
    mock_usuarios_genericos.find.return_value = [
        {"_id": ObjectId("66728d02c621bd5a4cf12906"), "nombre_usuario": "Xela"},
        {"_id": ObjectId("66728d17c621bd5a4cf12907"), "nombre_usuario": "AlexXela"}
    ]
    
    result = UsuarioGenerico.consultar_usuarios()
    
    print("Result from consultar_usuarios:", result)
    
    result_list = json_util.loads(result)
    
    assert len(result_list) == 2
    assert result_list[0]["nombre_usuario"] == "Xela"
    assert result_list[1]["nombre_usuario"] == "AlexXela"
    mock_usuarios_genericos.find.assert_called_once()
