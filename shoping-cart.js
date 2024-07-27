import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';

// Function to load cart items
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const cartPrice = document.getElementById('cart-price');
    const handlingFee = 1500;
    let total = 0;
    let itemCount = 0;

    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemCount += parseInt(item.quantity);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="shoping__cart__item">
                <h5>${item.name}</h5>
            </td>
            <td class="shoping__cart__price">
                RWF ${item.price.toLocaleString()}
            </td>
            <td class="shoping__cart__quantity">
                <div class="quantity">
                    <div class="pro-qty">
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                    </div>
                </div>
            </td>
            <td class="shoping__cart__total" id="item-total-${index}">
                RWF ${itemTotal.toLocaleString()}
            </td>
            <td class="shoping__cart__item__close">
                <span class="icon_close" onclick="removeFromCart(${index})"></span>
            </td>
        `;
        cartItems.appendChild(row);
    });

    const grandTotal = total + handlingFee;

    cartTotal.innerHTML = `
        <li>Subtotal <span>RWF ${total.toLocaleString()}</span></li>
        <li>Handling Fee <span>RWF ${handlingFee.toLocaleString()}</span></li>
        <li>Total <span id="grand-total">RWF ${grandTotal.toLocaleString()}</span></li>
    `;

    cartCount.textContent = itemCount;
    cartPrice.textContent = `RWF ${grandTotal.toLocaleString()}`;
}

// Function to remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Function to update quantity
function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(quantity);

    // Update the item total for the changed quantity
    const itemTotal = cart[index].price * cart[index].quantity;
    document.getElementById(`item-total-${index}`).textContent = `RWF ${itemTotal.toLocaleString()}`;

    // Update the local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Recalculate the total price
    let total = 0;
    cart.forEach((item) => {
        total += item.price * item.quantity;
    });
    
    // Update the total price HTML elements
    const cartTotal = document.getElementById('cart-total');
    const cartPrice = document.getElementById('cart-price');
    const handlingFee = 1500;
    const grandTotal = total + handlingFee; // Add handling fee
    cartTotal.innerHTML = `
        <li>Subtotal <span>RWF ${total.toLocaleString()}</span></li>
        <li>Handling Fee <span>RWF 1500</span></li>
        <li>Total <span id="grand-total">RWF ${grandTotal.toLocaleString()}</span></li>
    `;
    cartPrice.textContent = `RWF ${grandTotal.toLocaleString()}`;
}

// Function to update the cart
function updateCart() {
    loadCart();
}

// Attach functions to the window object to make them globally accessible
window.updateQuantity = updateQuantity;
window.updateCart = updateCart;
window.removeFromCart = removeFromCart;

// Load cart items when the window is loaded
window.onload = loadCart;

// Check if user is logged in before proceeding to checkout
document.getElementById('proceed-to-checkout').addEventListener('click', function(event) {
    event.preventDefault();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is logged in, proceed to checkout
            window.location.href = 'checkout.html';
        } else {
            // User is not logged in, display login modal
            document.getElementById('login-alert').style.display = 'block';
            showLoginModal();
        }
    });
});

// Function to check if the user is logged in
function isLoggedIn() {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

// Function to show login modal
function showLoginModal() {
    // Implement the logic to show your login modal here
    $('#loginModal').modal('show');
}
