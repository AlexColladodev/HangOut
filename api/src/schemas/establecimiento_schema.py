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
    cif = fields.Str(
        required=True,
        validate=[validar_cif_unico],
        error_messages={"required": "CIF sin rellenar"}
    )
    nombre_establecimiento = fields.Str(
        required=True,
        validate=[validate.Length(min=1, error="Nombre de establecimiento sin rellenar"), validar_nombre_establecimiento_unico]
    )
    id_administrador = fields.Str(
        required=True,
        validate=[validar_existencia_id],
        error_messages={"required": "No existe este administrador"}
    )
    ambiente = fields.List(
        fields.Str(),
        required=True,
        error_messages={"required": "Ambiente sin rellenar"}
    )
    ofertas = fields.List(fields.Str(), required=False, missing=[])
    eventos = fields.List(fields.Str(), required=False, missing=[])
    reviews = fields.List(fields.Str(), required=False, missing=[])
    imagen_url = fields.Str(
        required=False,
        error_messages={"required": "Fallo en la imagen"}
    )
