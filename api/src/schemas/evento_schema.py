from marshmallow import Schema, fields, validate, ValidationError
from db import mongo
from bson import ObjectId
from marshmallow.exceptions import ValidationError as MarshmallowValidationError

class ObjectIdField(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return None
        return str(value)
    
    def _deserialize(self, value, attr, data, **kwargs):
        try:
            return ObjectId(value)
        except Exception:
            raise MarshmallowValidationError("El ID proporcionado no es válido.")
        
def validar_existencia_id(value):
    try:
        oid = ObjectId(value)
    except Exception:
        raise ValidationError("Id de Administrador de establecimiento debe ser un ObjectId válido.")

    if mongo.db.establecimientos.find_one({"_id": oid}) is None:
        raise ValidationError("Id de Administrador de establecimiento no válido")
        


class EventoSchema(Schema):
        nombre_evento = fields.Str(required=True, validate=[validate.Length(min=1)])
        descripcion_evento = fields.Str(required=True, validate=[validate.Length(min=1)])
        fecha_evento = fields.Str(required=True, validate=[validate.Length(min=1)])
        precio = fields.Float(required=True, validate=[validate.Range(min=0.0)])
        hora_evento = fields.Str(required=True, validate=[validate.Length(min=1)])
        id_establecimiento = ObjectIdField(required=True, validate=[validar_existencia_id])