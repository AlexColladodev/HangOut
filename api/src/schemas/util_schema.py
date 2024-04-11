from bson import ObjectId
from marshmallow import Schema, fields
from marshmallow import ValidationError as MarshmallowValidationError

class ObjectIdField(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return None
        return str(value)
    
    def _deserialize(self, value, attr, data, **kwargs):
        try:
            return ObjectId(value)
        except Exception:
            raise MarshmallowValidationError('El ID proporcionado no es válido.')