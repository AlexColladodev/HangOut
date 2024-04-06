from marshmallow import Schema, fields, validate, ValidationError
from db import mongo

class OfertaSchema(Schema):
        nombre_oferta = fields.Str(required=True, validate=[validate.Length(min=1)])
        descripcion_oferta = fields.Str(required=True, validate=[validate.Length(min=1)])
        precio_oferta = fields.Float(required=True, validate=[validate.Range(min=0)])