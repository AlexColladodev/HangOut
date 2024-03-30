from typing import Dict

class Establecimiento:

    def __init__(self, data: Dict) -> None:
        self.cif = data.get("cif")
        self.nombre_establecimiento = data.get("nombre_establecimiento")
        self.ambiente = data.get("ambiente", [])
        self.ofertas = data.get("ofertas", [])
        self.eventos = data.get("eventos", [])
        self.reviews = data.get("reviews", [])

    