let intentosJugador = document.querySelector('.intentos');
let tiempoJugador = document.querySelector('.tiempo');
let nombreJugador = document.querySelector('.player');


// tomar los datos del juego
function tomarDatos(){

    let estadisticas = {
        "nombre": nombreJugador.textContent,
        "tiempo": tiempoJugador.textContent,
        "intentos": intentosJugador.textContent
    }

    // console.log(estadisticas)
    guardarDatos(estadisticas);

}

// guardar en el navegador (local storage)
function guardarDatos(objeto){
    let jugadores = [];
    let clave = "ranking";
    // pasar los datos de texto a objeto
    let datosDelNavegador = JSON.parse(localStorage.getItem(clave));
    if (datosDelNavegador !== null){
        jugadores.push(datosDelNavegador);
    }
    jugadores.push(objeto);
    // pasar los datos a texto
    localStorage.setItem(clave, JSON.stringify(jugadores));
    alert("Datos guardados exitosamente");


}

// mostrar el ranking
function mostrarDatos(){
    let tabla = document.querySelector('.listado-tabla tbody');

    let jugadores = [];
    let clave = "ranking";
    // pasar los datos de texto a objeto
    let datosDelNavegador = JSON.parse(localStorage.getItem(clave));
    if (datosDelNavegador !== null){
        jugadores.push(datosDelNavegador);;
    }
    console.log(jugadores)
    jugadores.forEach(function(dato, i) {
        let fila = document.createElement('tr');
        let tPosicion = document.createElement('td');
        let tNombre = document.createElement('td');
        let tIntentos = document.createElement('td');
        let tTiempo = document.createElement('td');

        console.log(tNombre)
        console.log(tIntentos)
        console.log(tTiempo)
        console.log(tPosicion)
     
        // por aca hay un error
        tPosicion.innerHTML = (i+1);
        tNombre.innerHTML = dato.nombre;
        tTiempo.innerHTML = dato.tiempo;
        tIntentos.innerHTML = dato.intentos;
        fila.appendChild(tPosicion);
        fila.appendChild(tNombre);
        fila.appendChild(tIntentos);
        fila.appendChild(tTiempo);
        tabla.appendChild(fila);
    })
}