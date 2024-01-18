// Variables globales
let products = [];
let cart = [];

// Cargar el carrito desde localStorage al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    const productId = getProductIdFromUrl();
    setProductIdInputValue(productId);
});


document.getElementById('add-to-cart-button').addEventListener('click', () => {
    console.log('El botón de añadir al carrito fue clickeado'); // Esto debería aparecer en la consola.
    const element = document.getElementById('product-quantity');
    console.log(element); // Esto debería mostrar el elemento, no `null`.
    

    const productId = parseInt(document.getElementById('product-id').value);
    const quantity = parseInt(document.getElementById('product-quantity').value, 10);
    const product = products.find(p => p.id === productId);

    if (product && quantity > 0) {
        const existingProduct = cart.find(p => p.id === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            const newProduct = {
                ...product,
                quantity: quantity
            };
            // Aquí asumimos que el precio es un string, así que lo convertimos a número
            newProduct.price = parseFloat(newProduct.price.replace('€', ''));
            cart.push(newProduct);
        }
        updateCartPanelDisplay();
        updateCartBadge();
        saveCartToLocalStorage();
    } else {
        console.error('Producto no encontrado o cantidad inválida');
    }
});



// Eventos para mostrar/ocultar el panel del carrito
document.getElementById('cart-container').addEventListener('mouseenter', () => {
    document.getElementById('cart-panel').style.display = 'block';
});

document.getElementById('cart-container').addEventListener('mouseleave', () => {
    document.getElementById('cart-panel').style.display = 'none';
});

// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(productId, newQuantity) {
    // Encuentra el producto en el carrito usando su id
    const productIndex = cart.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        // Actualiza la cantidad del producto
        cart[productIndex].quantity = newQuantity;
        // Si la nueva cantidad es 0, eliminar el producto del carrito
        if (newQuantity === 0) {
            removeFromCart(productId);
        } else {
            // Guardar los cambios en el carrito
            saveCartToLocalStorage();
            // Actualizar la visualización del carrito
            updateCartPanelDisplay();
        }
    }
}

function updateCartPanelDisplay() {
    const cartPanelItemsContainer = document.getElementById('cart-panel-items');
    cartPanelItemsContainer.innerHTML = '';

    let total = 0;
    cart.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');

        // Crear el elemento para mostrar la cantidad
        const quantityDisplay = document.createElement('span');
        quantityDisplay.className = 'quantity-display';
        quantityDisplay.textContent = product.quantity; // Establece el texto inicial con la cantidad actual

        // Crear el elemento select y sus opciones
        const quantitySelect = document.createElement('select');
        quantitySelect.id = `quantity-select-${product.id}`;
        quantitySelect.name = `quantity-${product.id}`;
        quantitySelect.className = 'quantity-select';
        for (let i = 0; i <= 10; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            option.selected = i === product.quantity;
            quantitySelect.appendChild(option);
        }

        // Evento onchange para el select
        quantitySelect.onchange = function() {
            const newQuantity = parseInt(this.value, 10);
            quantityDisplay.textContent = newQuantity; // Actualiza el texto al cambiar la selección
            updateQuantity(product.id, newQuantity);
        };

        // Construcción del HTML del elemento del producto
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" />
            <div class="product-details">
                <h4>${product.name}</h4>
                <div class="cart-item-details">
                    <span class="price">${(product.price * product.quantity).toFixed(2)} €</span>
                </div>
            </div>
        `;
        
        // Añadir el display de cantidad y el select al elemento del producto
        const detailsContainer = productElement.querySelector('.cart-item-details');
        detailsContainer.appendChild(quantityDisplay);
        detailsContainer.appendChild(quantitySelect);

        // Agregar el botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('remove-item');
        deleteButton.textContent = 'X';
        deleteButton.onclick = () => removeFromCart(product.id);
        productElement.appendChild(deleteButton);

        // Añadir el producto al contenedor
        cartPanelItemsContainer.appendChild(productElement);

        // Actualizar el total
        total += product.price * product.quantity;
    });

    // Mostrar el total
    document.getElementById('total-cart-panel').innerText = `Total: ${total.toFixed(2)} €`;
}


// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(productId, newQuantity) {
    const productIndex = cart.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        cart[productIndex].quantity = newQuantity;
        updateCartPanelDisplay();
        saveCartToLocalStorage();
    }
}

// Función para eliminar producto del carrito
function removeFromCart(productId) {
    const productIndex = cart.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        updateCartPanelDisplay();
        updateCartBadge();
        saveCartToLocalStorage();
    }
}

// Cargar productos y configurar página
fetch('assets/json/ID_product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        // Asumimos que quieres actualizar el panel al cargar los productos
        updateCartPanelDisplay();
    })
    .catch(error => console.error('Error loading products:', error));

function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function setProductIdInputValue(productId) {
    const productIdInput = document.getElementById('product-id');
    if (productIdInput) {
        productIdInput.value = productId;
    }
}

// Actualizar badge del carrito
function updateCartBadge() {
    const cartBadge = document.querySelector('.nav-icon .badge');
    const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
    cartBadge.textContent = totalQuantity;
}


function removeFromCart(productIndex) {
    cart.splice(productIndex, 1);
    updateCartPanelDisplay();
    updateCartBadge();
    saveCartToLocalStorage();
}

// Funciones para manejar el LocalStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartPanelDisplay();
        updateCartBadge();
    }
}

// Llamadas a las funciones de actualización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    updateCartPanelDisplay();
    updateCartBadge();
});
