from marshmallow import Schema, fields, validate, ValidationError
from db import mongo

class EventoSchema(Schema):
        nombre_evento = fields.Str(required=True, validate=[validate.Length(min=1)])
        descripcion_evento = fields.Str(required=True, validate=[validate.Length(min=1)])
        fecha_evento = fields.Str(required=True, validate=[validate.Length(min=1)])
        precio = fields.Float(required=True, validate=[validate.Length(min=0)])
        hora_evento = fields.Str(required=True, validate=[validate.Length(min=1)])