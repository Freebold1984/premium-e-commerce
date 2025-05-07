// Sample product data
const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299.99,
        description: "High-quality wireless headphones with noise cancellation",
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
        isPremium: true
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        price: 199.99,
        description: "Track your fitness goals with this premium smartwatch",
        image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
        isPremium: true
    },
    {
        id: 3,
        name: "Leather Laptop Bag",
        price: 149.99,
        description: "Stylish and durable laptop bag made from genuine leather",
        image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
        isPremium: false
    }
];

// Function to render products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-semibold">${product.name}</h3>
                    ${product.isPremium ? '<span class="bg-indigo-600 text-white px-2 py-1 rounded-full text-xs">Premium</span>' : ''}
                </div>
                <p class="text-gray-600 text-sm mb-4">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-lg font-bold">$${product.price.toFixed(2)}</span>
                    <button 
                        onclick="addToCart(${product.id})"
                        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Initialize products when DOM is loaded
document.addEventListener('DOMContentLoaded', renderProducts);
