from typing import Dict

class AdministradorEstablecimiento:

    def __init__(self, data: Dict) -> None:
        self._id = data.get("_id")
        self.nombre = data.get("nombre")
        self.nombre_usuario = data.get("nombre_usuario")
        self.password = data.get("password")
        self.dni = data.get("dni")
        self.email_empresa = data.get("email_empresa")
        self.establecimientos = data.get("establecimientos", [])


