// script.js
document.getElementById('convert-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Obtener el número decimal ingresado
    let decimal = parseInt(document.getElementById('decimalInput').value);
    if (isNaN(decimal) || decimal < 0) {
        alert("Por favor, ingrese un número decimal válido.");
        return;
    }

    // Limpiar tabla previa y resultados
    const tableBody = document.querySelector("#conversionTable tbody");
    tableBody.innerHTML = "";
    document.getElementById("binaryResult").textContent = "";

    let steps = [];
    let binary = "";
    
    // Proceso de conversión
    while (decimal > 0) {
        let cociente = Math.floor(decimal / 2);
        let residuo = decimal % 2;
        steps.push({ cociente: cociente, residuo: residuo });
        binary = residuo + binary; // Concatenar los residuos para formar el binario
        decimal = cociente;
    }

    // Mostrar la tabla de divisiones
    steps.forEach((step, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${step.cociente}</td>
            <td>${step.residuo}</td>
        `;
        tableBody.appendChild(row);
    });

    // Mostrar resultado binario
    document.getElementById("binaryResult").textContent = binary;

    // Hacer visible la tabla
    document.getElementById("conversionTable").classList.remove("hidden");
});
