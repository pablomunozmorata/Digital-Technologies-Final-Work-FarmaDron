const productos = [
    { id: 1, name: "Frenadol Forte granulated 10 sachets" },
    { id: 2, name: "Paracetamol Bayer" },
    { id: 3, name: "IlviGrip Expectorant, 10 sachets" },
    { id: 4, name: "Paracetamol Tecnimide 500mg" },
    { id: 5, name: "Remidol granules, 650mg" },
    { id: 6, name: "Propalgina plus, powder for oral solution" },
    { id: 7, name: "Apiretal 500mg" },
    { id: 8, name: "Couldina instant, 20 sachets" },
    { id: 9, name: "Salvarine, oral" }
   
];





function generarCoordenadasAleatorias() {
    const latitudBase = 41.7633;
    const longitudBase = -2.4649;
    const variacion = 0.05;
    return {
        latitud: latitudBase + Math.random() * variacion * (Math.random() < 0.5 ? -1 : 1),
        longitud: longitudBase + Math.random() * variacion * (Math.random() < 0.5 ? -1 : 1)
    };
}

function generarHoraAleatoria() {
    const hora = Math.random() < 0.75 ? (8 + Math.floor(Math.random() * 12)) : Math.floor(Math.random() * 24);
    const minutos = Math.floor(Math.random() * 60);
    return `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
}

const pedidosFicticios = [];

function generarPedidos() {
    const fechaInicio = new Date(2023, 11, 6); // 6 de diciembre de 2023
    const dias = 7;

    for (let dia = 0; dia < dias; dia++) {
        for (let i = 0; i < 5; i++) {
            const fecha = new Date(fechaInicio);
            fecha.setDate(fecha.getDate() + dia);
            fecha.setHours(Math.floor(Math.random() * 24));
            fecha.setMinutes(Math.floor(Math.random() * 60));

            const productoAleatorio = productos[Math.floor(Math.random() * productos.length)];
            const coordenadas = generarCoordenadasAleatorias();
            const horaPedido = generarHoraAleatoria();

            pedidosFicticios.push({
                fecha: `${fecha.toLocaleDateString('es-ES')} ${horaPedido}`,
                coordenadas: coordenadas,
                nombreProducto: productoAleatorio.name,
                cantidad: Math.floor(Math.random() * 5) + 1
            });
        }
    }
}

generarPedidos();



// Ordenar los pedidos por fecha y hora
pedidosFicticios.sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    return fechaA - fechaB;
});

// Ejemplo de cómo mostrar los pedidos ordenados
pedidosFicticios.forEach(pedido => {
    console.log(`Pedido realizado el ${pedido.fecha} en [${pedido.coordenadas.latitud.toFixed(4)}, ${pedido.coordenadas.longitud.toFixed(4)}]: ${pedido.nombreProducto} x ${pedido.cantidad}`);
});