import java.util.ArrayList;

public class Usuario{
    
    private String codigoUsuario;
    private String nombreUsuario;
    private String contrasenia;
    private String nombre;
    private String correo;
    private String telefono;
    private int edad;

    Usuario() {
        this.codigoUsuario = "";
        this.nombreUsuario = "";
        this.contrasenia = "";
        this.nombre = "";
        this.correo = "";
        this.telefono = "";
        this.edad = 0;
    }

    Usuario(String codigoUsuario, String nombreUsuario, String contrasenia, String nombre, String correo, String telefono, int edad) {
        this.codigoUsuario = codigoUsuario;
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.edad = edad;
    }

    // Getters y Setters
    public String getCodigoUsuario() {
        return codigoUsuario;
    }

    public void setCodigoUsuario(String codigoUsuario) {
        this.codigoUsuario = codigoUsuario;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    //Fin Getters y Setters

    public void imprimirInforUsuario(){
        System.out.println("Codigo Usuario: " + codigoUsuario);
        System.out.println("Nombre Usuario: " + nombreUsuario);
        System.out.println("Nombre: " + nombre);
        System.out.println("Correo: " + correo);
        System.out.println("Edad: " + edad);
        System.out.println("Telefono: " + telefono);
    }
}