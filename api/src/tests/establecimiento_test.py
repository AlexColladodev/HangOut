import pytest
from pymongo.errors import PyMongoError
from bson import ObjectId, json_util
from models.establecimiento import Establecimiento

def test_insertar_establecimiento(mocker):
    mock_db = mocker.patch('models.establecimiento.mongo.db')
    mock_establecimientos = mock_db.establecimientos
    mock_establecimientos.insert_one.return_value.inserted_id = 'test_id'
    
    data = {
        "cif": "111222333X",
        "nombre_establecimiento": "Bar La Esquina",
        "id_administrador": "6672879db1fb995c379cbd0c",
        "ambiente": ["Chill", "Bar", "En Vivo"],
        "ofertas": [],
        "eventos": [],
        "reviews": [],
        "imagen_url": "/_uploads/photos/default_establecimiento.jpeg"
    }
    
    establecimiento = Establecimiento(data)
    result = establecimiento.insertar_establecimiento()
    
    expected_result = {"message": "Establecimiento con id: test_id creado con éxito", "id": "test_id"}
    
    assert result == expected_result
    mock_establecimientos.insert_one.assert_called_once()

def test_eliminar_establecimiento(mocker):
    mock_db = mocker.patch('models.establecimiento.mongo.db')
    mock_establecimientos = mock_db.establecimientos
    mock_establecimientos.find_one.return_value = {
        '_id': ObjectId('66728d02c621bd5a4cf12906'),
        'id_administrador': '6672879db1fb995c379cbd0c'
    }
    mock_establecimientos.delete_one.return_value.deleted_count = 1
    
    result = Establecimiento.eliminar_establecimiento('66728d02c621bd5a4cf12906')
    
    expected_result = {"message": "Establecimiento 66728d02c621bd5a4cf12906 eliminado con éxito", "id_administrador": '6672879db1fb995c379cbd0c'}
    
    assert result == expected_result
    mock_establecimientos.find_one.assert_called_once_with({"_id": ObjectId('66728d02c621bd5a4cf12906')})
    mock_establecimientos.delete_one.assert_called_once_with({"_id": ObjectId('66728d02c621bd5a4cf12906')})

def test_consultar_establecimientos(mocker):
    mock_db = mocker.patch('models.establecimiento.mongo.db')
    mock_establecimientos = mock_db.establecimientos
    mock_establecimientos.find.return_value = [
        {"_id": ObjectId("66728d02c621bd5a4cf12906")},
        {"_id": ObjectId("66728d17c621bd5a4cf12907")}
    ]
    
    result = Establecimiento.consultar_establecimientos()
    
    expected_result = json_util.dumps(["66728d02c621bd5a4cf12906", "66728d17c621bd5a4cf12907"])
    
    assert result == expected_result
    mock_establecimientos.find.assert_called_once_with({}, {"_id": 1})

def test_consultar_establecimiento(mocker):
    mock_db = mocker.patch('models.establecimiento.mongo.db')
    mock_establecimientos = mock_db.establecimientos
    
    mock_establecimientos.find_one.return_value = {
        "_id": ObjectId("66728d02c621bd5a4cf12906"),
        "cif": "111222333X",
        "nombre_establecimiento": "Bar La Esquina",
        "id_administrador": "6672879db1fb995c379cbd0c",
        "ambiente": ["Chill", "Bar", "En Vivo"],
        "ofertas": [],
        "eventos": [],
        "reviews": [],
        "imagen_url": "/_uploads/photos/default_establecimiento.jpeg"
    }
    
    result = Establecimiento.consultar_establecimiento("66728d02c621bd5a4cf12906")
    
    result_dict = json_util.loads(result)
    
    assert result_dict["_id"] == ObjectId("66728d02c621bd5a4cf12906")
    assert result_dict["cif"] == "111222333X"
    assert result_dict["nombre_establecimiento"] == "Bar La Esquina"
    
    mock_establecimientos.find_one.assert_called_once_with({"_id": ObjectId("66728d02c621bd5a4cf12906")})

def test_actualizar_establecimiento(mocker):
    mock_db = mocker.patch('models.establecimiento.mongo.db')
    mock_establecimientos = mock_db.establecimientos
    mock_establecimientos.update_one.return_value.modified_count = 1
    
    id = '66728d02c621bd5a4cf12906'
    data = {
        "nombre_establecimiento": "Bar La Esquina Actualizado",
        "ambiente": ["Chill", "Rock"]
    }
    
    result = Establecimiento.actualizar_establecimiento(id, data)
    
    expected_result = {"message": "Establecimiento actualizado exitosamente"}
    
    assert result == expected_result
    mock_establecimientos.update_one.assert_called_once_with(
        {"_id": ObjectId(id)},
        {"$set": {
            "nombre_establecimiento": "Bar La Esquina Actualizado",
            "ambiente": ["Chill", "Rock"]
        }}
    )