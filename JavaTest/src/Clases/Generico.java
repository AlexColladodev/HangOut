
import java.util.Set;
import java.util.HashSet;

public class Generico extends Usuario{

    Set<String> preferencias;

    Generico(){
        preferencias = new HashSet<>();
    }

    //Getters y Setters

    void setPreferencias(Set<String> preferencias){
        this.preferencias = preferencias;
    }

    Set<String> getPreferencias(){
        return preferencias;
    }

    //Fin Getters y Setters


    void addPreferencia(String pref){
        preferencias.add(pref);
    }

    void printPreferencias(){
        System.out.println(preferencias);
    }

    void imprimirInforUsuarioGenerico(){
        System.out.println("Preferencias: " + preferencias);
    }
}