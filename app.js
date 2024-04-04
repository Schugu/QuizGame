'use strict';
const contenedorRespuestas = document.querySelector(".respuestas");
const contendorPregunta = document.querySelector('.pantalla');
const pregunta = document.querySelector('.pregunta')
let botonPreg = document.querySelector('.botonPreg');
let numerosGenerados = []; // Almacena los índices aleatorios de las citas
let ultimoNumero;
let spanCreado = false;

function crearNumeroAleatorio() {
    let cantPregAndResp = pregAndResp.length;
    let numAleat;

    // Si ya se han generado todos los números, restablecer el registro
    if (numerosGenerados.length === cantPregAndResp) {
        numerosGenerados = [];
    }

    // Generar un nuevo número aleatorio que no esté en el registro ni sea igual al último generado
    do {
        numAleat = Math.floor(Math.random() * cantPregAndResp);
    } while (numerosGenerados.includes(numAleat) || numAleat === ultimoNumero);

    // Agregar el nuevo número generado al registro
    numerosGenerados.push(numAleat);
    ultimoNumero = numAleat;

    return numAleat;
}

function crearPregunta () {
    let numAleat = crearNumeroAleatorio();
    let preguntaElegida = pregAndResp[numAleat];
    pregunta.textContent = preguntaElegida.pregunta;
    return preguntaElegida;
}

function crearRespuestas () {
    let preguntaElegida = crearPregunta();
    let respuestas = [...preguntaElegida.respuestasErroneas, preguntaElegida.respuestaVerdadera];

    for (let i = respuestas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [respuestas[i], respuestas[j]] = [respuestas[j], respuestas[i]];
    }

    for (let i = 0; i < 4; i++ ){
        if (!spanCreado) {
            let span = document.createElement("span");
            span.classList.add("respuesta");
            span.id = `respuesta${i}`; 
            contenedorRespuestas.appendChild(span);
            span.textContent = respuestas[i];
        } else {
            let span = document.getElementById(`respuesta${i}`);
            span.textContent = respuestas[i];
        }
    }
    spanCreado = true;

    return preguntaElegida;
}

function comprobarRespuesta () {
    let preguntaElegida = crearRespuestas();
    const respuestas = document.querySelectorAll(".respuesta");

    respuestas.forEach(respuesta => {
        respuesta.addEventListener('click', ()=> {
            if (respuesta.textContent == preguntaElegida.respuestaVerdadera) {
                console.log('verdadero');
            } else {
                console.log('falso');
            }
        });
    });
}

botonPreg.addEventListener('click', ()=> {
        comprobarRespuesta();
});