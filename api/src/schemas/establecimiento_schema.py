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

def validar_nombre_establecimiento_unico(value):
    if mongo.db.establecimientos.find_one({"nombre_establecimiento": value}):
        raise ValidationError("El nombre de establecimiento ya está en uso.")
    
def validar_cif_unico(value):
    cif_sin_espacios = value.strip()

    if len(cif_sin_espacios) < 9:
        raise ValidationError("El CIF debe tener al menos 9 caracteres, sin contar espacios en blanco.")
    if mongo.db.establecimientos.find_one({"cif": cif_sin_espacios}):
        raise ValidationError("El CIF ya está en uso.")
    
def validar_existencia_id(value):
    try:
        oid = ObjectId(value)
    except Exception:
        raise ValidationError("Id de Administrador de establecimiento debe ser un ObjectId válido.")

    if mongo.db.administradores_establecimientos.find_one({"_id": oid}) is None:
        raise ValidationError("Id de Administrador de establecimiento no válido")
    
class EstablecimientosSchema(Schema):
    cif = fields.Str(required=True, validate=[validate.Length(min=9), validar_cif_unico])
    nombre_establecimiento = fields.Str(required=True, validate=[validate.Length(min=1), validar_nombre_establecimiento_unico])
    id_administrador = ObjectIdField(required=True, validate=[validar_existencia_id])
    ambiente = fields.List(fields.Str(), required=True)
    ofertas = fields.List(fields.Str(), required=False, missing=[])
    eventos = fields.List(fields.Str(), required=False, missing=[])
    reviews = fields.List(fields.Str(), required=False, missing=[])

