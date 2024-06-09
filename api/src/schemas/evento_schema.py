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
    nombre_evento = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Nombre de Evento sin rellenar")]
    )
    descripcion_evento = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Descripcion de Evento sin rellenar")]
    )
    fecha_evento = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Fecha de Evento sin rellenar")]
    )
    precio = fields.Float(
        required=True,
        validate=[validate.Range(min=0.0)],
        error_messages={"required": "Precio de Evento sin rellenar"}
    )
    hora_evento = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Hora de Evento sin rellenar")]
    )
    id_establecimiento = fields.Str(
        required=True,
        validate=[validar_existencia_id],
        error_messages={"required": "No existe este establecimiento"}
    )
    imagen_url = fields.Str(
        required=True,
        error_messages={"required": "Fallo en la imagen"}
    )
