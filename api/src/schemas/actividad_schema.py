from marshmallow import Schema, fields, validate, ValidationError
from bson import ObjectId
from marshmallow.exceptions import ValidationError as MarshmallowValidationError
from db import mongo


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

    if mongo.db.usuarios_genericos.find_one({"_id": oid}) is None:
        raise ValidationError("Id de Administrador de establecimiento no válido")

class ActividadSchema(Schema):
        nombre_actividad = fields.Str(required=True, validate=[validate.Length(min=1)])
        descripcion_actividad = fields.Str(required=True, validate=[validate.Length(min=1)])
        ubicacion = fields.Str(required=True, validate=[validate.Length(min=1)])
        fecha_actividad = fields.Str(required=True, validate=[validate.Length(min=1)])
        hora_actividad  = fields.Str(required=True, validate=[validate.Length(min=1)])
        id_usuario_creador = ObjectIdField(required=True, validate=[validar_existencia_id])
        participantes = fields.List(fields.Str(), required=False, missing=[])