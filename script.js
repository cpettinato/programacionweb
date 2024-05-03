let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

// function agregarAlCarrito(button) {
//     const card = button.closest('.product-card');
//     const id = card.getAttribute('data-id');
//     const producto = card.getAttribute('data-product');
//     const precio = parseFloat(card.getAttribute('data-price').replace(/\$|,/g, ''));

//     if (!carrito[id]) {
//         carrito[id] = { producto, precio, cantidad: 0 };
//     }
//     carrito[id].cantidad++;
//     actualizarCarrito();
// }

function agregarAlCarrito(button) {
    const card = button.closest('.product-card');
    const id = card.getAttribute('data-id');
    const producto = card.getAttribute('data-product');
    const precio = parseFloat(card.getAttribute('data-price').replace(/\$|,/g, ''));
    const imagen = card.querySelector('img').src;

    // Configuración del modal
    document.getElementById('modal-product-image').src = imagen;
    document.getElementById('modal-product-title').textContent = producto;
    document.getElementById('modal-product-price').textContent = `$${precio}`;
    document.getElementById('modal-product-quantity').textContent = '1';  // Inicia la cantidad en 1

    // Guardar datos temporales del producto en el modal
    document.getElementById('productModal').setAttribute('data-id', id);
    document.getElementById('productModal').setAttribute('data-product', producto);
    document.getElementById('productModal').setAttribute('data-price', precio);

    // Mostrar el modal
    var productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
}

function cambiarCantidadModal(delta) {
    let quantity = parseInt(document.getElementById('modal-product-quantity').textContent);
    quantity += delta;
    if (quantity < 1) quantity = 1;  // Asegura que la cantidad nunca sea menos de 1
    document.getElementById('modal-product-quantity').textContent = quantity;
}

function agregarAlCarritoDesdeModal() {
    const id = document.getElementById('productModal').getAttribute('data-id');
    const producto = document.getElementById('productModal').getAttribute('data-product');
    const precio = parseFloat(document.getElementById('productModal').getAttribute('data-price'));
    const cantidad = parseInt(document.getElementById('modal-product-quantity').textContent);

    if (!carrito[id]) {
        carrito[id] = { producto, precio, cantidad: 0 };
    }
    carrito[id].cantidad += cantidad;
    actualizarCarrito();

    // Cerrar el modal usando Bootstrap 5
    var productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    if (productModal) {
        productModal.hide();
    } else {
        console.error("No se pudo obtener la instancia del modal");
    }
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

// function renderizarCarrito() {
//     const items = document.getElementById('items');
//     items.innerHTML = '';
//     let totalCarrito = 0;

//     Object.keys(carrito).forEach((id) => {
//         const { producto, precio, cantidad } = carrito[id];
//         const subtotal = precio * cantidad;
//         totalCarrito += subtotal;

//         items.innerHTML += `
//             <tr>
//                 <td>${producto}</td>
//                 <td>$${precio}</td>
//                 <td>
//                     <button onclick="cambiarCantidad('${id}', -1)">-</button>
//                     ${cantidad}
//                     <button onclick="cambiarCantidad('${id}', 1)">+</button>
//                 </td>
//                 <td>$${subtotal}</td>
//             </tr>
//         `;
//     });

//     const total = document.getElementById('total');
//     total.innerHTML = `$${totalCarrito}`;
// }

function renderizarCarrito() {
    const items = document.getElementById('items');
    if (items) {
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
        if (total) {
            total.innerHTML = `$${totalCarrito}`;
        }
    }
}

function actualizarContadorCarrito() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const count = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
        cartCount.textContent = count;
    }
}



function vaciarCarrito() {
    carrito = {};
    actualizarCarrito();
}

// function actualizarContadorCarrito() {
//     const count = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
//     document.getElementById('cart-count').textContent = count;
// }


document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
    actualizarContadorCarrito();
});



