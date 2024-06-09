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

def validar_nombre_usuario_unico(value):
    nombre_usuario_sin_espacios = value.strip()
    if mongo.db.administradores_establecimientos.find_one({"nombre_usuario": nombre_usuario_sin_espacios}) or mongo.db.usuarios_genericos.find_one({"nombre_usuario": nombre_usuario_sin_espacios}):
        raise ValidationError("El nombre de usuario ya está en uso.")

class UsuarioGenericoSchema(Schema):
    nombre = fields.Str(
        required=True,
        validate=[validate.Length(min=1)],
        error_messages={"required": "Nombre sin rellenar"}
    )
    nombre_usuario = fields.Str(
        required=True,
        validate=[validate.Length(min=1), validar_nombre_usuario_unico],
        error_messages={"required": "Nombre de usuario sin rellenar"}
    )
    password = fields.Str(
        required=True,
        validate=[validate.Length(min=1)],
        error_messages={"required": "Contraseña sin rellenar"}
    )
    email = fields.Email(
        required=True,
        error_messages={"required": "Correo electrónico sin rellenar"}
    )
    telefono = fields.Str(
        required=True,
        validate=[validate.Length(min=1), validate.Regexp(regex=r"^\d{8,12}$")],
        error_messages={"required": "Teléfono sin rellenar"}
    )
    seguidos = fields.List(
        fields.Str(),
        required=False,
        missing=[]
    )
    preferencias = fields.List(
        fields.Str(),
        required=False,
        missing=[]
    )
    actividades_creadas = fields.List(
        fields.Str(),
        required=False,
        missing=[]
    )
    reviews = fields.List(
        fields.Str(),
        required=False,
        missing=[]
    )
    fecha_nac = fields.Str(
        required=True,
        validate=[validate.Length(min=1)],
        error_messages={"required": "Fecha de nacimiento sin rellenar"}
    )
    imagen_url = fields.Str(
        required=True
    )
