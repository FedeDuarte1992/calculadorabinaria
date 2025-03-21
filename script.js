// script.js
document.getElementById('convert-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const inputValue = document.getElementById('decimalInput').value.trim();
    const conversionType = document.getElementById('conversionType').value;
    const tableBody = document.querySelector("#conversionTable tbody");
    const tableHeader = document.getElementById("tableHeader");
    const resultSpan = document.getElementById("binaryResult");

    tableBody.innerHTML = "";
    tableHeader.innerHTML = "";
    resultSpan.textContent = "";

    if (conversionType === "decToBin") {
        let decimal = parseInt(inputValue);
        if (isNaN(decimal) || decimal < 0) {
            alert("Por favor, ingrese un número decimal válido.");
            return;
        }

        let steps = [];
        let binary = "";

        while (decimal > 0) {
            let cociente = Math.floor(decimal / 2);
            let residuo = decimal % 2;
            steps.push({ cociente, residuo, dividendo: decimal });
            binary = residuo + binary;
            decimal = cociente;
        }

        // Crear encabezado de la tabla
        tableHeader.innerHTML = `
            <tr>
                <th>Dividendo</th>
                <th>Cociente</th>
                <th>Residuo</th>
            </tr>
        `;

        // Rellenar tabla
        steps.forEach(step => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${step.dividendo}</td>
                <td>${step.cociente}</td>
                <td>${step.residuo}</td>
            `;
            tableBody.appendChild(row);
        });

        resultSpan.textContent = binary || "0";

    } else if (conversionType === "binToDec") {
        if (!/^[01]+$/.test(inputValue)) {
            alert("Por favor, ingrese un número binario válido (solo 0 y 1).");
            return;
        }

        let binaryArray = inputValue.split("").reverse();
        let decimal = 0;
        let steps = [];

        binaryArray.forEach((bit, index) => {
            let potencia = Math.pow(2, index);
            let producto = parseInt(bit) * potencia;
            steps.push({ bit, potencia: `2^${index}`, resultado: producto });
            decimal += producto;
        });

        // Crear encabezado de la tabla
        tableHeader.innerHTML = `
            <tr>
                <th>Bit</th>
                <th>Potencia</th>
                <th>Bit × Potencia</th>
            </tr>
        `;

        // Rellenar tabla
        steps.forEach(step => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${step.bit}</td>
                <td>${step.potencia}</td>
                <td>${step.resultado}</td>
            `;
            tableBody.appendChild(row);
        });

        resultSpan.textContent = decimal;
    }

    document.getElementById("conversionTable").classList.remove("hidden");
});
