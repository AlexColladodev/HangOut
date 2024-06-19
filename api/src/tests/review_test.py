import pytest
from pymongo.errors import PyMongoError
from bson import ObjectId
from models.review import Review

def test_insertar_review(mocker):
    mock_db = mocker.patch('models.review.mongo.db')
    mock_reviews = mock_db.reviews
    mock_reviews.insert_one.return_value.inserted_id = 'test_id'

    data = {
        "calificacion": 5,
        "mensaje": "No la mejor cena",
        "id_usuario": "usuario_generico1",
        "id_establecimiento": "establecimiento1",
        "fecha_creacion": "2024-06-19"
    }
    review = Review(data)
    result = review.insertar_review()
    
    expected_result = {"message": "Review creada con éxito", "id_review": "test_id"}
    
    assert result == expected_result
    mock_reviews.insert_one.assert_called_once()

def test_eliminar_review(mocker):
    mock_db = mocker.patch('models.review.mongo.db')
    mock_reviews = mock_db.reviews
    mock_reviews.find_one.return_value = {'_id': ObjectId('60b8d5b5f4864f1e9cba4d0c')}
    mock_reviews.delete_one.return_value.deleted_count = 1
    
    result = Review.eliminar_review('60b8d5b5f4864f1e9cba4d0c')
    
    expected_result = {"message": "Review eliminada con éxito"}
    
    assert result == expected_result
    mock_reviews.find_one.assert_called_once_with({"_id": ObjectId('60b8d5b5f4864f1e9cba4d0c')})
    mock_reviews.delete_one.assert_called_once_with({"_id": ObjectId('60b8d5b5f4864f1e9cba4d0c')})

def test_consultar_reviews(mocker):
    mock_db = mocker.patch('models.review.mongo.db')
    mock_reviews = mock_db.reviews
    mock_reviews.find.return_value = [
        {"_id": "test_id1", "mensaje": "Buen servicio"},
        {"_id": "test_id2", "mensaje": "Excelente"}
    ]
    
    result = Review.consultar_reviews()
    
    assert '"_id": "test_id1"' in result
    assert '"_id": "test_id2"' in result
    mock_reviews.find.assert_called_once()

def test_consultar_review(mocker):
    mock_db = mocker.patch('models.review.mongo.db')
    mock_reviews = mock_db.reviews
    mock_usuarios = mock_db.usuarios_genericos
    mock_establecimientos = mock_db.establecimientos
    
    mock_reviews.find_one.return_value = {
        "_id": ObjectId("60b8d5b5f4864f1e9cba4d0c"),
        "id_usuario": ObjectId("60b8d5b5f4864f1e9cba4d0d"),
        "id_establecimiento": ObjectId("60b8d5b5f4864f1e9cba4d0e")
    }
    mock_usuarios.find_one.return_value = {"_id": ObjectId("60b8d5b5f4864f1e9cba4d0d"), "nombre_usuario": "Alex123"}
    mock_establecimientos.find_one.return_value = {"_id": ObjectId("60b8d5b5f4864f1e9cba4d0e"), "nombre_establecimiento": "G10"}
    
    result = Review.consultar_review("60b8d5b5f4864f1e9cba4d0c")
    
    assert '"nombre_usuario": "Alex123"' in result
    assert '"nombre_establecimiento": "G10"' in result
    mock_reviews.find_one.assert_called_once_with({"_id": ObjectId("60b8d5b5f4864f1e9cba4d0c")})
    mock_usuarios.find_one.assert_called_once_with({"_id": ObjectId("60b8d5b5f4864f1e9cba4d0d")})
    mock_establecimientos.find_one.assert_called_once_with({"_id": ObjectId("60b8d5b5f4864f1e9cba4d0e")})