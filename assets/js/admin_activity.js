

// Inicializa el mapa y establece su vista en una ubicación central de las Tierras Altas de Soria
var map = L.map('map').setView([41.7636, -2.4671], 13);

// Añade una capa de mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Define los íconos personalizados
var farmacyIcon = L.icon({
    iconUrl: 'assets/img/icon_farmacia.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28]
});

var droneIcon = L.icon({
    iconUrl: 'assets/img/icon_dron.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28]
});

var deliveryIcon = L.icon({
    iconUrl: 'assets/img/icon_entrega.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28]
});

// Ubicación de la farmacia y los drones
var farmacyLocation = [41.876772, -2.059447];var dronLocation1 = farmacyLocation; // Dron 1 en el almacén
var dronLocation2 = farmacyLocation; // Dron 2 en el almacén
var dronLocation3 = [41.908074, -2.094158]; // Cerca de la primera entrega


// Marcadores personalizados
L.marker(farmacyLocation, {icon: farmacyIcon}).addTo(map).bindPopup('Farmacy');
L.marker(dronLocation3, {icon: droneIcon}).addTo(map).bindPopup('Drone 3');

var primeraEntrega = [41.934471, -2.112403]; // Ubicación de la primera entrega
var segundaEntrega = [41.929443, -2.189776]; // Ubicación de la segunda entrega

// Marcadores para las entregas
L.marker(primeraEntrega, {icon: deliveryIcon}).addTo(map).bindPopup('First Delivery');
L.marker(segundaEntrega, {icon: deliveryIcon}).addTo(map).bindPopup('Second Delivery');

// Ruta del Dron 3
var rutaDron3 = L.polyline([dronLocation3, primeraEntrega, segundaEntrega, farmacyLocation], {color: 'green'}).addTo(map);
map.fitBounds(rutaDron3.getBounds());
