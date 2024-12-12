document.getElementById('searchButton').addEventListener('click', function () {
    const searchInput = document.getElementById('searchInput');
    searchInput.classList.toggle('open');
    searchInput.focus();
});



document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.dataset.product;
            const price = parseFloat(button.dataset.price);
            const image = button.dataset.image;

            // Check if item already exists in the cart
            const existingItem = cart.find(item => item.product === product);
            if (existingItem) {
                existingItem.quantity += 1; // Increase quantity
            } else {
                // Add new item to cart
                cart.push({ product, price, image, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
            alert(`${product} added to cart!`);
        });
    });
});