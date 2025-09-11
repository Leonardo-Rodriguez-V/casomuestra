// Configuración del mapa Leaflet
document.addEventListener('DOMContentLoaded', function() {
	if (typeof L !== 'undefined' && document.getElementById('map')) {
		const map = L.map('map').setView([-33.45694, -70.64827], 13);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
		L.marker([-33.45694, -70.64827])
			.addTo(map)
			.bindPopup('Torneo FIFA 2025<br>25 Septiembre')
			.openPopup();
	}
});
