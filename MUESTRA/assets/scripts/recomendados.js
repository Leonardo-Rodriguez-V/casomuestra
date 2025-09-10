/*function guardarHistorialCompra(producto) {
    let historial = JSON.parse(localStorage.getItem('historialCompras')) || [];
    historial.push(producto);
    localStorage.setItem('historialCompras', JSON.stringify(historial));
    mostrarRecomendados();
}

function mostrarRecomendados() {
    let historial = JSON.parse(localStorage.getItem('historialCompras')) || [];
    if (!historial.length) return;
    let categoriasCompradas = [...new Set(historial.map(p => p.categoria))];
    let recomendados = productos.filter(p => categoriasCompradas.includes(p.categoria) && !historial.some(h => h.id === p.id));
    let contenedor = document.getElementById('recomendadosProductos');
    contenedor.innerHTML = recomendados.map(p => `
        <div class="col-md-4">
            <div class="card">
                <img src="${p.img}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${p.nombre}</h5>
                    <p class="card-text">${p.descripcion}</p>
                    <p class="card-text">$${p.precio.toLocaleString('es-CL')}</p>
                    <a href="#" class="btn btn-primary btn-comprar" data-id="${p.id}" data-nombre="${p.nombre}" data-precio="${p.precio}" data-categoria="${p.categoria}">Comprar</a>
                </div>
            </div>
        </div>
    `).join('');
    document.getElementById('recomendados').style.display = recomendados.length ? '' : 'none';
}

document.addEventListener('DOMContentLoaded', mostrarRecomendados);
*/

// JS RECOMENDADOS - Sugerencias por historial

// Simulación de productos (añade aquí todos los productos del catálogo con categoría e imagen)
const productos = [
    {id:"producto1",nombre:"Catan",precio:29990,categoria:"juegos",img:"assets/image/catan.webp",descripcion:"Clásico juego de estrategia..."},
    {id:"producto2",nombre:"Control Xbox Series X",precio:59990,categoria:"accesorios",img:"assets/image/Controlador Inalámbrico Xbox Series X.webp",descripcion:"Control cómodo..."},
    // ... agrega el resto igual
    // Usa la misma categoría que usaste al guardar en historial
];

function guardarHistorialCompra(producto) {
    let historial = JSON.parse(localStorage.getItem('historialCompras')) || [];
    historial.push(producto);
    localStorage.setItem('historialCompras', JSON.stringify(historial));
    mostrarRecomendados();
}

function mostrarRecomendados() {
    let historial = JSON.parse(localStorage.getItem('historialCompras')) || [];
    if (!historial.length) return;
    let categoriasCompradas = [...new Set(historial.map(p => p.categoria))];
    let recomendados = productos.filter(p => categoriasCompradas.includes(p.categoria) && !historial.some(h => h.id === p.id));
    let contenedor = document.getElementById('recomendadosProductos');
    if (!contenedor) return;
    contenedor.innerHTML = recomendados.map(p => `
        <div class="col-md-4">
            <div class="card">
                <img src="${p.img}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${p.nombre}</h5>
                    <p class="card-text">${p.descripcion}</p>
                    <p class="card-text">$${p.precio.toLocaleString('es-CL')}</p>
                    <a href="#" class="btn btn-primary btn-comprar" data-id="${p.id}" data-nombre="${p.nombre}" data-precio="${p.precio}" data-categoria="${p.categoria}">Comprar</a>
                </div>
            </div>
        </div>
    `).join('');
    if (document.getElementById('recomendados')) {
        document.getElementById('recomendados').style.display = recomendados.length ? '' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', mostrarRecomendados);