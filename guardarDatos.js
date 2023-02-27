let nombreJugador = document.querySelector('.player');
let nivelJugador = document.querySelector('.nivel');
let intentosJugador = document.querySelector('.intentos');
let aciertosJugador = document.querySelector('.aciertos');
let tiempoJugador = document.querySelector('.tiempo');

// nombre por medio de un prompt
// let nombre = prompt('Ingrese su nombre');
// if (nombre === "" || nombre == null){
//     nombre = prompt('Ingrese un nombre válido');
//     if (nombre === "" || nombre == null){
//         alert('Debe ingresar un nombre')
//         location.reload();
//     }
// } 
// nombreJugador.textContent = nombre;


// tomar los datos del juego
function tomarDatos(){

    let estadisticas = {
        "nombre": nombreJugador.textContent,
        "nivel": nivelJugador.textContent,
        "tiempo": tiempoJugador.textContent,
        "intentos": intentosJugador.textContent,
        "aciertos": aciertosJugador.textContent
    }

    // console.log(estadisticas)
    guardarDatos(estadisticas);

}

// guardar en el navegador (local storage)
function guardarDatos(objeto){
    let clave = "ranking";
    let jugadores = [];
    // pasar los datos de texto a objeto
    let datosDelNavegador = localStorage.getItem(clave);
    // comprobar que el localStorage no esté vacío
    if (datosDelNavegador !== null){
        jugadores = JSON.parse(datosDelNavegador);
    }
    // agregar los datos del jugador al arreglo
    jugadores.push(objeto);
    
    // pasar los datos a texto
    localStorage.setItem(clave, JSON.stringify(jugadores));
    alert("Datos guardados exitosamente");
   
}

// mostrar el ranking en la tabla
function mostrarDatos(){
    // arreglo para guardar los datos
    let clave = "ranking";
    let jugadores = [];
    // pasar los datos de texto a objeto
    let datosDelNavegador = localStorage.getItem(clave);
    // comprobar que el localStorage no esté vacío
    if (datosDelNavegador !== null){
        jugadores = JSON.parse(datosDelNavegador);
    }
    // console.log(jugadores)
    
    // seleccionar la tabla para mostrar los datos
    let tabla = document.querySelector('.listado-tabla tbody');
    // jugadores.sort((a,b)=> b.tiempo - a.tiempo);
    jugadores.sort((a,b)=> {
        if(b.nivel < a.nivel){
            return -1;
        }
        if(b.nivel > a.nivel){
            return 1;
        }
        if(Number(b.tiempo) < Number(a.tiempo)){
            return -1;
        }
        if (Number(b.tiempo) > Number(a.tiempo)){
            return 1;
        }
        
        if (Number(b.aciertos) < Number(a.aciertos)){
            return -1
        }
        if (Number(b.aciertos) > Number(a.aciertos)){
            return 1;
        }

        if(Number(b.intentos) < Number(a.intentos)){
            return -1;
        }
        if(Number(b.intentos) > Number(a.intentos)){
            return 1;
        }
        if (a==b){
            return 0;
        }

    })

   

    jugadores.forEach((dato, i)=> {
        let fila = document.createElement('tr');
        fila.innerHTML = `
        <td> ${i+1}</td>
        <td> ${dato.nombre}</td>
        <td> ${dato.nivel}</td>
        <td> ${dato.tiempo}</td>
        <td> ${dato.aciertos}</td>
        <td> ${dato.intentos}</td>`;
       
        tabla.appendChild(fila);
        
    })
}