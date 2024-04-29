let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

function agregarAlCarrito(button) {
    const card = button.closest('.product-card');
    const id = card.getAttribute('data-id');
    const producto = card.getAttribute('data-product');
    const precio = parseFloat(card.getAttribute('data-price').replace(/\$|,/g, ''));

    if (!carrito[id]) {
        carrito[id] = { producto, precio, cantidad: 0 };
    }
    carrito[id].cantidad++;
    actualizarCarrito();
}

function cambiarCantidad(id, delta) {
    const producto = carrito[id];
    if (producto) {
        producto.cantidad += delta;
        if (producto.cantidad <= 0) {
            delete carrito[id];
        }
        actualizarCarrito(); 
    }
}

function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    //alert('Producto agregado al carrito!');
    renderizarCarrito();
}

function renderizarCarrito() {
    const items = document.getElementById('items');
    items.innerHTML = '';
    let totalCarrito = 0;

    Object.keys(carrito).forEach((id) => {
        const { producto, precio, cantidad } = carrito[id];
        const subtotal = precio * cantidad;
        totalCarrito += subtotal;

        items.innerHTML += `
            <tr>
                <td>${producto}</td>
                <td>$${precio}</td>
                <td>
                    <button onclick="cambiarCantidad('${id}', -1)">-</button>
                    ${cantidad}
                    <button onclick="cambiarCantidad('${id}', 1)">+</button>
                </td>
                <td>$${subtotal}</td>
            </tr>
        `;
    });

    const total = document.getElementById('total');
    total.innerHTML = `$${totalCarrito}`;
}

function vaciarCarrito() {
    carrito = {};
    actualizarCarrito();
}

function actualizarContadorCarrito() {
    const count = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
    document.getElementById('cart-count').textContent = count;
}


document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
    actualizarContadorCarrito();
});



