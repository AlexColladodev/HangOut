from typing import Dict
from datetime import date, datetime

class Evento:

    def __init__(self, data: Dict) -> None:
        self.id_evento = data.get("id_evento")
        self.nombre_evento = data.get("nombre_evento")
        self.descripcion_evento = data.get("descripcion_evento")
        self.fecha_evento = date.fromisoformat(data.get("fecha_evento")) if data.get("fecha_evento") else None
        self.precio = data.get("precio")
        self.hora_evento = datetime.strptime(data.get("hora_evento"), '%H:%M:%S').time() if data.get("hora_evento") else None
