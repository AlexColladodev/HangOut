import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;

public class Establecimiento{
    private String CIF;
    private String nombreEstablecimiento;
    private Set<String> Ambiente;
    private AdministradorEstablecimiento admin;
    private ArrayList<Oferta> ofertas;
    private ArrayList<Evento> eventos;
    private ArrayList<Reseña> reseñas;

    Establecimiento(String CIF, AdministradorEstablecimiento admin, String nombreEstablecimiento){
        this.CIF = CIF;
        this.admin = admin;
        this.nombreEstablecimiento = nombreEstablecimiento;

        ofertas = new ArrayList<>();
        Ambiente = new HashSet<>();
        eventos = new ArrayList<>();
        reseñas = new ArrayList<>();

        admin.addEstablecimiento(this); // Al crear establecimiento, al ADMIN se le asocia directamente
    }

    Establecimiento(){
        this.CIF = "";
        this.admin = null;
        this.nombreEstablecimiento = "";

        ofertas = new ArrayList<>();
        Ambiente = new HashSet<>();
        eventos = new ArrayList<>();
        reseñas = new ArrayList<>();

    }

    //Getters y Setters

    public String getCIF() {
        return CIF;
    }

    public void setCIF(String CIF) {
        this.CIF = CIF;
    }

    public String getNombreEstablecimiento() {
        return nombreEstablecimiento;
    }

    public void setNombreEstablecimiento(String nombreEstablecimiento) {
        this.nombreEstablecimiento = nombreEstablecimiento;
    }

    public Set<String> getAmbiente() {
        return Ambiente;
    }

    public void setAmbiente(Set<String> Ambiente) {
        this.Ambiente = Ambiente;
    }

    public AdministradorEstablecimiento getAdmin() {
        return admin;
    }

    public void setAdmin(AdministradorEstablecimiento admin) {
        this.admin = admin;
    }

    public ArrayList<Oferta> getOfertas() {
        return ofertas;
    }

    public void setOfertas(ArrayList<Oferta> ofertas) {
        this.ofertas = ofertas;
    }

    public ArrayList<Evento> getEventos() {
        return eventos;
    }

    public void setEvento(ArrayList<Evento> eventos) {
        this.eventos = eventos;
    }

    public ArrayList<Reseña> getReseñas() {
        return reseñas;
    }

    public void setReseñas(ArrayList<Reseña> reseña) {
        this.reseñas = reseña;
    }

    //Fin Getters y Setters

    void addOferta(String codigo, String titulo, String descripcion, float precio, String fecha){
        Oferta oferta = new Oferta(codigo, titulo, descripcion, precio, fecha);
        ofertas.add(oferta);
    }

    void addEvento(String codigoEvento, String nombreEvento, String descripcionEvento, float precioEvento, String fechaEvento, String horaEvento){
        Evento evento = new Evento(codigoEvento, nombreEvento, descripcionEvento, fechaEvento, precioEvento, horaEvento);
        eventos.add(evento);
    }

    void printInfoEstablecimimento(){
        System.out.println("CIF: " + this.CIF);
        System.out.println("Admin: " + this.admin.getNombre());
        System.out.println("Nombre Establecimiento: " + this.nombreEstablecimiento);
        System.out.println("Ambiente: " + Ambiente);

        System.out.println("Ofertas: ");
        for(Oferta oferta : ofertas){
            System.out.println(oferta.getTituloOferta());
        }

        System.out.println("Eventos: ");
        for(Evento evento : eventos){
            System.out.println(evento.getNombreEvento());
        }
    }

}