import java.util.ArrayList;

public class AdministradorEstablecimiento extends Usuario{

    private String DNI;
    private String codigoTrabajador;
    private String correoTrabajador;
    private ArrayList<Establecimiento> establecimientos; //Establecimientos a su cargo


    AdministradorEstablecimiento(){
        this.DNI = "";
        this.codigoTrabajador = "";
        this.correoTrabajador = "";

        establecimientos = new ArrayList<>();
    }

    AdministradorEstablecimiento(String DNI, String codigoTrabajador, String correoTrabajador){
        this.DNI = DNI;
        this.codigoTrabajador = codigoTrabajador;
        this.correoTrabajador = correoTrabajador;

        establecimientos = new ArrayList<>();
    }

    //Getters y Setters
    public String getDNI() {
        return DNI;
    }

    public void setDNI(String DNI) {
        this.DNI = DNI;
    }

    public String getCodigoTrabajador() {
        return codigoTrabajador;
    }

    public void setCodigoTrabajador(String codigoTrabajador) {
        this.codigoTrabajador = codigoTrabajador;
    }

    public String getCorreoTrabajador() {
        return correoTrabajador;
    }

    public void setCorreoTrabajador(String correoTrabajador) {
        this.correoTrabajador = correoTrabajador;
    }

    public ArrayList<Establecimiento> getEstablecimientos() {
        return establecimientos;
    }

    public void setEstablecimientos(ArrayList<Establecimiento> establecimientos) {
        this.establecimientos = establecimientos;
    }

    //Fin Getters y Setters


    void addEstablecimiento(Establecimiento establecimiento){
        establecimientos.add(establecimiento);
    }

    void printEstablecimientos(){
        for (Establecimiento establecimiento : establecimientos) {
            System.out.println("\t" + establecimiento.getNombreEstablecimiento());
        }
    }

    void imprimirInforUsuarioAdministradorEstablecimientos(){
        System.out.println("DNI: " + DNI);
        System.out.println("Codigo Trabajador: " + codigoTrabajador);
        System.out.println("Correo Trabajador: " + correoTrabajador);
    }


}