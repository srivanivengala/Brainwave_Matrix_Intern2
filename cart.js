document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Clear cart display
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p id="empty-cart">Your cart is empty.</p>';
            cartTotalElement.textContent = '0.00';
            return;
        }

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.product}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.product}</h4>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="decrease-btn" data-index="${index}">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="increase-btn" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotalElement.textContent = total.toFixed(2);
    }

    // Event listener for quantity increase and decrease
    cartItemsContainer.addEventListener('click', (event) => {
        const index = parseInt(event.target.dataset.index, 10);

        if (event.target.classList.contains('increase-btn')) {
            cart[index].quantity += 1; // Increase quantity
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }

        if (event.target.classList.contains('decrease-btn')) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1; // Decrease quantity
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            } else {
                alert("Quantity cannot be less than 1.");
            }
        }
    });

    // Remove item from cart
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const index = parseInt(event.target.dataset.index, 10);
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
            renderCart();
        }
    });

    // Checkout functionality
    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Thank you for your purchase!');
            localStorage.removeItem('cart'); // Clear cart
            location.reload();
        } else {
            alert('Your cart is empty.');
        }
    });

    renderCart(); // Initial render
});