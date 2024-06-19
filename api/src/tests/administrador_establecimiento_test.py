import pytest
from pymongo.errors import PyMongoError
from bson import ObjectId, json_util
from models.administrador_establecimiento import AdministradorEstablecimiento
from datetime import datetime

def test_insertar_administrador_establecimiento(mocker):
    mock_db = mocker.patch('models.administrador_establecimiento.mongo.db')
    mock_administradores = mock_db.administradores_establecimientos
    mock_administradores.insert_one.return_value.inserted_id = 'test_id'
    
    data = {
        "nombre": "Admin Insertado",
        "nombre_usuario": "Admin Insertado",
        "password": "Admin Insertado",
        "dni": "000111222A",
        "email": "adminnuevo@adminnuevo.com",
        "establecimientos": [],
        "telefono": "852147963",
        "fecha_nac": "2000-09-25",
        "imagen_url": "/_uploads/photos/default.png"
    }
    
    administrador = AdministradorEstablecimiento(data)
    result = administrador.insertar_administrador_establecimiento()
    
    expected_result = {"message": "Administrador de establecimiento creado con éxito", "id": "test_id"}
    
    assert result == expected_result
    mock_administradores.insert_one.assert_called_once()


def test_eliminar_administrador_establecimiento(mocker):
    mock_db = mocker.patch('models.administrador_establecimiento.mongo.db')
    mock_administradores = mock_db.administradores_establecimientos
    mock_administradores.find_one.return_value = {'_id': ObjectId('60b8d5b5f4864f1e9cba4d0c')}
    mock_administradores.delete_one.return_value.deleted_count = 1
    
    result = AdministradorEstablecimiento.eliminar_administrador_establecimiento('60b8d5b5f4864f1e9cba4d0c')
    
    expected_result = {"message": "Administrador de establecimiento con id: 60b8d5b5f4864f1e9cba4d0c eliminado con éxito"}
    
    assert result == expected_result
    mock_administradores.find_one.assert_called_once_with({"_id": ObjectId('60b8d5b5f4864f1e9cba4d0c')})
    mock_administradores.delete_one.assert_called_once_with({"_id": ObjectId('60b8d5b5f4864f1e9cba4d0c')})

def test_consultar_administradores_establecimiento(mocker):
    mock_db = mocker.patch('models.administrador_establecimiento.mongo.db')
    mock_administradores = mock_db.administradores_establecimientos
    mock_administradores.find.return_value = [
        {"_id": ObjectId("60b8d5b5f4864f1e9cba4d0c"), "nombre": "Admin Insertado"},
        {"_id": ObjectId("60b8d5b5f4864f1e9cba4d0d"), "nombre": "Admin 2 Insertado"}
    ]
    
    result = AdministradorEstablecimiento.consultar_administradores_establecimiento()
    
    result_list = json_util.loads(result)
    
    assert len(result_list) == 2
    assert result_list[0]["nombre"] == "Admin Insertado"
    assert result_list[1]["nombre"] == "Admin 2 Insertado"
    mock_administradores.find.assert_called_once()

def test_actualizar_administrador_establecimiento(mocker):
    mock_db = mocker.patch('models.administrador_establecimiento.mongo.db')
    mock_administradores = mock_db.administradores_establecimientos
    mock_administradores.update_one.return_value.modified_count = 1
    
    id = '60b8d5b5f4864f1e9cba4d0c'
    data = {
        "nombre": "Admin Insertado",
        "nombre_usuario": "Admin Insertado",
        "password": "Admin Insertado",
        "dni": "000111222A",
        "email": "adminnuevo@adminnuevo.com",
        "establecimientos": [],
        "telefono": "852147963",
        "fecha_nac": "2000-09-25",
        "imagen_url": "/_uploads/photos/default.png"
    }
    
    result = AdministradorEstablecimiento.actualizar_administrador_establecimiento(id, data)
    
    expected_result = {"message": f"Administrador de establecimiento con id: {id} actualizado con éxito"}
    
    assert result == expected_result
    mock_administradores.update_one.assert_called_once_with(
        {"_id": ObjectId(id)},
        {"$set": {
            "nombre": "Admin Insertado",
            "nombre_usuario": "Admin Insertado",
            "email": "adminnuevo@adminnuevo.com",
            "telefono": "852147963",
            "fecha_nac": datetime.fromisoformat("2000-09-25"),
            "imagen_url": "/_uploads/photos/default.png"
        }}
    )

def test_actualizar_administrador_establecimiento_no_changes(mocker):
    mock_db = mocker.patch('models.administrador_establecimiento.mongo.db')
    mock_administradores = mock_db.administradores_establecimientos
    mock_administradores.update_one.return_value.modified_count = 0
    
    id = '60b8d5b5f4864f1e9cba4d0c'
    data = {
        "nombre": "Admin Insertado",
        "nombre_usuario": "Admin Insertado",
        "password": "Admin Insertado",
        "dni": "000111222A",
        "email": "adminnuevo@adminnuevo.com",
        "establecimientos": [],
        "telefono": "852147963",
        "fecha_nac": "2000-09-25",
        "imagen_url": "/_uploads/photos/default.png"
    }
    
    with pytest.raises(RuntimeError, match="No ha habido cambios a realizar"):
        AdministradorEstablecimiento.actualizar_administrador_establecimiento(id, data)

    mock_administradores.update_one.assert_called_once_with(
        {"_id": ObjectId(id)},
        {"$set": {
            "nombre": "Admin Insertado",
            "nombre_usuario": "Admin Insertado",
            "email": "adminnuevo@adminnuevo.com",
            "telefono": "852147963",
            "fecha_nac": datetime.fromisoformat("2000-09-25"),
            "imagen_url": "/_uploads/photos/default.png"
        }}
    )