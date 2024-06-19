import pytest
from pymongo.errors import PyMongoError
from bson import ObjectId, json_util
from datetime import datetime, date, time
from models.evento import Evento

def test_insertar_evento(mocker):
    mock_db = mocker.patch('models.evento.mongo.db')
    mock_eventos = mock_db.eventos
    mock_eventos.insert_one.return_value.inserted_id = 'test_id'
    
    data = {
        "nombre_evento": "Concierto de Rock",
        "descripcion_evento": "Concierto en vivo de la banda XYZ",
        "fecha_evento": "2024-07-01",
        "hora_evento": "20:00:00",
        "precio": 20.0,
        "id_establecimiento": "establecimiento1",
        "imagen_url": "/_uploads/photos/default_no_image.jpeg"
    }
    
    evento = Evento(data)
    result = evento.insertar_evento()
    
    expected_result = {"message": "Evento con id: test_id creado con éxito", "id_evento": "test_id"}
    
    assert result == expected_result
    mock_eventos.insert_one.assert_called_once()

def test_eliminar_evento(mocker):
    mock_db = mocker.patch('models.evento.mongo.db')
    mock_eventos = mock_db.eventos
    mock_establecimientos = mock_db.establecimientos
    
    mock_eventos.find_one.return_value = {
        '_id': ObjectId('66728d02c621bd5a4cf12906'),
        'id_establecimiento': '6672879db1fb995c379cbd0c'
    }
    mock_establecimientos.update_one.return_value.modified_count = 1
    mock_eventos.delete_one.return_value.deleted_count = 1
    
    result = Evento.eliminar_evento('66728d02c621bd5a4cf12906')
    
    expected_result = {"message": "Evento eliminado con éxito"}
    
    assert result == expected_result
    mock_eventos.find_one.assert_called_once_with({"_id": ObjectId('66728d02c621bd5a4cf12906')})
    mock_establecimientos.update_one.assert_called_once_with(
        {"_id": ObjectId('6672879db1fb995c379cbd0c')},
        {"$pull": {"eventos": '66728d02c621bd5a4cf12906'}}
    )
    mock_eventos.delete_one.assert_called_once_with({"_id": ObjectId('66728d02c621bd5a4cf12906')})

def test_consultar_eventos(mocker):
    mock_db = mocker.patch('models.evento.mongo.db')
    mock_eventos = mock_db.eventos
    mock_eventos.find.return_value = [
        {"_id": ObjectId("66728d02c621bd5a4cf12906"), "nombre_evento": "Concierto de Rock"},
        {"_id": ObjectId("66728d17c621bd5a4cf12907"), "nombre_evento": "Obra de Teatro"}
    ]
    
    result = Evento.consultar_eventos()
    
    result_list = json_util.loads(result)
    
    assert len(result_list) == 2
    assert result_list[0]["nombre_evento"] == "Concierto de Rock"
    assert result_list[1]["nombre_evento"] == "Obra de Teatro"
    mock_eventos.find.assert_called_once()

def test_consultar_evento(mocker):
    mock_db = mocker.patch('models.evento.mongo.db')
    mock_eventos = mock_db.eventos
    
    mock_eventos.find_one.return_value = {
        "_id": ObjectId("66728d02c621bd5a4cf12906"),
        "nombre_evento": "Concierto de Rock",
        "descripcion_evento": "Concierto en vivo de la banda XYZ",
        "fecha_evento": datetime.strptime("2024-07-01 20:00:00", '%Y-%m-%d %H:%M:%S'),
        "precio": 20.0,
        "hora_evento": "20:00:00",
        "id_establecimiento": "establecimiento1",
        "imagen_url": "/_uploads/photos/dafeult_no_image.jpeg"
    }
    
    result = Evento.consultar_evento("66728d02c621bd5a4cf12906")
    
    result_dict = json_util.loads(result)
    
    assert result_dict["_id"] == ObjectId("66728d02c621bd5a4cf12906")
    assert result_dict["nombre_evento"] == "Concierto de Rock"
    assert result_dict["descripcion_evento"] == "Concierto en vivo de la banda XYZ"
    
    mock_eventos.find_one.assert_called_once_with({"_id": ObjectId("66728d02c621bd5a4cf12906")})

def test_actualizar_evento(mocker):
    mock_db = mocker.patch('models.evento.mongo.db')
    mock_eventos = mock_db.eventos
    mock_eventos.update_one.return_value.modified_count = 1
    
    id = '66728d02c621bd5a4cf12906'
    data = {
        "nombre_evento": "Concierto de Jazz",
        "descripcion_evento": "Concierto en vivo de la banda ABC",
        "fecha_evento": "2024-07-15",
        "hora_evento": "21:00:00"
    }
    
    result = Evento.actualizar_evento(id, data)
    
    expected_result = {"message": "Evento actualizado con éxito"}
    
    assert result == expected_result
    mock_eventos.update_one.assert_called_once_with(
        {"_id": ObjectId(id)},
        {"$set": {
            "nombre_evento": "Concierto de Jazz",
            "descripcion_evento": "Concierto en vivo de la banda ABC",
            "fecha_evento": datetime.combine(date(2024, 7, 15), time(21, 0)),
        }}
    )

def test_actualizar_evento_no_changes(mocker):
    mock_db = mocker.patch('models.evento.mongo.db')
    mock_eventos = mock_db.eventos
    mock_eventos.update_one.return_value.modified_count = 0
    
    id = '66728d02c621bd5a4cf12906'
    data = {
        "nombre_evento": "Concierto de Jazz Blue",
        "descripcion_evento": "Concierto en vivo de la banda ABC",
        "fecha_evento": "2024-07-15",
        "hora_evento": "21:00:00"
    }
    
    with pytest.raises(RuntimeError, match="Se debe cambiar algún dato para actualizar el evento"):
        Evento.actualizar_evento(id, data)

    mock_eventos.update_one.assert_called_once_with(
        {"_id": ObjectId(id)},
        {"$set": {
            "nombre_evento": "Concierto de Jazz Blue",
            "descripcion_evento": "Concierto en vivo de la banda ABC",
            "fecha_evento": datetime.combine(date(2024, 7, 15), time(21, 0)),
        }}
    )
