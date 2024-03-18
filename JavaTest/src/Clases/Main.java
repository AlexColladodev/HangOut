import java.util.Scanner;
import java.util.HashSet;
import java.util.ArrayList;

public class Main {

    private static Scanner scanner = new Scanner(System.in);
    private static ArrayList<Usuario> usuarios = new ArrayList<>();
    private static ArrayList<Establecimiento> establecimientos = new ArrayList<>();
    private static ArrayList<Oferta> ofertas = new ArrayList<>();
    private static ArrayList<Evento> eventos = new ArrayList<>();

    public static void main(String[] args) {
        int opcion;
        do {
            System.out.println("Seleccione una opción:");
            System.out.println("1. Crear Usuario Genérico");
            System.out.println("2. Crear Usuario Administrador");
            System.out.println("3. Crear Establecimiento");
            System.out.println("4. Crear Oferta");
            System.out.println("5. Asociar Oferta con Establecimiento");
            System.out.println("6. Modificar atributos de un Usuario");
            System.out.println("7. Mostrar Usuarios Genericos Creados");
            System.out.println("8. Mostrar Usuarios Administradores Creados");
            System.out.println("9. Mostrar Establecimientos Creados");
            System.out.println("10. Mostrar Información de 1 Usuario Generico");
            System.out.println("11. Mostrar Informacion de 1 Establecimiento");
            System.out.println("12 Mostar Información de Ofertas en un Establecimiento");
            System.out.println("13 Mostar Información de 1 Oferta");
            System.out.println("0. Salir");
            opcion = scanner.nextInt();
            scanner.nextLine(); // Limpiar buffer

            switch (opcion) {
                case 1:
                    crearUsuarioGenerico();
                    break;
                case 2:
                    crearUsuarioAdministrador();
                    break;
                case 3:
                    crearEstablecimiento();
                    break;
                case 4:
                    crearOferta();
                    break;
                case 5:
                System.out.println("Ya se hace automaticamente en el punto 4");
                    break;
                case 6:
                    modificarUsuario();
                    break;
                case 7:
                    mostrarGenericos();
                    break;
                case 8:
                    mostrarAdministradores();
                    break;
                case 9:
                    mostrarEstablecimientos();
                    break;
                case 10:
                    mostrarInfoUsuario();
                    break;
                case 11:
                    mostrarInfoEstablecimiento();
                    break;
                case 12:
                    mostrarInfoOfertas();
                    break;
                case 13:
                    mostrarOferta();
                    break;
                case 14:
                    crearEvento();
                    break;
                case 15:
                    mostrarInfoEventos();
                    break;
            }
        } while (opcion != 0);
    }

    private static void mostrarInfoEventos(){
        System.out.print("Introduzca CIF estabecimiento: ");
        String cifEstablecimiento = scanner.nextLine();

        for(Establecimiento establecimiento : establecimientos){
            if(cifEstablecimiento.equals(establecimiento.getCIF())){
                for(Evento evento : establecimiento.getEventos()){
                    evento.printInfoEvento();
                }
            }
        }
    }

    private static void crearEvento(){
        System.out.print("Introduzca CIF estabecimiento: ");
        String cifEstablecimiento = scanner.nextLine();

        System.out.print("Codigo de Evento: ");
        String codigoEvento = scanner.nextLine();

        System.out.print("Nombre de Evento: ");
        String nombreEvento = scanner.nextLine();

        System.out.print("Descripcion de Evento: ");
        String descripcionEvento = scanner.nextLine();

        System.out.print("Fecha de Evento: ");
        String fechaEvento = scanner.nextLine();

        System.out.print("Hora de Evento: ");
        String horaEvento = scanner.nextLine();

        System.out.print("Precio de Evento: ");
        float precioEvento = scanner.nextFloat();
        
        for(Establecimiento establecimiento : establecimientos){
            if(cifEstablecimiento.equals(establecimiento.getCIF())){
                establecimiento.addEvento(codigoEvento, nombreEvento, descripcionEvento, precioEvento, fechaEvento, horaEvento);
                System.out.println("Evento añadido exitosamente");
            }
        }
        
    }

    private static void mostrarGenericos() {
        System.out.println("Todos Usuarios Genéricos");
        for (Usuario usuario : usuarios) {
            if (usuario instanceof Generico) {
                Generico user = (Generico) usuario;
                System.out.println(user.getNombre());
            }
        }
    }

    private static void mostrarAdministradores() {
        System.out.println("Todos Usuarios Administradores");
        for (Usuario usuario : usuarios) {
            if (usuario instanceof AdministradorEstablecimiento) {
                AdministradorEstablecimiento user = (AdministradorEstablecimiento) usuario;
                System.out.println(user.getNombre());
            }
        }
    }

    private static void mostrarEstablecimientos() {
        for (Establecimiento establecimiento : establecimientos) {
            System.out.println(establecimiento.getNombreEstablecimiento());
        }
    }

    private static void mostrarInfoUsuario() {
        System.out.print("Ingrese código de usuario: ");
        String codigoUsuario = scanner.nextLine();

        for (Usuario usuario : usuarios) {
            if(codigoUsuario.equals(usuario.getCodigoUsuario())){
                usuario.imprimirInforUsuario();

                if (usuario instanceof AdministradorEstablecimiento) {
                    AdministradorEstablecimiento user = (AdministradorEstablecimiento) usuario;
                    user.imprimirInforUsuarioAdministradorEstablecimientos();
                }else{
                    Generico user = (Generico) usuario;
                    user.imprimirInforUsuarioGenerico();
                }
            }
        }
    }

    private static void mostrarInfoEstablecimiento() {
        System.out.print("Ingrese CIF de establecimiento: ");
        String codigoEstablecimiento = scanner.nextLine();

        for(Establecimiento establecimiento : establecimientos){
            if(codigoEstablecimiento.equals(establecimiento.getCIF())){
                establecimiento.printInfoEstablecimimento();
            }
        }
    }

    private static void mostrarInfoOfertas() {
        System.out.println("Ingrese CIF de Establecimiento: ");
        String codigoEstablecimiento = scanner.nextLine();

        for(Establecimiento establecimiento : establecimientos){
            if(codigoEstablecimiento.equals(establecimiento.getCIF())){
                for(Oferta oferta : establecimiento.getOfertas()){
                    oferta.printInfoOferta();
                }
            }
        }
    }

    private static void mostrarOferta(){
        System.out.println("Ingrese Codigo de Oferta: ");
        String codigoOferta = scanner.nextLine();

        System.out.println("Ingrese CIF de Establecimiento: ");
        String codigoEstablecimiento = scanner.nextLine();

        for(Establecimiento establecimiento : establecimientos){
            if(codigoEstablecimiento.equals(establecimiento.getCIF())){
                for(Oferta oferta : establecimiento.getOfertas()){
                    if(codigoOferta.equals(oferta.getCodigoOferta())){
                        oferta.printInfoOferta();
                    }
                }
            }
        }
    }

    private static void crearUsuarioGenerico() {
        System.out.println("Creación de Usuario Genérico");
    
        // Solicitar datos al usuario
        System.out.print("Ingrese código de usuario: ");
        String codigoUsuario = scanner.nextLine();
        
        System.out.print("Ingrese nombre de usuario: ");
        String nombreUsuario = scanner.nextLine();
        
        System.out.print("Ingrese contraseña: ");
        String contrasenia = scanner.nextLine();
        
        System.out.print("Ingrese nombre completo: ");
        String nombre = scanner.nextLine();
        
        System.out.print("Ingrese correo electrónico: ");
        String correo = scanner.nextLine();
        
        System.out.print("Ingrese teléfono: ");
        String telefono = scanner.nextLine();
        
        System.out.print("Ingrese edad: ");
        int edad = scanner.nextInt();
        scanner.nextLine(); // Limpiar el buffer después de leer un int
        
        // Crear una instancia de Generico
        Generico nuevoUsuario = new Generico();
        nuevoUsuario.setCodigoUsuario(codigoUsuario);
        nuevoUsuario.setNombreUsuario(nombreUsuario);
        nuevoUsuario.setContrasenia(contrasenia);
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setCorreo(correo);
        nuevoUsuario.setTelefono(telefono);
        nuevoUsuario.setEdad(edad);
        
        // Opcional: Agregar preferencias
        System.out.println("¿Desea agregar alguna preferencia? (s/n)");
        String respuesta = scanner.nextLine();
        while (respuesta.equalsIgnoreCase("s")) {
            System.out.print("Ingrese preferencia: ");
            String preferencia = scanner.nextLine();
            nuevoUsuario.addPreferencia(preferencia);
            System.out.println("¿Desea agregar otra preferencia? (s/n)");
            respuesta = scanner.nextLine();
        }
    
        // Agregar el nuevo usuario a la lista de usuarios
        usuarios.add(nuevoUsuario);
        System.out.println("Usuario Genérico creado exitosamente.");
    }
    

    private static void crearUsuarioAdministrador() {

            // Solicitar datos al usuario
            System.out.print("Ingrese código de usuario: ");
            String codigoUsuario = scanner.nextLine();
            
            System.out.print("Ingrese nombre de usuario: ");
            String nombreUsuario = scanner.nextLine();
            
            System.out.print("Ingrese contraseña: ");
            String contrasenia = scanner.nextLine();
            
            System.out.print("Ingrese nombre completo: ");
            String nombre = scanner.nextLine();
            
            System.out.print("Ingrese correo electrónico: ");
            String correo = scanner.nextLine();
            
            System.out.print("Ingrese teléfono: ");
            String telefono = scanner.nextLine();
            
            System.out.print("Ingrese edad: ");
            int edad = scanner.nextInt();
            scanner.nextLine(); // Limpiar el buffer después de leer un int

            System.out.println("Creando Usuario Administrador");
            System.out.print("Ingrese DNI: ");
            String DNI = scanner.nextLine();
            System.out.print("Ingrese código de trabajador: ");
            String codigoTrabajador = scanner.nextLine();
            System.out.print("Ingrese correo del trabajador: ");
            String correoTrabajador = scanner.nextLine();
            
            // Crear una instancia de Generico
            AdministradorEstablecimiento admin = new AdministradorEstablecimiento(DNI, codigoTrabajador, correoTrabajador);
            admin.setCodigoUsuario(codigoUsuario);
            admin.setNombreUsuario(nombreUsuario);
            admin.setContrasenia(contrasenia);
            admin.setNombre(nombre);
            admin.setCorreo(correo);
            admin.setTelefono(telefono);
            admin.setEdad(edad);
    
        usuarios.add(admin);
    
        System.out.println("Usuario Administrador creado exitosamente.");
    }
    

    private static void crearEstablecimiento() {
        System.out.println("Creando Establecimiento");
        System.out.print("Ingrese CIF del establecimiento: ");
        String CIF = scanner.nextLine();
        System.out.print("Ingrese el nombre del establecimiento: ");
        String nombreEstablecimiento = scanner.nextLine();
        System.out.print("Ingrese el DNI del administrador del establecimiento: ");
        String dniAdmin = scanner.nextLine();
    
        AdministradorEstablecimiento admin = null;
        for (Usuario usuario : usuarios) {
            if (usuario instanceof AdministradorEstablecimiento && ((AdministradorEstablecimiento) usuario).getDNI().equals(dniAdmin)) {
                admin = (AdministradorEstablecimiento) usuario;
                break;
            }
        }
    
        if (admin != null) {
            Establecimiento establecimiento = new Establecimiento(CIF, admin, nombreEstablecimiento);
            establecimientos.add(establecimiento);
            System.out.println("Establecimiento creado exitosamente.");
        } else {
            System.out.println("Administrador no encontrado.");
        }
    }
    

    private static void crearOferta() {
        System.out.println("Creando Oferta");
        System.out.print("Ingrese código de oferta: ");
        String codigoOferta = scanner.nextLine();
        System.out.print("Ingrese título de oferta: ");
        String tituloOferta = scanner.nextLine();
        System.out.print("Ingrese descripción de oferta: ");
        String descripcionOferta = scanner.nextLine();
        System.out.print("Ingrese precio de oferta: ");
        float precioOferta = scanner.nextFloat();
        scanner.nextLine(); // Limpiar buffer
        System.out.print("Ingrese fecha de oferta (dd/mm/aaaa): ");
        String fechaOferta = scanner.nextLine();
    
        Oferta oferta = new Oferta(codigoOferta, tituloOferta, descripcionOferta, precioOferta, fechaOferta);
        ofertas.add(oferta);
        System.out.println("Oferta creada exitosamente.");

        asociarOfertaConEstablecimiento();
    }
    

    private static void asociarOfertaConEstablecimiento() {
        System.out.println("Asociando Oferta con Establecimiento");
        System.out.print("Ingrese el CIF del establecimiento: ");
        String CIF = scanner.nextLine();
        System.out.print("Ingrese el código de la oferta: ");
        String codigoOferta = scanner.nextLine();
    
        Establecimiento establecimiento = null;
        Oferta oferta = null;
    
        for (Establecimiento est : establecimientos) {
            if (est.getCIF().equals(CIF)) {
                establecimiento = est;
                break;
            }
        }
    
        for (Oferta ofr : ofertas) {
            if (ofr.getCodigoOferta().equals(codigoOferta)) {
                oferta = ofr;
                break;
            }
        }
    
        if (establecimiento != null && oferta != null) {
            establecimiento.getOfertas().add(oferta);
            System.out.println("Oferta asociada exitosamente al establecimiento.");
        } else {
            System.out.println("Establecimiento u Oferta no encontrados.");
        }
    }
    

    private static void modificarUsuario() {
        System.out.println("Modificando Usuario");
        System.out.print("Ingrese el código del usuario a modificar: ");
        String codigoUsuario = scanner.nextLine();
    
        Usuario usuarioAModificar = null;
        for (Usuario usuario : usuarios) {
            if (usuario.getCodigoUsuario().equals(codigoUsuario)) {
                usuarioAModificar = usuario;
                break;
            }
        }
    
        if (usuarioAModificar != null) {
            // Aquí podrías ofrecer un submenú para modificar distintos atributos
            System.out.print("Ingrese nuevo correo: ");
            String nuevoCorreo = scanner.nextLine();
            usuarioAModificar.setCorreo(nuevoCorreo);
            System.out.println("Correo modificado exitosamente.");
        } else {
            System.out.println("Usuario no encontrado.");
        }
    }

    
}
