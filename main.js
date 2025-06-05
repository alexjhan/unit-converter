// Mostrar secciones según el botón presionado
document.getElementById('btn-length').onclick = () => showSection('section-length');
document.getElementById('btn-weight').onclick = () => showSection('section-weight');
document.getElementById('btn-temperature').onclick = () => showSection('section-temperature');

function showSection(id) {
    document.querySelectorAll('.converter-section').forEach(section => {
        section.style.display = section.id === id ? 'block' : 'none';
    });
}

// Conversión bidireccional automática para Longitud
const lengthUnits = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.34
};

addBidirectionalConversion('length', lengthUnits);

// Conversión bidireccional automática para Peso
const weightUnits = {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lb: 0.453592,
    oz: 0.0283495
};

addBidirectionalConversion('weight', weightUnits);

// Conversión especial para Temperatura
addTemperatureConversion();

function addBidirectionalConversion(prefix, unitMap) {
    const input1 = document.getElementById(`${prefix}-input-1`);
    const input2 = document.getElementById(`${prefix}-input-2`);
    const selectFrom = document.getElementById(`${prefix}-from`);
    const selectTo = document.getElementById(`${prefix}-to`);

    input1.addEventListener('input', () => {
        const val = parseFloat(input1.value);
        if (!isNaN(val)) {
            input2.value = (val * unitMap[selectFrom.value] / unitMap[selectTo.value]).toFixed(4);
        }
    });

    input2.addEventListener('input', () => {
        const val = parseFloat(input2.value);
        if (!isNaN(val)) {
            input1.value = (val * unitMap[selectTo.value] / unitMap[selectFrom.value]).toFixed(4);
        }
    });

    selectFrom.addEventListener('change', () => input1.dispatchEvent(new Event('input')));
    selectTo.addEventListener('change', () => input1.dispatchEvent(new Event('input')));
}

function addTemperatureConversion() {
    const input1 = document.getElementById('temp-input-1');
    const input2 = document.getElementById('temp-input-2');
    const from = document.getElementById('temp-from');
    const to = document.getElementById('temp-to');

    input1.addEventListener('input', () => {
        input2.value = convertTemperature(parseFloat(input1.value), from.value, to.value);
    });

    input2.addEventListener('input', () => {
        input1.value = convertTemperature(parseFloat(input2.value), to.value, from.value);
    });

    from.addEventListener('change', () => input1.dispatchEvent(new Event('input')));
    to.addEventListener('change', () => input1.dispatchEvent(new Event('input')));
}

function convertTemperature(value, from, to) {
    if (isNaN(value)) return '';
    if (from === to) return value.toFixed(2);

    let celsius;

    // Convertir a Celsius
    if (from === 'c') celsius = value;
    else if (from === 'f') celsius = (value - 32) * 5 / 9;
    else if (from === 'k') celsius = value - 273.15;

    // Convertir desde Celsius a otra unidad
    if (to === 'c') return celsius.toFixed(2);
    else if (to === 'f') return (celsius * 9 / 5 + 32).toFixed(2);
    else if (to === 'k') return (celsius + 273.15).toFixed(2);
}
