const ctx1 = document.getElementById('productosVendidosPorDia').getContext('2d');
const productosVendidosPorDia = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednedsay', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Productos Vendidos',
            data: [50, 60, 45, 80, 75, 20, 25],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctx2 = document.getElementById('productoMasVendido').getContext('2d');
const productoMasVendido = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['Frenadol Forte', 'Paracetamol Bayer', 'IlviGrip Expectorant', 'Paracetamol Tecnimide', 'Remidol Granules', 'Propalgina Plus', 'Apiretal', 'Couldina Instant', 'Salvarine Oral'],
        datasets: [{
            label: 'Ventas',
            data: [32, 30, 28, 25, 20, 19, 18, 9, 7], // Datos de ventas para cada producto
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',  // Rojo
                'rgba(54, 162, 235, 0.5)',   // Azul
                'rgba(255, 206, 86, 0.5)',   // Amarillo
                'rgba(75, 192, 192, 0.5)',   // Verde
                'rgba(153, 102, 255, 0.5)',  // Morado
                'rgba(255, 159, 64, 0.5)',   // Naranja
                'rgba(201, 203, 207, 0.5)',  // Gris
                'rgba(233, 30, 99, 0.5)',    // Rosa
                'rgba(0, 188, 212, 0.5)'     // Cian
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',  // Rojo
                'rgba(54, 162, 235, 1)',   // Azul
                'rgba(255, 206, 86, 1)',   // Amarillo
                'rgba(75, 192, 192, 1)',   // Verde
                'rgba(153, 102, 255, 1)',  // Morado
                'rgba(255, 159, 64, 1)',   // Naranja
                'rgba(201, 203, 207, 1)',  // Gris
                'rgba(233, 30, 99, 1)',    // Rosa
                'rgba(0, 188, 212, 1)'     // Cian
            ],
            borderWidth: 1
        }]
    }
});


const ctx3 = document.getElementById('ventasPorHora').getContext('2d');
const ventasPorHora = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: [
            '0am', '1am', '2am', '3am', '4am', '5am', '6am', '7am',
            '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm',
            '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'
        ],
        datasets: [{
            label: 'Ventas por Hora',
            data: [
                5, 3, 2, 2, 1, 2, 3, 5, // Bajo volumen de 0 a 8am
                10, 15, 20, 25, 30, 35, 40, 45, // Aumento durante la mañana y mediodía
                60, 65, 70, 75, 80, 85, 60, 40, // Pico alto de ventas de 4pm a 9pm
                20, 15, 10, 8 // Disminución hacia la noche
            ],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        // Asegúrate de que el gráfico no se comprima demasiado con tantos puntos de datos
        aspectRatio: 2.5
    }
});
