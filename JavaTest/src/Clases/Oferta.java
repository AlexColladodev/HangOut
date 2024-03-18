public class Oferta{

    String codigoOferta;
    String tituloOferta;
    String descripcionOferta;
    float precioOferta;
    String fechaOferta;

    Establecimiento establecimiento;

    Oferta(){
        codigoOferta = "";
        tituloOferta = "";
        descripcionOferta = "";
        precioOferta = 0.0f;
        fechaOferta = "0/0/0";
        establecimiento = new Establecimiento();

    }

    Oferta(String codigoOferta, String tituloOferta, String descripcionOferta, float precioOferta, String fechaOferta){
        this.tituloOferta = tituloOferta;
        this.descripcionOferta = descripcionOferta;
        this.precioOferta = precioOferta;
        this.codigoOferta = codigoOferta;
        this.fechaOferta = fechaOferta;
    }

    //Getters y Setters
    public String getCodigoOferta() {
        return codigoOferta;
    }

    public void setCodigoOferta(String codigoOferta) {
        this.codigoOferta = codigoOferta;
    }

    public String getTituloOferta() {
        return tituloOferta;
    }

    public void setTituloOferta(String tituloOferta) {
        this.tituloOferta = tituloOferta;
    }

    public String getDescripcionOferta() {
        return descripcionOferta;
    }

    public void setDescripcionOferta(String descripcionOferta) {
        this.descripcionOferta = descripcionOferta;
    }

    public float getPrecioOferta() {
        return precioOferta;
    }

    public void setPrecioOferta(float precioOferta) {
        this.precioOferta = precioOferta;
    }

    public String getFechaOferta() {
        return fechaOferta;
    }

    public void setFechaOferta(String fechaOferta) {
        this.fechaOferta = fechaOferta;
    }
    //Fin Getters y Setters

    public void printInfoOferta(){
        System.out.println(codigoOferta);
        System.out.println(tituloOferta);
        System.out.println(descripcionOferta);
        System.out.println(precioOferta);
        System.out.println(fechaOferta);
    }
}