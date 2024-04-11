from marshmallow import Schema, fields, validate

class ActividadSchema(Schema):
        nombre_actividad = fields.Str(required=True, validate=[validate.Length(min=1)])
        descripcion_actividad = fields.Str(required=True, validate=[validate.Length(min=1)])
        ubicacion = fields.Str(required=True, validate=[validate.Length(min=1)])
        fecha_actividad = fields.Str(required=True, validate=[validate.Length(min=1)])
        hora_actividad  = fields.Str(required=True, validate=[validate.Length(min=1)])