import pytest
from pymongo.errors import PyMongoError
from bson import ObjectId, json_util
from models.oferta import Oferta

def test_insertar_oferta(mocker):
    mock_db = mocker.patch('models.oferta.mongo.db')
    mock_ofertas = mock_db.ofertas
    mock_ofertas.insert_one.return_value.inserted_id = 'test_id'
    
    data = {
        "nombre_oferta": "Oferta Especial",
        "descripcion_oferta": "50% de descuento en cervezas",
        "precio_oferta": 5.99,
        "id_establecimiento": "establecimiento1",
        "imagen_url": "/_uploads/photos/default_no_image.jpeg"
    }
    
    oferta = Oferta(data)
    result = oferta.insertar_oferta()
    
    expected_result = {"message": "Oferta creada con éxito", "id_oferta": "test_id"}
    
    assert result == expected_result
    mock_ofertas.insert_one.assert_called_once()

def test_eliminar_oferta(mocker):
    mock_db = mocker.patch('models.oferta.mongo.db')
    mock_ofertas = mock_db.ofertas
    mock_establecimientos = mock_db.establecimientos
    
    mock_ofertas.find_one.return_value = {
        '_id': ObjectId('66728d02c621bd5a4cf12906'),
        'id_establecimiento': '6672879db1fb995c379cbd0c'
    }
    mock_establecimientos.update_one.return_value.modified_count = 1
    mock_ofertas.delete_one.return_value.deleted_count = 1
    
    result = Oferta.eliminar_oferta('66728d02c621bd5a4cf12906')
    
    expected_result = {"message": "Oferta eliminada con éxito"}
    
    assert result == expected_result
    mock_ofertas.find_one.assert_called_once_with({"_id": ObjectId('66728d02c621bd5a4cf12906')})
    mock_establecimientos.update_one.assert_called_once_with(
        {"_id": ObjectId('6672879db1fb995c379cbd0c')},
        {"$pull": {"ofertas": '66728d02c621bd5a4cf12906'}}
    )
    mock_ofertas.delete_one.assert_called_once_with({"_id": ObjectId('66728d02c621bd5a4cf12906')})

def test_consultar_ofertas(mocker):
    mock_db = mocker.patch('models.oferta.mongo.db')
    mock_ofertas = mock_db.ofertas
    mock_ofertas.find.return_value = [
        {"_id": ObjectId("66728d02c621bd5a4cf12906"), "nombre_oferta": "Oferta Especial"},
        {"_id": ObjectId("66728d17c621bd5a4cf12907"), "nombre_oferta": "2x1 en Tapas"}
    ]
    
    result = Oferta.consultar_ofertas()
    
    result_list = json_util.loads(result)
    
    assert len(result_list) == 2
    assert result_list[0]["nombre_oferta"] == "Oferta Especial"
    assert result_list[1]["nombre_oferta"] == "2x1 en Tapas"
    mock_ofertas.find.assert_called_once()

def test_consultar_oferta(mocker):
    mock_db = mocker.patch('models.oferta.mongo.db')
    mock_ofertas = mock_db.ofertas
    
    mock_ofertas.find_one.return_value = {
        "_id": ObjectId("66728d02c621bd5a4cf12906"),
        "nombre_oferta": "Oferta Especial",
        "descripcion_oferta": "50% de descuento en cervezas",
        "precio_oferta": 5.99,
        "id_establecimiento": "establecimiento1",
        "imagen_url": "/_uploads/photos/default_no_image.jpeg"
    }
    
    result = Oferta.consultar_oferta("66728d02c621bd5a4cf12906")
    
    result_dict = json_util.loads(result)
    
    assert result_dict["_id"] == ObjectId("66728d02c621bd5a4cf12906")
    assert result_dict["nombre_oferta"] == "Oferta Especial"
    assert result_dict["descripcion_oferta"] == "50% de descuento en cervezas"
    
    mock_ofertas.find_one.assert_called_once_with({"_id": ObjectId("66728d02c621bd5a4cf12906")})

def test_actualizar_oferta(mocker):
    mock_db = mocker.patch('models.oferta.mongo.db')
    mock_ofertas = mock_db.ofertas
    mock_ofertas.update_one.return_value.modified_count = 1
    
    id = '66728d02c621bd5a4cf12906'
    data = {
        "nombre_oferta": "Oferta Actualizada",
        "descripcion_oferta": "30% de descuento en comidas",
        "precio_oferta": 15.0
    }
    
    result = Oferta.actualizar_oferta(id, data)
    
    expected_result = {"message": "Oferta actualizada con éxito"}
    
    assert result == expected_result
    mock_ofertas.update_one.assert_called_once_with(
        {"_id": ObjectId(id)},
        {"$set": {
            "nombre_oferta": "Oferta Actualizada",
            "descripcion_oferta": "30% de descuento en comidas",
            "precio_oferta": 15.0
        }}
    )

def test_actualizar_oferta_no_changes(mocker):
    mock_db = mocker.patch('models.oferta.mongo.db')
    mock_ofertas = mock_db.ofertas
    mock_ofertas.update_one.return_value.modified_count = 0
    
    id = '66728d02c621bd5a4cf12906'
    data = {
        "nombre_oferta": "Oferta Actualizada",
        "descripcion_oferta": "30% de descuento en comidas",
        "precio_oferta": 15.0
    }
    
    with pytest.raises(ValueError, match="No se pudo actualizar la oferta"):
        Oferta.actualizar_oferta(id, data)

    mock_ofertas.update_one.assert_called_once_with(
        {"_id": ObjectId(id)},
        {"$set": {
            "nombre_oferta": "Oferta Actualizada",
            "descripcion_oferta": "30% de descuento en comidas",
            "precio_oferta": 15.0
        }}
    )
