from marshmallow import Schema, fields, validate, ValidationError
from db import mongo

def validar_nombre_usuario_unico(value):
    if mongo.db.usuarios.find_one({"nombre_usuario": value}):
        raise ValidationError("El nombre de usuario ya está en uso.")

class UsuarioGenericoSchema(Schema):
    nombre = fields.Str(required=True, validate=[validate.Length(min=1)])
    nombre_usuario = fields.Str(required=True, validate=[validate.Length(min=1), validar_nombre_usuario_unico])
    password = fields.Str(required=True, validate=[validate.Length(min=1)])
    email = fields.Email(required=True)
    telefono = fields.Str(required=True, validate=[validate.Length(min=1), validate.Regexp(regex="^\d{8,12}$")])
    edad = fields.Integer(required=True, validate=[validate.Range(min=1)])
    seguidos = fields.List(fields.Str(), required=False, missing=[])
    preferencias = fields.List(fields.Str(), required=False, missing=[])

