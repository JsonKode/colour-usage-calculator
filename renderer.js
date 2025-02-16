let colorDict = {};

function addColorUsage() {
    const color = document.getElementById('color').value.trim();
    const grams = parseFloat(document.getElementById('grams').value);

    if (color && !isNaN(grams) && grams > 0) {
        colorDict[color] = (colorDict[color] || 0) + grams;
        document.getElementById('color').value = '';
        document.getElementById('grams').value = '';
        updateOutput();
    } else {
        alert('Please enter a valid color and amount in grams.');
    }
}

function updateOutput() {
    const table = document.getElementById('usageTable');
    table.innerHTML = `<tr><th>Color</th><th>Grams</th></tr>`;

    for (let color in colorDict) {
        let row = `<tr><td>${color}</td><td>${colorDict[color].toFixed(1)}</td></tr>`;
        table.innerHTML += row;
    }
}

function finishInput() {
    const totalGrams = Object.values(colorDict).reduce((acc, grams) => acc + grams, 0);
    const scaleFactor = 960 / totalGrams;
    let scaledColorDict = {};

    for (let color in colorDict) {
        scaledColorDict[color] = Math.round(colorDict[color] * scaleFactor); // Round to whole number
    }

    document.getElementById('output').innerHTML = `
    <h2>Total grams used: ${Math.round(totalGrams)} grams</h2>
    <h2>Scaled to 960 grams:</h2>
    <table>
        <tr><th>Color</th><th>Scaled (grams)</th></tr>
        ${Object.entries(scaledColorDict).map(([color, value]) => `<tr><td>${color}</td><td>${value}</td></tr>`).join('')}
    </table>
`;
}

function resetCalculator() {
    colorDict = {};
    document.getElementById('usageTable').innerHTML = `<tr><th>Color</th><th>Grams</th></tr>`;
    document.getElementById('output').innerHTML = '<h2>Color Usage:</h2>';
}


//////////////////////////////////////////
// function finishInput() {
//     const totalGrams = Object.values(colorDict).reduce((acc, grams) => acc + grams, 0);
//     const scaleFactor = 960 / totalGrams;
//     let scaledColorDict = {};

//     for (let color in colorDict) {
//         scaledColorDict[color] = Math.round(colorDict[color] * scaleFactor); // Round to whole number
//     }

//     document.getElementById('output').innerHTML = `
//         <h2>Total grams used: ${Math.round(totalGrams)} grams</h2>
//         <h2>Scaled to 960 grams:</h2>
//         <table>
//             <tr><th>Color</th><th>Scaled (grams)</th></tr>
//             ${Object.entries(scaledColorDict).map(([color, value]) => `<tr><td>${color}</td><td>${value}</td></tr>`).join('')}
//         </table>
//     `;
// }
