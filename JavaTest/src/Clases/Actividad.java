import java.util.ArrayList;

public class Actividad {
    private String tituloActividad;
    private String descripcionActividad;
    private String direccionActividad;
    private String horaActividad;
    private String fechaActividad;

    Actividad() {
        this.tituloActividad = "";
        this.descripcionActividad = "";
        this.direccionActividad = "";
        this.horaActividad = "";
        this.fechaActividad = "";
    }

    Actividad(String titulo, String descripcion, String direccion, String hora, String fecha) {
        this.tituloActividad = titulo;
        this.descripcionActividad = descripcion;
        this.direccionActividad = direccion;
        this.horaActividad = hora;
        this.fechaActividad = fecha;
    }

    // Getters
    public String getTituloActividad() {
        return tituloActividad;
    }

    public String getDescripcionActividad() {
        return descripcionActividad;
    }

    public String getDireccionActividad() {
        return direccionActividad;
    }

    public String getHoraActividad() {
        return horaActividad;
    }

    public String getFechaActividad() {
        return fechaActividad;
    }

    // Setters
    public void setTituloActividad(String tituloActividad) {
        this.tituloActividad = tituloActividad;
    }

    public void setDescripcionActividad(String descripcionActividad) {
        this.descripcionActividad = descripcionActividad;
    }

    public void setDireccionActividad(String direccionActividad) {
        this.direccionActividad = direccionActividad;
    }

    public void setHoraActividad(String horaActividad) {
        this.horaActividad = horaActividad;
    }

    public void setFechaActividad(String fechaActividad) {
        this.fechaActividad = fechaActividad;
    }
}
