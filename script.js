// Datos de productos
const productos = [
    { id: 1, nombre: 'Hamburguesa', precio: 5.99, imagen: 'hamburguesa.jpg' },
    { id: 2, nombre: 'Pizza', precio: 8.99, imagen: 'pizza.jpg' },
    // Agrega más productos según tu inventario
];

// Variables para el carrito y paso actual
let carrito = [];
let pasoActual = 1;

// Función para cargar los productos en el menú
function cargarProductos() {
    const menu = document.getElementById('productos');
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        menu.appendChild(card);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    carrito.push(producto);
    actualizarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    carrito.forEach(producto => {
        const listItem = document.createElement('li');
        listItem.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
        listaCarrito.appendChild(listItem);
    });
}

// Función para ir al siguiente paso
function irAPasoSiguiente() {
    document.getElementById('paso-siguiente').style.display = 'block';
    document.getElementById('carrito').style.display = 'none';
    pasoActual = 2;
}

// Función para finalizar el pedido
function finalizarPedido(opcionEntrega) {
    const mensaje = `Nuevo pedido:\n\n${carrito.map(item => `${item.nombre} - $${item.precio.toFixed(2)}`).join('\n')}\n\nOpción de entrega: ${opcionEntrega}`;
    
    // Reemplaza el número de teléfono con tu número de WhatsApp
    const numeroWhatsapp = 'tu_numero_de_whatsapp';

    // Genera el enlace de WhatsApp
    const enlaceWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;

    // Abre el enlace en una nueva ventana
    window.open(enlaceWhatsapp, '_blank');

    // Reinicia las variables para un nuevo pedido
    carrito = [];
    actualizarCarrito();
    document.getElementById('paso-siguiente').style.display = 'none';
    document.getElementById('carrito').style.display = 'block';
    pasoActual = 1;
}

// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', cargarProductos);
