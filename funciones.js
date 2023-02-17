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
let intentos = 0;
// variable para el cronometro
let mostrarTiempo = document.querySelector('.tiempo');
let tiempo = 60; // de forma incremental en 0, decrecer se pone desde le numero mayor, ej: 60
let btnIniciar = document.querySelector('.iniciar');

// variable contadora de niveles
let nivel = 1;
mostrartNivel = document.querySelector('.nivel');

let segundos;
let estoyJugando = false;


//evento para iniciar el juego
btnIniciar.addEventListener('click', function contarTiempo(){
  // btnIniciar.removeEventListener('click', contarTiempo, false);

  estoyJugando = true;

  agregarImagenes();

  segundos = setInterval(function(){
    tiempo-- //tiempo++ forma incremental, tiempo-- decremental
    mostrarTiempo.textContent = tiempo;

    if ( tiempo == 10){
      // clearInterval(segundos);
      mostrarTiempo.style.color = "red";
      mostrarTiempo.style.fontSize = "40px";
    }
    if ( tiempo == 0){
      // clearInterval(segundos);
      alert('Tiempo finalizado, PERDISTE');
      location.reload();
      
    }



  },1000)
})


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

function quitarImagenes(){

  let imagenesTablero = document.querySelectorAll('.tablero > div')

  for (let i = 0; i < imagenesTablero.length; i++) {
      imagenesTablero[i].remove();
  }
}

// funcion para descubrir las imagenes (darle vuelta)

function descubrirImagen() {
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

      alert("Debe escoger imagenes diferentes");
      TodasImagenes[imgEscogidaID[0]].setAttribute("src", "imagenes/interrogacion.png");
      TodasImagenes[imgEscogidaID[1]].setAttribute("src", "imagenes/interrogacion.png");

    } else {
      // removeEventListener a las img

      alert(`Acertaste!`);

      TodasImagenes[imgEscogidaID[0]].setAttribute(
        "src",
        "imagenes/acierto.png"
      );
      TodasImagenes[imgEscogidaID[1]].setAttribute(
        "src",
        "imagenes/acierto.png"
      );
      TodasImagenes[imgEscogidaID[0]].removeEventListener(
        "click",
        descubrirImagen,
        false
      );
      TodasImagenes[imgEscogidaID[1]].removeEventListener(
        "click",
        descubrirImagen,
        false
      );
      aciertos++;
      // console.log(contador);
      mostrarAciertos.textContent = aciertos;

      
    }
  } else {
    alert("Fallaste, No son la misma imagen");
    TodasImagenes[imgEscogidaID[0]].setAttribute(
      "src",
      "imagenes/interrogacion.png"
    );
    TodasImagenes[imgEscogidaID[1]].setAttribute(
      "src",
      "imagenes/interrogacion.png"
    );
  }
  // reiniciar la variable
  imgEscogidaNombre = [];
  imgEscogidaID = [];
  intentos++;
  mostrarIntentos.textContent = intentos;
  if (aciertos == 6) {
    alert("Ganaste!!!!!!!!!!!!");
    
    
    // location.reload();
    clearInterval(segundos);
    aciertos = 0;
    intentos = 0;
    tiempo = 60;
    nivel++

    // validacion para saber si está jugando y en qué nivel 
    estoyJugando = false;
    if (nivel == x && estoyJugando == true){
      // validacion
    }

    mostrarAciertos.textContent= aciertos;
    mostrarIntentos.textContent = intentos;
    mostrarTiempo.textContent = tiempo;
    mostrartNivel.textContent = nivel;
    quitarImagenes();



  }
}
