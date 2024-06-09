from marshmallow import Schema, fields, validate, ValidationError
from bson import ObjectId
from marshmallow.exceptions import ValidationError as MarshmallowValidationError
from db import mongo


def validar_nombre_usuario_unico(value):
    nombre_usuario_sin_espacios = value.strip()
    if mongo.db.administradores_establecimientos.find_one({"nombre_usuario": nombre_usuario_sin_espacios}) or mongo.db.usuarios_genericos.find_one({"nombre_usuario": nombre_usuario_sin_espacios}):
        raise ValidationError("El nombre de usuario ya está en uso.")


def validar_dni_unico(value):
    dni_sin_espacios = value.strip()
    if len(dni_sin_espacios) < 8:
        raise ValidationError("El DNI debe tener al menos 8 caracteres, sin contar espacios en blanco.")
    if mongo.db.administradores_establecimientos.find_one({"dni": value}):
        raise ValidationError("El DNI ya está en uso.")


class AdministradorEstablecimientoSchema(Schema):
    nombre = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Nombre sin rellenar")]
    )
    nombre_usuario = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Nombre de usuario sin rellenar"), validar_nombre_usuario_unico]
    )
    password = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Contraseña sin rellenar")]
    )
    email = fields.Email(
        required=True,
        error_messages={"required": "Correo electrónico sin rellenar"}
    )
    establecimientos = fields.List(fields.Str(), required=False, missing=[])
    dni = fields.Str(
        required=True,
        validate=[validar_dni_unico],
        error_messages={"required": "DNI sin rellenar"}
    )
    telefono = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Teléfono sin rellenar"), validate.Regexp(regex=r"^\d{8,12}$", error="Formato de teléfono no válido")]
    )
    fecha_nac = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Fecha de nacimiento sin rellenar")]
    )
    imagen_url = fields.Str(
        required=False,
        error_messages={"required": "Fallo en la imagen"}
    )
