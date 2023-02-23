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


//variables sonidos
let seleccionar = new Audio("sonidos/selccionar.mp3");
let levelWin = new Audio("sonidos/level-win.mp3");
let fallo = new Audio("sonidos/fallo.mp3");
let success = new Audio("sonidos/success.mp3");


//evento para iniciar el juego
btnIniciar.addEventListener("click", function () {

    if (estoyJugando == false && nivel == 1) {
        imagenes.sort(() => Math.random() - 0.5);
        estoyJugando = true;
        nivel_1();
    } else if (estoyJugando == false && nivel == 2) {
        imagenes_2.sort(() => Math.random() - 0.5);
        estoyJugando = true;
        nivel_2();
    } else if (estoyJugando == false && nivel == 3) {
        imagenes.sort(() => Math.random() - 0.5);
        estoyJugando = true;
        nivel_3();
    }

})


//funcion para agregar las imagenes al tablero
function agregarImagenes() {
    if (nivel == 1) {
        for (let i = 0; i < imagenes.length; i++) {
            let img = document.createElement("img");
            let div = document.createElement("div");
            div.classList.add("class", "col-3", "border");
            img.setAttribute("class", "img-fluid");
            img.setAttribute("src", "imagenes/interrogacion.png");
            img.setAttribute("id", i);
            img.setAttribute("width", "200px");
            img.addEventListener("click", descubrirImagen);
            div.appendChild(img);
            tablero.appendChild(div);
        }
    } else if (nivel == 2) {
        for (let i = 0; i < imagenes_2.length; i++) {
            let img = document.createElement("img");
            let div = document.createElement("div");
            div.classList.add("class", "col-3", "border");
            img.setAttribute("class", "img-fluid");
            img.setAttribute("src", "imagenes/interrogacion.png");
            img.setAttribute("id", i);
            img.setAttribute("width", "200px");
            img.addEventListener("click", descubrirImagen);
            div.appendChild(img);
            tablero.appendChild(div);
        }
    }

}

function quitarImagenes() {
    let imagenesTablero = document.querySelectorAll(".tablero > div")
    for (let i = 0; i < imagenesTablero.length; i++) {
        imagenesTablero[i].remove();
    }
}

//funcion para descubrir las imagenes
function descubrirImagen() {
    let imgID = this.getAttribute("id");
    //alert("imagen #"+imgID);
    if (nivel == 1) {
        this.setAttribute("src", imagenes[imgID].ruta);
        //guardar ID;
        imgEscogidaID.push(imgID);
        //guardar nombre
        imgEscogidaNombre.push(imagenes[imgID].nombre);
    } else if (nivel == 2) {
        this.setAttribute("src", imagenes_2[imgID].ruta);
        //guardar ID;
        imgEscogidaID.push(imgID);
        //guardar nombre
        imgEscogidaNombre.push(imagenes_2[imgID].nombre);
    }
    //alert(imgEscogidaID[0] +" "+ imgEscogidaNombre[0]);
    if (imgEscogidaNombre.length === 2) {
        setTimeout(compararImagenes, 300);
    }
}

//funcion para comparar imagenes
function compararImagenes() {

    //seleccionar todas las imagenes del tablero
    let TodasImagenes = document.querySelectorAll(".tablero > div > img");
    //comprar las imagenes escogidas
    if (imgEscogidaNombre[0] == imgEscogidaNombre[1]) {

        seleccionar.play();
        if (imgEscogidaID[0] != imgEscogidaID[1]) {
            // alert("Son iguales");
            TodasImagenes[imgEscogidaID[0]].setAttribute("src", "imagenes/acierto.png");
            TodasImagenes[imgEscogidaID[1]].setAttribute("src", "imagenes/acierto.png");
            TodasImagenes[imgEscogidaID[0]].removeEventListener("click", descubrirImagen);
            TodasImagenes[imgEscogidaID[1]].removeEventListener("click", descubrirImagen);
            aciertos++;
            mostrarAciertos.textContent = aciertos;
            success.play();
        } else {
            alert("Debes escoger otra imagen");
            TodasImagenes[imgEscogidaID[1]].setAttribute("src", "imagenes/ocultar.jpg");
            fallo.play();
        }
    } else {
        //alert("Son diferentes");
        TodasImagenes[imgEscogidaID[0]].setAttribute("src", "imagenes/interrogacion.png");
        TodasImagenes[imgEscogidaID[1]].setAttribute("src", "imagenes/interrogacion.png");
        intentos--;
        mostrarIntentos.textContent = intentos;
        fallo.play();
    }
    //reiniciar la variable
    imgEscogidaNombre = [];
    imgEscogidaID = [];


    //cuando se gana
    if (aciertos == 6 && nivel == 1) {
        alert("Feliciaciones Ganaste pasaste de nivel");
        levelWin.play();
        ///location.reload();
        clearInterval(segundos);
        aciertos = 0;
        intentos = 8;
        tiempo = 45;
        nivel++;
        estoyJugando = false;
        mostrarAciertos.textContent = aciertos;
        mostrarIntentos.textContent = intentos;
        mostrarTiempo.textContent = tiempo;
        mostrarNivel.textContent = nivel;
        quitarImagenes();
    } else if (aciertos == 6 && nivel == 2) {
        alert("Feliciaciones Ganaste pasaste de nivel");
        levelWin.play();
        ///location.reload();
        clearInterval(segundos);
        aciertos = 0;
        intentos = 7;
        tiempo = 30;
        nivel++;
        estoyJugando = false;
        mostrarAciertos.textContent = aciertos;
        mostrarIntentos.textContent = intentos;
        mostrarTiempo.textContent = tiempo;
        mostrarNivel.textContent = nivel;
        quitarImagenes();
    } else if (aciertos == 6 && nivel == 3) {
        levelWin.play();
        alert("Feliciaciones Te ganaste un chocoramo");
        location.reload();
    }

}

//niveles ejecutar dificultad
function nivel_1() {
    //ejecutar agregar imagenes
    agregarImagenes();
    mostrarNivel.textContent = nivel;
    //registro del tiempo
    segundos = setInterval(function () {
        tiempo--;
        mostrarTiempo.textContent = tiempo;
        if (tiempo == 10) {
            mostrarTiempo.style.color = "red";
            mostrarTiempo.style.fontSize = "50px";
        }
        if (tiempo == 0 || intentos == 0) {
            alert("Se te acabo el tiempo :( ");
            location.reload();
        }
    }, 1000);

}

function nivel_2() {
    //ejecutar agregar imagenes
    agregarImagenes();
    mostrarNivel.textContent = nivel;
    //registro del tiempo
    segundos = setInterval(function () {
        tiempo--;
        mostrarTiempo.textContent = tiempo;
        if (tiempo == 10) {
            mostrarTiempo.style.color = "red";
            mostrarTiempo.style.fontSize = "50px";
        }
        if (tiempo == 0 || intentos == 0) {
            alert("Se te acabo el tiempo :( ");
            location.reload();
        }
    }, 1000);

}

function nivel_3() {
    //ejecutar agregar imagenes
    agregarImagenes();
    mostrarNivel.textContent = nivel;
    //registro del tiempo
    segundos = setInterval(function () {
        tiempo--;
        mostrarTiempo.textContent = tiempo;
        if (tiempo == 10) {
            mostrarTiempo.style.color = "red";
            mostrarTiempo.style.fontSize = "50px";
        }
        if (tiempo == 0 || intentos == 0) {
            alert("Se te acabo el tiempo :( ");
            location.reload();
        }
    }, 1000);

}