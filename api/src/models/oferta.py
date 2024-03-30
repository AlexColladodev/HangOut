from typing import Dict
from datetime import date, datetime

class Oferta:

    def __init__(self, data: Dict) -> None:
        self.id_oferta = data.get("id_oferta")
        self.nombre_oferta = data.get("nombre_oferta")
        self.descripcion_oferta = data.get("descripcion_oferta")
        self.precio_oferta = data.get("precio_oferta")
        