// Cart state
let cart = [];
let isCartOpen = false;

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCartUI();
    showCartNotification();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="flex items-center space-x-4">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
            <div class="flex-1">
                <h4 class="font-semibold">${item.name}</h4>
                <div class="flex items-center space-x-2">
                    <button onclick="updateQuantity(${item.id}, -1)" class="text-gray-500 hover:text-gray-700">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="text-gray-500 hover:text-gray-700">+</button>
                </div>
            </div>
            <div class="text-right">
                <p class="font-semibold">$${(item.price * item.quantity).toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function showCartNotification() {
    // Add animation to cart icon
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.classList.add('animate-bounce');
    setTimeout(() => cartBtn.classList.remove('animate-bounce'), 1000);
}

// Cart visibility toggle
document.getElementById('cartBtn').addEventListener('click', () => {
    const cartSidebar = document.getElementById('cartSidebar');
    isCartOpen = !isCartOpen;
    cartSidebar.style.transform = isCartOpen ? 'translateX(0)' : 'translateX(100%)';
});

document.getElementById('closeCart').addEventListener('click', () => {
    const cartSidebar = document.getElementById('cartSidebar');
    isCartOpen = false;
    cartSidebar.style.transform = 'translateX(100%)';
});

// Initialize cart UI
document.addEventListener('DOMContentLoaded', updateCartUI);
