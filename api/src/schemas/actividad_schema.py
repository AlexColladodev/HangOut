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
        raise ValidationError("Id de Usuario debe ser un ObjectId válido.")
    if mongo.db.usuarios_genericos.find_one({"_id": oid}) is None:
        raise ValidationError("Id de Usuario no válido")

class ActividadSchema(Schema):
    nombre_actividad = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Nombre de Actividad sin rellenar")]
    )
    descripcion_actividad = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Descripción de Actividad sin rellenar")]
    )
    ubicacion = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Ubicación de Actividad sin rellenar")]
    )
    fecha_actividad = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Fecha de Actividad sin rellenar")]
    )
    hora_actividad = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Hora de Actividad sin rellenar")]
    )
    id_usuario_creador = fields.Str(
        required=True,
        validate=[validar_existencia_id],
        error_messages={"required": "No existe este usuario"}
    )
    participantes = fields.List(fields.Str(), required=False, missing=[])
