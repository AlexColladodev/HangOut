from marshmallow import Schema, fields, validate, ValidationError
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
        raise ValidationError("El dni ya está en uso.")
    
class AdministradorEstablecimientoSchema(Schema):
    nombre = fields.Str(required=True, validate=[validate.Length(min=1)])
    nombre_usuario = fields.Str(required=True, validate=[validate.Length(min=1), validar_nombre_usuario_unico])
    password = fields.Str(required=True, validate=[validate.Length(min=1)])
    email_empresa = fields.Email(required=True)
    establecimientos = fields.List(fields.Str(), required=False, missing=[])
    dni = fields.Str(required=True, validate=[validate.Length(min=8), validar_dni_unico])
    telefono = fields.Str(required=True, validate=[validate.Length(min=1), validate.Regexp(regex=r"^\d{8,12}$")])
    fecha_nac = fields.Str(required=True, validate=[validate.Length(min=1)])