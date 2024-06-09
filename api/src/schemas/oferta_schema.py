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
    nombre_oferta = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Nombre de Oferta sin rellenar")]
    )
    descripcion_oferta = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Descripción de la Oferta sin rellenar")]
    )
    precio_oferta = fields.Float(
        required=True,
        validate=[validate.Range(min=0)],
        error_messages={"required": "Precio de la Oferta sin rellenar. Se puede colocar 0.00"}
    )
    id_establecimiento = fields.Str(
        required=True,
        validate=[validar_existencia_id],
        error_messages={"required": "Datos sin rellenar"}
    )
    imagen_url = fields.Str(
        required=True,
        error_messages={"required": "Datos sin rellenar"}
    )
