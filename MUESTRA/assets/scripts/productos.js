// Catálogo dinámico
const productos = [
    {
        id: 'producto1',
        nombre: 'Catan 🎲',
        categoria: 'Juegos de Mesa',
        precio: 29990,
        img: 'assets/image/catan.webp',
        descripcion: 'Clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores.',
    },
    {
        id: 'producto2',
        nombre: 'Carcassonne 🎲',
        categoria: 'Juegos de Mesa',
        precio: 24990,
        img: 'assets/image/carcassonne.webp',
        descripcion: 'Juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne.',
    },
    {
        id: 'producto3',
        nombre: 'Control Xbox Series X',
        categoria: 'Accesorios',
        precio: 59990,
        img: 'assets/image/Controlador Inalámbrico Xbox Series X.webp',
        descripcion: 'Control inalámbrico con botones mapeables y respuesta táctil mejorada. Compatible con Xbox y PC.',
    },
    {
        id: 'producto4',
        nombre: 'Play Station 5',
        categoria: 'Consolas',
        precio: 549990,
        img: 'assets/image/D_NQ_NP_2X_883946-MLA79964406701_102024-F.webp',
        descripcion: 'Consola de última generación de Sony, gráficos impresionantes y tiempos de carga ultrarrápidos.',
    },
    {
        id: 'producto5',
        nombre: 'Auriculares Gamer HyperX Cloud II',
        categoria: 'Accesorios',
        precio: 79990,
        img: 'assets/image/Auriculares-gamer_HyperX Cloud II.jpg',
        descripcion: 'Sonido envolvente de calidad, micrófono desmontable y almohadillas cómodas.',
    },
    {
        id: 'producto6',
        nombre: 'Asus Rog Strix Scar 15 Gaming Laptop',
        categoria: 'Computadores Gamers',
        precio: 1299990,
        img: 'assets/image/Asus Rog Strix Scar 15 Gaming Laptop-15.6.jpg',
        descripcion: 'Laptop potente con Intel i7, NVIDIA RTX 3060 y pantalla 300Hz.',
    },
    {
        id: 'producto7',
        nombre: 'Secretlab Titan Evo Frost',
        categoria: 'Sillas Gamers',
        precio: 349990,
        img: 'assets/image/Secretlab Titan Evo Frost -Silla Gamer.jpg',
        descripcion: 'Silla gamer ergonómica y personalizable para sesiones prolongadas.',
    },
    {
        id: 'producto8',
        nombre: 'Mouse Gamer Logitech G502 HERO',
        categoria: 'Mouse',
        precio: 49990,
        img: 'assets/image/Mouse Gamer Logitech G502 HERO.webp',
        descripcion: 'Mouse de alta precisión con sensor HERO 25K, 11 botones programables y RGB.',
    },
    {
        id: 'producto9',
        nombre: 'Mousepad Razer Goliathus Extended Chroma',
        categoria: 'Mousepad',
        precio: 29990,
        img: 'assets/image/Mousepad Razer Goliathus Extended Chroma.webp',
        descripcion: 'Mousepad extendido con iluminación RGB y superficie optimizada.',
    },
    {
        id: 'producto10',
        nombre: 'Polera Level UP Gamer',
        categoria: 'Poleras Personalizadas',
        precio: 19990,
        img: 'assets/image/PoleraLevelUP.jpg',
        descripcion: 'Polera de algodón con diseño exclusivo Level UP Gamer.',
    },
    {
        id: 'producto11',
        nombre: 'Refrigeración Líquida Cougar Poseidon Elite ARGB 240',
        categoria: 'Accesorios',
        precio: 70990,
        img: 'assets/image/Refrigeración Liquida Cougar Poseidon Elite ARGB 240-Black1.webp',
        descripcion: 'Sistema de refrigeración líquida para CPU con iluminación ARGB.',
    },
    {
        id: 'producto12',
        nombre: 'Monitor Gamer Xiaomi G34, WQi, 180Hz',
        categoria: 'Accesorios',
        precio: 295990,
        img: 'assets/image/Monitor Gamer Xiaomi G34″, WQi, 180Hz.webp',
        descripcion: 'Monitor ultrawide 34" WQHD, 180Hz, 3ms y AMD FreeSync.',
    },
];

document.addEventListener('DOMContentLoaded', () => {
    const cont = document.getElementById('catalogoProductos');
    cont.innerHTML = productos.map(p => `
        <div class="col-md-4">
            <div class="card">
                <img src="${p.img}" class="card-img-top" alt="${p.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${p.nombre}</h5>
                    <p class="card-text">${p.descripcion}</p>
                    <p class="card-text" style="color: #00F7FF;">$${p.precio.toLocaleString('es-CL')}</p>
                    <a href="#" class="btn btn-primary btn-comprar" data-id="${p.id}" data-nombre="${p.nombre}" data-precio="${p.precio}" data-categoria="${p.categoria}">Comprar</a>
                </div>
            </div>
        </div>
    `).join('');
});


// En catálogo.js
function mostrarPrecios(usuario, producto) {
  const precioFinal = usuario.tieneDescuentoGamer && producto.categoria === 'gamer' 
    ? producto.precio * 0.8 
    : producto.precio;
  
  return `<div class="precio">
            ${usuario.tieneDescuentoGamer ? '<span class="badge bg-success">-20%</span>' : ''}
            $${precioFinal.toFixed(2)}
          </div>`;
}
