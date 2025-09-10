/*
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('buscadorCatalogo').addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('#catalogo .card').forEach(card => {
            const nombre = card.querySelector('.card-title').textContent.toLowerCase();
            const descripcion = card.querySelector('.card-text').textContent.toLowerCase();
            card.style.display = (nombre.includes(query) || descripcion.includes(query)) ? '' : 'none';
        });
    });
});
*/

// JS BUSQUEDA - Filtrado de catálogo
document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById('buscadorCatalogo');
    if (!buscador) return;
    buscador.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('#catalogo .card').forEach(card => {
            const nombre = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
            const descripcion = (card.querySelector('.card-text')?.textContent || '').toLowerCase();
            card.style.display = (nombre.includes(query) || descripcion.includes(query)) ? '' : 'none';
        });
    });
});