/*
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || null;

function agregarAlCarrito(producto) {
    if (!producto || !producto.id) {
        Swal.fire('Error', 'Producto no válido', 'error');
        return;
    }

    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
        itemExistente.cantidad++;
        Swal.fire('¡Actualizado!', `${producto.nombre} ahora tiene ${itemExistente.cantidad} en el carrito`, 'info');
    } else {
        carrito.push({ ...producto, cantidad: 1 });
        Swal.fire('¡Agregado!', `${producto.nombre} se añadió al carrito`, 'success');
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarCarritoUI();
}

function getTotalCarrito() {
    let total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    if (usuarioActivo && esCorreoDuoc(usuarioActivo.email)) {
        total = Math.round(total * 0.8);
        document.getElementById('totalDescuento').textContent = 'Se aplicó descuento Duoc (-20%)';
    } else {
        document.getElementById('totalDescuento').textContent = '';
    }
    return total;
}

function actualizarCarritoUI() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById('contadorCarrito').textContent = totalItems;
    const carritoItems = document.getElementById('carritoItems');
    const totalCarrito = document.getElementById('totalCarrito');
    let html = '';
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        html += `
            <div class="cart-item d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h6>${item.nombre}</h6>
                    <small>Cantidad: ${item.cantidad}</small>
                </div>
                <div>
                    <span>$${subtotal.toLocaleString('es-CL')}</span>
                    <button class="btn btn-sm btn-danger ms-2" onclick="eliminarDelCarrito('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    carritoItems.innerHTML = html || '<p>El carrito está vacío</p>';
    totalCarrito.textContent = getTotalCarrito().toLocaleString('es-CL');
}

function eliminarDelCarrito(productId) {
    carrito = carrito.filter(item => item.id !== productId);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const producto = {
                id: e.target.dataset.id,
                nombre: e.target.dataset.nombre,
                precio: parseInt(e.target.dataset.precio),
                categoria: e.target.dataset.categoria
            };
            agregarAlCarrito(producto);
        });
    });

    document.getElementById('vaciarCarritoBtn').addEventListener('click', vaciarCarrito);

    document.getElementById('finalizarCompraBtn').addEventListener('click', () => {
        if (carrito.length === 0) {
            Swal.fire('Error', 'El carrito está vacío', 'error');
            return;
        }
        Swal.fire({
            title: '¿Confirmar compra?',
            text: `Total: $${document.getElementById('totalCarrito').textContent}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Comprar!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('¡Éxito!', 'Compra realizada', 'success');
                vaciarCarrito();
                bootstrap.Modal.getInstance(document.getElementById('carritoModal')).hide();
            }
        });
    });

    actualizarCarritoUI();
});
*/

// JS CARRITO - Gestión de carrito con historial de compra

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || null;

// Función para validar correo Duoc (asegúrate que esté en tus utilidades)
function esCorreoDuoc(email) {
    return email && email.toLowerCase().endsWith("@duoc.cl");
}

// Agregar producto al carrito
function agregarAlCarrito(producto) {
    if (!producto || !producto.id) {
        Swal.fire('Error', 'Producto no válido', 'error');
        return;
    }
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
        itemExistente.cantidad++;
        Swal.fire('¡Actualizado!', `${producto.nombre} ahora tiene ${itemExistente.cantidad} en el carrito`, 'info');
    } else {
        carrito.push({ ...producto, cantidad: 1 });
        Swal.fire('¡Agregado!', `${producto.nombre} se añadió al carrito`, 'success');
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarCarritoUI();
}

// Calcular total y aplicar descuento si es usuario Duoc
function getTotalCarrito() {
    let total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const totalDescuentoEl = document.getElementById('totalDescuento');
    if (usuarioActivo && esCorreoDuoc(usuarioActivo.email)) {
        total = Math.round(total * 0.8);
        if (totalDescuentoEl) totalDescuentoEl.textContent = 'Se aplicó descuento Duoc (-20%)';
    } else {
        if (totalDescuentoEl) totalDescuentoEl.textContent = '';
    }
    return total;
}

// Actualiza la UI del carrito
function actualizarCarritoUI() {
    const contador = document.getElementById('contadorCarrito');
    const carritoItems = document.getElementById('carritoItems');
    const totalCarrito = document.getElementById('totalCarrito');
    if (!contador || !carritoItems || !totalCarrito) return;
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contador.textContent = totalItems;
    let html = '';
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        html += `
            <div class="cart-item d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h6>${item.nombre}</h6>
                    <small>Cantidad: ${item.cantidad}</small>
                </div>
                <div>
                    <span>$${subtotal.toLocaleString('es-CL')}</span>
                    <button class="btn btn-sm btn-danger ms-2" onclick="eliminarDelCarrito('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    carritoItems.innerHTML = html || '<p>El carrito está vacío</p>';
    totalCarrito.textContent = getTotalCarrito().toLocaleString('es-CL');
}

// Eliminar producto del carrito
function eliminarDelCarrito(productId) {
    carrito = carrito.filter(item => item.id !== productId);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
}

// Guardar productos comprados en historial para recomendados
function guardarHistorialCompraCarrito() {
    let historial = JSON.parse(localStorage.getItem('historialCompras')) || [];
    carrito.forEach(item => {
        // Solo guarda si no existe ya en el historial
        if (!historial.some(h => h.id === item.id)) {
            historial.push({
                id: item.id,
                nombre: item.nombre,
                precio: item.precio,
                categoria: item.categoria || '', // si tienes categoría en el producto
                img: item.img || '', // si usas imagen
                descripcion: item.descripcion || '' // si tienes descripción
            });
        }
    });
    localStorage.setItem('historialCompras', JSON.stringify(historial));
}

// Integración con el HTML
document.addEventListener('DOMContentLoaded', () => {
    // Botón comprar en productos
    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const producto = {
                id: e.target.dataset.id,
                nombre: e.target.dataset.nombre,
                precio: parseInt(e.target.dataset.precio),
                categoria: e.target.dataset.categoria || '', // si tienes categoría
                img: e.target.dataset.img || '', // si tienes imagen en el dataset
                descripcion: e.target.dataset.descripcion || '' // si tienes descripción
            };
            agregarAlCarrito(producto);
        });
    });

    // Botón vaciar carrito
    const vaciarBtn = document.getElementById('vaciarCarritoBtn');
    if (vaciarBtn) vaciarBtn.addEventListener('click', vaciarCarrito);

    // Botón finalizar compra
    const finalizarBtn = document.getElementById('finalizarCompraBtn');
    if (finalizarBtn) finalizarBtn.addEventListener('click', () => {
        if (carrito.length === 0) {
            Swal.fire('Error', 'El carrito está vacío', 'error');
            return;
        }
        Swal.fire({
            title: '¿Confirmar compra?',
            text: `Total: $${document.getElementById('totalCarrito').textContent}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Comprar!'
        }).then((result) => {
            if (result.isConfirmed) {
                guardarHistorialCompraCarrito(); // <<--- GUARDAR EN HISTORIAL
                Swal.fire('¡Éxito!', 'Compra realizada', 'success');
                vaciarCarrito();
                if (bootstrap.Modal.getInstance(document.getElementById('carritoModal'))) {
                    bootstrap.Modal.getInstance(document.getElementById('carritoModal')).hide();
                }
            }
        });
    });

    actualizarCarritoUI();
});