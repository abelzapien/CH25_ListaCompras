
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");


btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.value = "";
    txtNumber.value = "";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
});

btnAgregar.addEventListener("click", function(event){
    alertValidaciones.style.display="none";
    let lista = "";
    event.preventDefault();
     lista = "los Siguientes campos deben ser llenados correctamente: <ul>";
    if (txtNombre.value.length==0) {
        txtNombre.style.border="solid 1px red";
        lista += "<li>Se debe escribir un nombre válido</li>";
        alertValidaciones.style.display="block";
    }else{
        txtNombre.style.border="";
    }

    if (txtNumber.value.length==0) {
        txtNumber.style.border="solid 1px red";
        lista += "<li>Se debe escribir una cantidad válida</li>";
        alertValidaciones.style.display="block";
    }else{
        txtNumber.style.border="";
    }
    lista += "</ul>";
    alertValidaciones.insertAdjacentHTML("beforeend", lista);
}); //btnAgregar


txtNumber.addEventListener("blur", function(event){
    event.preventDefault();
    txtNumber.value = txtNumber.value.trim();
});//evento cuando sales del campo

txtNombre.addEventListener("blur", function(event){
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim();
});