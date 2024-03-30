public class Notificacion {
    private String tituloNotificacion;
    private String descripcionNotificacion;

    // Constructor por defecto
    public Notificacion() {
        this.tituloNotificacion = "";
        this.descripcionNotificacion = "";
    }

    // Constructor con parámetros
    public Notificacion(String tituloNotificacion, String descripcionNotificacion) {
        this.tituloNotificacion = tituloNotificacion;
        this.descripcionNotificacion = descripcionNotificacion;
    }

    // Getters
    public String getTituloNotificacion() {
        return tituloNotificacion;
    }

    public String getDescripcionNotificacion() {
        return descripcionNotificacion;
    }

    // Setters
    public void setTituloNotificacion(String tituloNotificacion) {
        this.tituloNotificacion = tituloNotificacion;
    }

    public void setDescripcionNotificacion(String descripcionNotificacion) {
        this.descripcionNotificacion = descripcionNotificacion;
    }
}
