from marshmallow import Schema, fields, validate, ValidationError
from db import mongo
from bson import ObjectId
        
def validar_existencia_id(value):
    try:
        oid = ObjectId(value)
    except Exception:
        raise ValidationError("Id de Administrador de establecimiento debe ser un ObjectId válido.")

    if mongo.db.establecimientos.find_one({"_id": oid}) is None:
        raise ValidationError("Id de Administrador de establecimiento no válido")

class OfertaSchema(Schema):
        nombre_oferta = fields.Str(required=True, validate=[validate.Length(min=1)])
        descripcion_oferta = fields.Str(required=True, validate=[validate.Length(min=1)])
        precio_oferta = fields.Float(required=True, validate=[validate.Range(min=0)])
        id_establecimiento = fields.Str(required=True, validate=[validar_existencia_id])