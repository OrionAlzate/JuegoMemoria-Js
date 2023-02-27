document.addEventListener('DOMContentLoaded', function () {
  mostrarVentanaJugador();
  mostrarDatos();

})

//declarar variables globales
var imagenes = [
  {
    nombre: "img1",
    ruta: "imagenes/img1.jpg",
  },
  {
    nombre: "img2",
    ruta: "imagenes/img2.PNG",
  },
  {
    nombre: "img3",
    ruta: "imagenes/img3.PNG",
  },
  {
    nombre: "img4",
    ruta: "imagenes/img4.PNG",
  },
  {
    nombre: "img5",
    ruta: "imagenes/img5.PNG",
  },
  {
    nombre: "img6",
    ruta: "imagenes/img6.PNG",
  },
  {
    nombre: "img1",
    ruta: "imagenes/img1.jpg",
  },
  {
    nombre: "img2",
    ruta: "imagenes/img2.PNG",
  },
  {
    nombre: "img3",
    ruta: "imagenes/img3.PNG",
  },
  {
    nombre: "img4",
    ruta: "imagenes/img4.PNG",
  },
  {
    nombre: "img5",
    ruta: "imagenes/img5.PNG",
  },
  {
    nombre: "img6",
    ruta: "imagenes/img6.PNG",
  },
];

// crear el tablero donde iran las imagenes
var tablero = document.querySelector(".tablero");
//variables para guardar los datos de la imagen escogida
let imgEscogidaID = [];
let imgEscogidaNombre = [];
//variable contadora de aciertos
let mostrarAciertos = document.querySelector(".aciertos");
let aciertos = 0;
// variable contadora de intentos
let mostrarIntentos = document.querySelector('.intentos');
let intentos;
// variable para el cronometro
let mostrarTiempo = document.querySelector('.tiempo');
let tiempo; // de forma incremental en 0, decrecer se pone desde le numero mayor, ej: 60
let btnIniciar = document.querySelector('.iniciar');
// variable contadora de niveles
let nivel = 1;
mostrartNivel = document.querySelector('.nivel');
let segundos;
let estoyJugando = false;
//variables sonidos
let seleccionar = new Audio("sonidos/seleccionar.mp3");
let levelWin = new Audio("sonidos/level-win.mp3");
let fallo = new Audio("sonidos/fallo.mp3");
let success = new Audio("sonidos/success.mp3");


//evento para iniciar el juego
function iniciarJuego() {
  btnIniciar.addEventListener('click', function contarTiempo() {
    imagenes.sort(() => Math.random() - 0.5);

    if (nivel == 1) {
      intentos = 18;
      tiempo = 60;

    } else if (nivel == 2) {
      intentos = 16
      tiempo = 50;


    } else if (nivel == 3) {
      intentos = 14
      tiempo = 40;
    }
    mostrarIntentos.innerHTML = intentos;
    mostrarTiempo.innerHTML = tiempo;
    estoyJugando = true;
    agregarImagenes();

    // validar boton click para no reiniciar el tablero

    if (estoyJugando == true) {
      btnIniciar.removeEventListener('click', contarTiempo);
    }

    segundos = setInterval(function () {
      tiempo-- //tiempo++ forma incremental, tiempo-- decremental
      mostrarTiempo.textContent = tiempo;

      if (intentos < 6) {
        mostrarIntentos.style.color = "red"
        mostrarIntentos.style.fontWeight = "900"
      } else {
        mostrarIntentos.style.color = "#000"
        mostrarIntentos.style.fontWeight = "400"
      }
      if (tiempo == 20) {
        // clearInterval(segundos);
        mostrarTiempo.style.color = "red";
        mostrarTiempo.style.fontWeight = "900";

      }
      if (tiempo == 0 || intentos == 0) {
        // clearInterval(segundos);
        fallo.play()
        if (tiempo == 0) {
          alert('Tiempo finalizado, PERDISTE 😔');
        } else if (intentos == 0) {
          alert('Ya no tienes intentos, PERDISTE 😔');
        }
        tomarDatos();
        clearInterval(segundos);
        location.reload();

      }
    }, 1000)
  })
}
iniciarJuego()


// agregar imagenes al tablero por js
function agregarImagenes() {
  for (let i = 0; i < imagenes.length; i++) {
    let img = document.createElement("img");
    let div = document.createElement("div");
    div.setAttribute("class", "col-3 border");
    img.setAttribute("class", "img-fluid");
    img.setAttribute("src", "imagenes/interrogacion.png");
    img.setAttribute("id", i);
    img.addEventListener("click", descubrirImagen);
    div.appendChild(img);
    tablero.appendChild(div);
  }
}

function quitarImagenes() {

  let imagenesTablero = document.querySelectorAll('.tablero > div')

  for (let i = 0; i < imagenesTablero.length; i++) {
    imagenesTablero[i].remove();
  }
}

// funcion para desactivar evento del btnIniciar

// funcion para descubrir las imagenes (darle vuelta)

function descubrirImagen() {

  seleccionar.play();
  // this se refiere a la imagen que le demos click, vamos a tener un evento
  let imgID = this.getAttribute("id");
  // alert('imagen #'+imgID);
  this.setAttribute("src", imagenes[imgID].ruta);
  //guardar ID;
  imgEscogidaID.push(imgID);
  // Guardar nombre
  imgEscogidaNombre.push(imagenes[imgID].nombre);
  // verificar el dato que recogemos
  // alert("id: "+imgEscogidaID[0]+", Nombre: " + imgEscogidaNombre[0]);
  if (imgEscogidaNombre.length == 2) {
    setTimeout(compararImagenes, 300);
  }
}

function compararImagenes() {

  let TodasImagenes = document.querySelectorAll(".tablero > div > img");
  // comparar imagenes escogidas
  if (imgEscogidaNombre[0] == imgEscogidaNombre[1]) {

    //validar que no escojan la misma imagen
    if (imgEscogidaID[0] == imgEscogidaID[1]) {
      fallo.play();
      alert("Debe escoger imagenes diferentes");
      TodasImagenes[imgEscogidaID[0]].setAttribute("src", "imagenes/interrogacion.png");
      TodasImagenes[imgEscogidaID[1]].setAttribute("src", "imagenes/interrogacion.png");


    } else {
      // acierto
      // removeEventListener a las img
      success.play();
      aciertos++;
      TodasImagenes[imgEscogidaID[0]].setAttribute("src", "imagenes/acierto.png");
      TodasImagenes[imgEscogidaID[1]].setAttribute("src", "imagenes/acierto.png");
      TodasImagenes[imgEscogidaID[0]].removeEventListener("click", descubrirImagen, false);
      TodasImagenes[imgEscogidaID[1]].removeEventListener("click", descubrirImagen, false);
      mostrarAciertos.textContent = aciertos;

    }
  } else {
    // alert("Fallaste, No son la misma imagen");
    fallo.play();
    TodasImagenes[imgEscogidaID[0]].setAttribute("src", "imagenes/interrogacion.png");
    TodasImagenes[imgEscogidaID[1]].setAttribute("src", "imagenes/interrogacion.png");

  }
  // reiniciar la variable
  imgEscogidaNombre = [];
  imgEscogidaID = [];
  intentos--;
  mostrarIntentos.textContent = intentos;

  if (nivel == 1 && aciertos == 6) {
    levelWin.play()
    nivel1();
  } if (nivel == 2) {
    nivel2();
  } else if (nivel == 3) {
    nivel3();
  } else if (intentos == 0 && aciertos < 6) {
    alert('Perdiste, Intentos terminados')
    fallo.play();
   
    location.reload();

  }
};


function nivel1() {

  tiempo = 50
  intentos = 16
  aciertos = 0;
  nivel++
  mostrarAciertos.textContent = aciertos;
  mostrarIntentos.textContent = intentos;
  mostrarTiempo.textContent = tiempo;
  mostrartNivel.textContent = nivel;
  clearInterval(segundos);
  alert(`Felicitaciones, ganaste el nivel 1`);
  quitarImagenes();

  estoyJugando = false;

  if (estoyJugando == false) {
    btnIniciar.addEventListener('click', iniciarJuego());
  }
};


function nivel2() {
  if (nivel == 2 && aciertos == 6) {
    levelWin.play()
    aciertos = 0;
    intentos = 14
    tiempo = 40;
    nivel++
    mostrarAciertos.textContent = aciertos;
    mostrarIntentos.textContent = intentos;
    mostrarTiempo.textContent = tiempo;
    mostrartNivel.textContent = nivel;
    clearInterval(segundos);
    alert(`Felicitaciones, ganaste el nivel 2`);
    quitarImagenes();

    estoyJugando = false;

    if (estoyJugando == false) {
      btnIniciar.addEventListener('click', iniciarJuego());
    }
  }
};


function nivel3() {
  if (nivel == 3 && aciertos == 6) {

    levelWin.play();
    alert(`Felicitaciones, ganaste el nivel 3`);
    tomarDatos();
    clearInterval(segundos);
    alert('JUEGO COMPLETADO, GANASTE!');
    quitarImagenes();
    location.reload();
    estoyJugando = false;
    if (estoyJugando == false) {
      btnIniciar.addEventListener('click', iniciarJuego());
    }
  }
}

// funcion mostrar ventana del nombre del jugador
function mostrarVentanaJugador() {
  let mostrarModal = document.querySelector('.modalNombre');
  let cerrarModal = document.querySelectorAll('.cerrar');
  mostrarModal.classList.add("show");
  mostrarModal.style.display = "block";
  for (let index = 0; index < cerrarModal.length; index++) {
    cerrarModal[index].addEventListener("click", function(){
      // alert('sirvo');
      mostrarModal.classList.remove("show");
      mostrarModal.style.display = "none";      
    })
  }
  namePlayer();
}

// funcion tomar nombre del jugador
function namePlayer(){
  // let mostrarJugador = document.querySelector('') // minuto 21 video guardarNombre.mp4
  let mostrarJugador = document.querySelector('.player');
  let btn_registrarJ = document.querySelector('.registrar');
  btn_registrarJ.addEventListener('click', function(){
    let nombreJ = document.querySelector('.nombreJ');
    if(mostrarJugador.value == ""){
      alert('Debe ingresar un nombre válido');
    } else {
      mostrarJugador.textContent = nombreJ.value;
    }

  })


}