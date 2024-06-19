import pytest
from pymongo.errors import PyMongoError
from bson import ObjectId, json_util
from models.actividad import Actividad
from models.usuario_generico import UsuarioGenerico
from datetime import datetime

def test_insertar_actividad(mocker):
    mock_db = mocker.patch('models.actividad.mongo.db')
    mock_actividades = mock_db.actividades
    mock_actividades.insert_one.return_value.inserted_id = 'test_id'
    
    data = {
        "nombre_actividad": "Excursión",
        "descripcion_actividad": "Una excursión a la montaña.",
        "ubicacion": "Montaña",
        "fecha_actividad": "2024-07-01",
        "hora_actividad": "09:00:00",
        "id_usuario_creador": "user123",
        "participantes": ["user123", "user456"]
    }
    
    actividad = Actividad(data)
    result = actividad.insertar_actividad()
    
    expected_result = {"message": "Actividad creada con éxito", "id": "test_id"}
    
    assert result == expected_result
    mock_actividades.insert_one.assert_called_once()

def test_eliminar_actividad(mocker):
    mock_db = mocker.patch('models.actividad.mongo.db')
    mock_actividades = mock_db.actividades
    mock_actividades.find_one.return_value = {'_id': ObjectId('60b8d5b5f4864f1e9cba4d0c')}
    mock_actividades.delete_one.return_value.deleted_count = 1
    
    result = Actividad.eliminar_actividad('60b8d5b5f4864f1e9cba4d0c')
    
    expected_result = {"message": "Actividad eliminada con éxito"}
    
    assert result == expected_result
    mock_actividades.find_one.assert_called_once_with({"_id": ObjectId('60b8d5b5f4864f1e9cba4d0c')})
    mock_actividades.delete_one.assert_called_once_with({"_id": ObjectId('60b8d5b5f4864f1e9cba4d0c')})

def test_consultar_actividades(mocker):
    mock_db = mocker.patch('models.actividad.mongo.db')
    mock_actividades = mock_db.actividades
    mock_actividades.find.return_value = [
        {"_id": "test_id1", "nombre_actividad": "Excursión"},
        {"_id": "test_id2", "nombre_actividad": "Caminata"}
    ]
    
    result = Actividad.consultar_actividades()
    
    assert '"_id": "test_id1"' in result
    assert '"_id": "test_id2"' in result
    mock_actividades.find.assert_called_once()

import pytest
from pymongo.errors import PyMongoError
from bson import ObjectId, json_util
from models.actividad import Actividad
from datetime import datetime

def test_consultar_actividad(mocker):
    mock_db = mocker.patch('models.actividad.mongo.db')
    mock_actividades = mock_db.actividades
    mock_usuarios = mock_db.usuarios_genericos
    
    mock_actividades.find_one.return_value = {
        "_id": ObjectId("60b8d5b5f4864f1e9cba4d0c"),
        "nombre_actividad": "Desayuno donde Quique",
        "descripcion_actividad": "Vamos a desayunar en la casa de Quique a las 11:00 am",
        "fecha_actividad": datetime.strptime("2024-06-28T11:00:00", '%Y-%m-%dT%H:%M:%S'),
        "hora_actividad": "11:00:00",
        "ubicacion": "Casa de Quique",
        "id_usuario_creador": "667287c1b1fb995c379cbd0d",
        "participantes": ["60b8d5b5f4864f1e9cba4d0d"]
    }
    mock_usuarios.find_one.return_value = {
        "_id": ObjectId("60b8d5b5f4864f1e9cba4d0d"),
        "nombre_usuario": "Alex123"
    }
    
    result = Actividad.consultar_actividad("60b8d5b5f4864f1e9cba4d0c")
    
    result_dict = json_util.loads(result)
    
    assert result_dict["nombre_actividad"] == "Desayuno donde Quique"
    assert result_dict["perfil_participantes"][0]["nombre_usuario"] == "Alex123"
    
    mock_actividades.find_one.assert_called_once_with({"_id": ObjectId("60b8d5b5f4864f1e9cba4d0c")})
    mock_usuarios.find_one.assert_called_once_with(
        {"_id": ObjectId("60b8d5b5f4864f1e9cba4d0d")},
        {"nombre": 1, "nombre_usuario": 1, "fecha_nac": 1, "preferencias": 1, "imagen_url": 1}
    )


def test_actualizar_actividad(mocker):
    mock_db = mocker.patch('models.actividad.mongo.db')
    mock_actividades = mock_db.actividades
    mock_actividades.update_one.return_value.matched_count = 1
    
    data = {
        "nombre_actividad": "Desayuno en casa de Ana",
        "descripcion_actividad": "Vamos a desayunar en la casa de Anna a las 11:00 am",
        "fecha_actividad": "2024-07-02",
        "hora_actividad": "11:00:00",
        "ubicacion": "Nueva Ubicación"
    }
    
    result = Actividad.actualizar_actividad('60b8d5b5f4864f1e9cba4d0c', data)
    
    expected_result = {"message": "Actividad actualizada con éxito"}
    
    assert result == expected_result
    mock_actividades.update_one.assert_called_once_with(
        {"_id": ObjectId('60b8d5b5f4864f1e9cba4d0c')},
        {"$set": {
            "nombre_actividad": "Desayuno en casa de Ana",
            "descripcion_actividad": "Vamos a desayunar en la casa de Anna a las 11:00 am",
            "fecha_actividad": datetime.combine(datetime.strptime("2024-07-02", '%Y-%m-%d'), datetime.strptime("11:00:00", '%H:%M:%S').time()),
            "hora_actividad": "11:00:00",
            "ubicacion": "Nueva Ubicación"
        }}
    )
