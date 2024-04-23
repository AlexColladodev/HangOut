from marshmallow import Schema, fields, validate, ValidationError
from db import mongo

def validar_nombre_usuario_unico(value):
    nombre_usuario_sin_espacios = value.strip()

    if mongo.db.administradores_establecimientos.find_one({"nombre_usuario": nombre_usuario_sin_espacios}) or mongo.db.usuarios_genericos.find_one({"nombre_usuario": nombre_usuario_sin_espacios}):
        raise ValidationError("El nombre de usuario ya está en uso.")

class UsuarioGenericoSchema(Schema):
    nombre = fields.Str(required=True, validate=[validate.Length(min=1)])
    nombre_usuario = fields.Str(required=True, validate=[validate.Length(min=1), validar_nombre_usuario_unico])
    password = fields.Str(required=True, validate=[validate.Length(min=1)])
    email = fields.Email(required=True)
    telefono = fields.Str(required=True, validate=[validate.Length(min=1), validate.Regexp(regex=r"^\d{8,12}$")])
    edad = fields.Integer(required=True, validate=[validate.Range(min=1)])
    seguidos = fields.List(fields.Str(), required=False, missing=[])
    preferencias = fields.List(fields.Str(), required=False, missing=[])
    actividades_creadas = fields.List(fields.Str(), required=False, missing=[])
    reviews = fields.List(fields.Str(), required=False, missing=[])

