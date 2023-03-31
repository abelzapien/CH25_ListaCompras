
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");

let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let isValid = true;
let idTimeout;
let precio = 0;
let contador = 0;
let totalEnProductos = 0;
let costoTotal = 0;

let datos = []; // Aqui van los datos de la tabla


btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.value = "";
    txtNumber.value = "";
    cuerpoTabla[0].innerHTML = "";

    contador = 0;
    totalEnProductos = 0;
    costoTotal = 0;
    contadorProductos.innerText= "0";
    productosTotal.innerText= "0";
    precioTotal.innerText= "$ 0";
    
    res = JSON.parse(localStorage.getItem("resumen"));
    resumen = `{"contadorProductos" : ${contador},
                        "totalEnProductos"  : ${totalEnProductos},
                        "costoTotal"        : ${costoTotal.toFixed(2)}}`;
        localStorage.setItem("resumen", resumen);

    // localStorage.setItem("contadorProductos",contador);
    // localStorage.setItem("totalEnProductos", totalEnProductos);
    // localStorage.setItem("costoTotal", costoTotal.toFixed(2));    
});//btn Clear

function validarCantidad() {
    if (txtNumber.value.length==0){
        return false;
    }

    if (isNaN(txtNumber.value)) {
        return false;        
    }

    if (parseFloat(txtNumber.value)<=0) {
        return false;        
    }

    return true;
}//validacion txtNumber

function getPrecio() {
    return Math.floor(Math.random() * 50 * 100 ) / 100;        
}//Optener precio aleatorio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    isValid = true;
    clearTimeout(idTimeout);
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";

    let lista = "los Siguientes campos deben ser llenados correctamente: <ul>";
    if (txtNombre.value.length<2) {
        txtNombre.style.border="solid 1px red";
        lista += "<li>Se debe escribir un nombre válido</li>";
        alertValidaciones.style.display="block";
        isValid = false;
    }else{
        txtNombre.style.border="";
    }//if txtNombre

    if (! validarCantidad()) {
        txtNumber.style.border="solid 1px red";
        lista += "<li>Se debe escribir una cantidad válida</li>";
        alertValidaciones.style.display="block";
        isValid = false;
    }else{
        txtNumber.style.border="";
    }//if txtNumber

    lista += "</ul>";
    alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
    
    idTimeout = setTimeout(function(){//funcion de temporizador
        alertValidaciones.style.display="none";
    }, 5000);

    if (isValid) {
        precio = getPrecio();
        contador ++;
        let row = `<tr>
                        <th>${contador}</th>
                        <td>${txtNombre.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>$ ${precio}</td>
                    </tr>`; 

        let elemento = `{
                        "id"        : ${contador},
                        "nombre"    : "${txtNombre.value}",
                        "cantidad"  : "${txtNumber.value}",
                        "precio"    : "${precio}"
        }`;
        datos.push(JSON.parse(elemento));
        // Se define arreglo para meter la tabla de productos

        localStorage.setItem("datos", JSON.stringify(datos));

        cuerpoTabla[0].insertAdjacentHTML("beforeend", row);
        contadorProductos.innerText = contador;
        totalEnProductos += parseFloat(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        costoTotal += precio * parseFloat(txtNumber.value);
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
        //Declaracion objeto Json
        let resumen = `{"contadorProductos" : ${contador},
                        "totalEnProductos"  : ${totalEnProductos},
                        "costoTotal"        : ${costoTotal.toFixed(2)}}`;
        localStorage.setItem("resumen", resumen);
        //Declaracion sin Json
        
        // localStorage.setItem("contadorProductos",contador);
        // localStorage.setItem("totalEnProductos", totalEnProductos);
        // localStorage.setItem("costoTotal", costoTotal.toFixed(2));
        txtNombre.value = "";
        txtNumber.value = "";
        txtNombre.focus();  
    }
}); //btnAgregar


txtNumber.addEventListener("blur", function(event){
    event.preventDefault();
    txtNumber.value = txtNumber.value.trim();
});//evento cuando sales del campo

txtNombre.addEventListener("blur", function(event){
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim();
});

window.addEventListener("load", function(event){
    if(localStorage.getItem("resumen")== null){
        let resumen = `{"contadorProductos" : ${contador},
        "totalEnProductos"  : ${totalEnProductos},
        "costoTotal"        : ${costoTotal.toFixed(2)} }`;
        localStorage.setItem("resumen", resumen);
    }
    let res = JSON.parse(localStorage.getItem("resumen"));


    //Metodo Json
    // if(this.localStorage.getItem("contadorProductos")==null){
    //     this.localStorage.setItem("contadorProductos", "0");
    // }
    // if(this.localStorage.getItem("totalEnProductos")==null){
    //     this.localStorage.setItem("totalEnProductos", "0");
    // }
    // if(this.localStorage.getItem("costoTotal")==null){
    //     this.localStorage.setItem("costoTotal", "0.0");
    // }
    contador = res.contadorProductos;
    totalEnProductos = res.totalEnProductos;
    costoTotal = res.costoTotal;

    //Metodo Jason
    // contador = parseInt(localStorage.getItem("contadorProductos"));
    // totalEnProductos = parseInt(localStorage.getItem("totalEnProductos"));
    // costoTotal = parseFloat(localStorage.getItem("costoTotal"));

    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$${costoTotal}`;
        
});