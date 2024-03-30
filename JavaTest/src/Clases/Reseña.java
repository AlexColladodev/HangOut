import java.time.LocalDate;

public class Reseña {
    private String codigoResena;
    private int calificacion;
    private String comentarioResena;
    private LocalDate fechaResena;
    private String codigoUsuario;
    private String codigoEntidad; // Puede ser actividad, evento o establecimiento

    // Constructor
    public Reseña(String codigoResena, int calificacion, String comentarioResena, LocalDate fechaResena, String codigoUsuario, String codigoEntidad) {
        this.codigoResena = codigoResena;
        this.calificacion = calificacion;
        this.comentarioResena = comentarioResena;
        this.fechaResena = fechaResena;
        this.codigoUsuario = codigoUsuario;
        this.codigoEntidad = codigoEntidad;
    }

    // Getters y Setters
    // Métodos específicos...

    @Override
    public String toString() {
        return "Reseña{" +
               "Código='" + codigoResena + '\'' +
               ", Calificación=" + calificacion +
               ", Comentario='" + comentarioResena + '\'' +
               ", Fecha=" + fechaResena +
               ", Usuario='" + codigoUsuario + '\'' +
               ", Entidad='" + codigoEntidad + '\'' +
               '}';
    }
}
