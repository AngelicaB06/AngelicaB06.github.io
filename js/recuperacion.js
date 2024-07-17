let coefA = document.querySelector("#coeficienteA");
let coefB = document.querySelector("#coeficienteB");
let coefC = document.querySelector("#coeficienteC");
let evaluateButton = document.querySelector(".btn-success");
let resultDiv = document.querySelector("#resultado");
let noSolutionDiv = document.querySelector("#noSolucion");
let tablaBody = document.querySelector("#tabla");

let datos = [];

let tabla = (datos) => {
    let msg = "";
    datos.forEach((data, index) => {
        msg += `<tr>`;
        msg += `<td>${data.a}</td>`;
        msg += `<td>${data.b}</td>`;
        msg += `<td>${data.c}</td>`;
        msg += `<td>${data.x1}</td>`;
        msg += `<td>${data.x2}</td>`;
        msg += `</tr>`;
    });
    return msg;
}

let evaluarEcuacion = (event) => {
    event.preventDefault();  // Prevenir el envío del formulario

    let a = parseFloat(coefA.value);
    let b = parseFloat(coefB.value);
    let c = parseFloat(coefC.value);

    // Validación
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alert("Por favor, ingresa valores válidos para a, b y c.");
        return;
    }
  
    let discriminante = b * b - 4 * a * c;
    let x1, x2;

    if (discriminante > 0) {
        let sqrtDiscriminante = Math.sqrt(discriminante);
        x1 = (-b + sqrtDiscriminante) / (2 * a);
        x2 = (-b - sqrtDiscriminante) / (2 * a);
    } else if (discriminante === 0) {
        x1 = -b / (2 * a);
        x2 = x1;
    } else {
        noSolutionDiv.style.display = "block";
        resultDiv.style.display = "none";
        return;
    }

    datos.push({ a: a, b: b, c: c, x1: x1.toFixed(2), x2: x2.toFixed(2) });

    tablaBody.innerHTML = tabla(datos);

    resultDiv.style.display = "block";
    noSolutionDiv.style.display = "none";
}

let regresar = () => {
    coefA.value = "";
    coefB.value = "";
    coefC.value = "";
    resultDiv.style.display = "none";
    noSolutionDiv.style.display = "none";
    datos = []; // Limpiar los datos
    tablaBody.innerHTML = ""; // Limpiar el contenido de la tabla
}

// Agregar un listener al formulario para manejar el evento submit
document.querySelector("#formulario").addEventListener("submit", evaluarEcuacion);
