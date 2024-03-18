import java.util.ArrayList;

public class Evento{ //Eventos realizados en establecimientos
    
    private String codigoEvento;
    private String nombreEvento;
    private String descripcionEvento;
    private String fechaEvento;
    private float precioEvento;
    private String horaEvento;

    Evento(){
        codigoEvento = "";
        nombreEvento = "";
        descripcionEvento = "";
        fechaEvento = "";
        precioEvento = 0.0f;
        horaEvento = "";
    }

    Evento(String codigoEvento, String nombreEvento, String descripcionEvento, String fechaEvento, float precioEvento, String horaEvento){
        this.codigoEvento = codigoEvento;
        this.nombreEvento = nombreEvento;
        this.descripcionEvento = descripcionEvento;
        this.fechaEvento = fechaEvento;
        this.precioEvento = precioEvento;
        this.horaEvento = horaEvento;
    }

    //Getters y Setters

    String getCodigoEvento(){
        return this.codigoEvento;
    }

    String getNombreEvento(){
        return this.nombreEvento;
    }

    String getDescripcionEvento(){
        return this.descripcionEvento;
    }

    String getFechaEvento(){
        return this.fechaEvento;
    }

    float getPrecioEvento(){
        return this.precioEvento;
    }

    String getHoraEvento(){
        return this.horaEvento;
    }

    void setCodigoEvento(String codigoEvento){
        this.codigoEvento = codigoEvento;
    }

    void setNombreEvento(String nombreEvento){
        this.nombreEvento = nombreEvento;
    }

    void setDescripcionEvento(String descripcionEvento){
        this.descripcionEvento = descripcionEvento;
    }

    void setFechaEvento(String nuevaFecha){
        this.fechaEvento = nuevaFecha;
    }

    void setPrecioEvento(float precio){
        this.precioEvento = precio;
    }

    void setHoraEvento(String hora){
        this.horaEvento = hora;
    }

    //Final Getters y Setters

    void printInfoEvento(){
        System.out.println("Codigo Evento: " + codigoEvento);
        System.out.println("Nombre Evento: " + nombreEvento);
        System.out.println("Descripción Evento: " + descripcionEvento);
        System.out.println("Fecha de Evento: " + fechaEvento);
        System.out.println("Hora de Evento: " + horaEvento);
        System.out.println("Precio de Evento: " + precioEvento);
    }

}

