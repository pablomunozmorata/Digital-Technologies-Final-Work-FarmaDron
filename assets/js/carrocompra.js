// Variables globales
let products = [];
let cart = [];
let cartTimer;

// Cargar el estado del carrito desde localStorage al iniciar
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// Guardar el estado del carrito en localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Despliega panel carrito
document.getElementById('cart-icon').addEventListener('mouseover', () => {
    document.getElementById('cart-panel').style.display = 'block';
});

document.getElementById('cart-panel').addEventListener('mouseover', () => {
    clearTimeout(cartTimer);
});

document.getElementById('cart-panel').addEventListener('mouseout', () => {
    cartTimer = setTimeout(() => {
        document.getElementById('cart-panel').style.display = 'none';
    }, 250);
});

// Cargar los productos desde el JSON al iniciar
fetch('assets/json/ID_product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
    })
    .catch(error => console.error('Error loading products:', error));

// Función para obtener el ID del producto de la URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Función para actualizar el valor del campo oculto con el ID del producto
function setProductIdInputValue(productId) {
    const productIdInput = document.getElementById('product-id');
    if (productIdInput) {
        productIdInput.value = productId;
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    const productId = getProductIdFromUrl();
    setProductIdInputValue(productId);
    updateCartDisplay();
    updateCartBadge();
});

// Función para actualizar el badge del carrito
function updateCartBadge() {
    const cartBadge = document.querySelector('.nav-icon .badge');
    const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
    cartBadge.textContent = totalQuantity;
}

// Añadir producto al carrito
document.getElementById('add-to-cart-button').addEventListener('click', () => {
    const productId = document.getElementById('product-id').value;
    const quantity = parseInt(document.getElementById('product-quanity').value);
    const product = products.find(p => p.id == productId);

    if (product) {
        const existingProductIndex = cart.findIndex(p => p.id == productId);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            product.quantity = quantity;
            cart.push(product);
        }
        saveCartToLocalStorage();
        updateCartDisplay();
        updateCartBadge();
    } else {
        console.error('Producto no encontrado');
    }
});

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <h4>${item.name}</h4>
            <p>${item.price} x ${item.quantity}</p>
            <img src="${item.image}" alt="${item.name}" />
            <button class="remove-item" data-id="${item.id}">Eliminar</button>
        `;
        cartContainer.appendChild(itemElement);
        total += parseFloat(item.price) * item.quantity;
    });

    document.getElementById('total-cart').textContent = `Total: ${total.toFixed(2)}€`;
    attachRemoveItemEventListeners();
}

function attachRemoveItemEventListeners() {
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            removeItemFromCart(productId);
        });
    });
}

function removeItemFromCart(productId) {
    cart = cart.filter(item => item.id != productId);
    saveCartToLocalStorage();
    updateCartDisplay();
    updateCartBadge();
}


document.getElementById('checkout-button').addEventListener('click', () => {
    // Vaciar el carrito
    cart = [];
    saveCartToLocalStorage();
    updateCartDisplay();
    updateCartBadge();

    // Mostrar mensaje de confirmación
    alert("Pedido procesado. ¡Gracias por su compra!");
});
