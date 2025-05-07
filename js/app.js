// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Modal handling
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const loginForm = document.getElementById('loginForm');

    if (loginBtn && loginModal && closeLoginModal && loginForm) {
        // Show login modal
        loginBtn.addEventListener('click', () => {
            console.log('Login button clicked');
            loginModal.style.display = 'flex';
            loginModal.classList.remove('hidden');
        });

        // Close login modal
        closeLoginModal.addEventListener('click', () => {
            loginModal.style.display = 'none';
            loginModal.classList.add('hidden');
            // Clear form on close
            loginForm.reset();
        });

        // Close modal when clicking outside
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
                loginModal.classList.add('hidden');
                // Clear form on close
                loginForm.reset();
            }
        });

        // Handle login form submission
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.querySelector('input[type="checkbox"]').checked;

            // Basic validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }

            if (password.length < 8) {
                alert('Password must be at least 8 characters long');
                return;
            }

            // TODO: In a real app, this would make an API call to authenticate
            console.log('Login attempt:', { email, rememberMe });
            
            // Simulate successful login
            isAuthenticated = true;
            isPremiumUser = false; // Set based on user data from backend
            
            // Update UI
            updateAuthUI();
            
            // Close modal
            loginModal.style.display = 'none';
            loginModal.classList.add('hidden');
            
            // Show success message
            alert('Successfully logged in!');
            
            // Clear form
            loginForm.reset();
        });
    }

    // Premium subscription button
    const subscribeBtn = document.getElementById('subscribeBtn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            if (!isAuthenticated) {
                alert('Please log in first to access premium features');
                loginBtn.click(); // Open login modal
                return;
            }
            // TODO: Implement subscription flow
            alert('Premium subscription will be implemented with payment gateway integration');
        });
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (!isAuthenticated) {
                alert('Please log in first to checkout');
                loginBtn.click(); // Open login modal
                return;
            }
            
            if (cart.length === 0) {
                alert('Your cart is empty');
                return;
            }
            // TODO: Implement checkout flow
            alert('Checkout will be implemented with payment gateway integration');
        });
    }
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Handle user authentication state
let isAuthenticated = false;
let isPremiumUser = false;

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.textContent = isAuthenticated ? 'Profile' : 'Login';
    }
    
    // Update cart and checkout buttons
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.disabled = !isAuthenticated;
    }
    
    // Update premium content
    const premiumContent = document.querySelectorAll('.premium-content');
    premiumContent.forEach(element => {
        if (isPremiumUser) {
            element.classList.remove('blur-sm');
            element.classList.remove('pointer-events-none');
        } else {
            element.classList.add('blur-sm');
            element.classList.add('pointer-events-none');
        }
    });
}

// Initialize UI states
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
});
