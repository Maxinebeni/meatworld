import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvuKkg5IQPqYn0go654CvbqY53lS5S9LU",
    authDomain: "meatworld-1c268.firebaseapp.com",
    projectId: "meatworld-1c268",
    storageBucket: "meatworld-1c268.appspot.com",
    messagingSenderId: "465780803794",
    appId: "1:465780803794:web:b62a3f55cec2b0cc3e450b"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired.');

    // Handle toggling between modals
    const showSignupModal = document.getElementById('showSignupModal');
    if (showSignupModal) {
        showSignupModal.addEventListener('click', function() {
            $('#loginModal').modal('hide');
            $('#signupModal').modal('show');
        });
    } else {
        console.error('Element with ID "showSignupModal" not found.');
    }

    const showLoginModal = document.getElementById('showLoginModal');
    if (showLoginModal) {
        showLoginModal.addEventListener('click', function() {
            $('#signupModal').modal('hide');
            $('#loginModal').modal('show');
        });
    } else {
        console.error('Element with ID "showLoginModal" not found.');
    }

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate password strength
    function isStrongPassword(password) {
        // Password must be at least 8 characters long and contain at least one letter, one number, and one special character
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordRegex.test(password);
    }

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Clear previous error messages
            clearLoginErrors();

            // Validate email
            if (!isValidEmail(email)) {
                showLoginError('login-email-error', 'Invalid email format');
                return;
            }

            // Validate password
            if (!isStrongPassword(password)) {
                showLoginError('login-password-error', 'Password must be at least 8 characters long and contain letters, numbers, and special characters');
                return;
            }

            // Attempt login
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    const username = user.email.split('@')[0]; // Extract username from email
                    updateHeaderWithUsername(username); // Update header with username
                    alert('Login successful');
                    // Redirect to another page or update UI
                })
                .catch((error) => {
                    showLoginError('login-password-error', 'Error: ' + error.message);
                });
        });
    } else {
        console.error('Element with ID "login-form" not found.');
    }

    // Signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;

            // Clear previous error messages
            clearSignupErrors();

            // Validate email
            if (!isValidEmail(email)) {
                showSignupError('signup-email-error', 'Invalid email format');
                return;
            }

            // Validate password
            if (!isStrongPassword(password)) {
                showSignupError('signup-password-error', 'Password must be at least 8 characters long and contain letters, numbers, and special characters');
                return;
            }

            // Check if passwords match
            if (password !== confirmPassword) {
                showSignupError('signup-confirm-password-error', 'Passwords do not match');
                return;
            }

            // Attempt signup
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    const username = user.email.split('@')[0]; // Extract username from email
                    updateHeaderWithUsername(username); // Update header with username
                    alert('Signup successful');
                    // Redirect to another page or update UI
                })
                .catch((error) => {
                    showSignupError('signup-password-error', 'Error: ' + error.message);
                });
        });
    } else {
        console.error('Element with ID "signup-form" not found.');
    }

    // Function to update header with username
    function updateHeaderWithUsername(username) {
        const loginLink = document.getElementById('loginLink');
        if (loginLink) {
            loginLink.textContent = `Hello, ${username}!`;
        }
    }
    // Function to show login form errors
    function showLoginError(elementId, errorMessage) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = errorMessage;
        errorElement.style.color = 'red';
    }

    // Function to show signup form errors
    function showSignupError(elementId, errorMessage) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = errorMessage;
        errorElement.style.color = 'red';
    }

    // Function to clear login form errors
    function clearLoginErrors() {
        const emailErrorElement = document.getElementById('login-email-error');
        const passwordErrorElement = document.getElementById('login-password-error');
        emailErrorElement.textContent = '';
        passwordErrorElement.textContent = '';
    }

    // Function to clear signup form errors
    function clearSignupErrors() {
        const emailErrorElement = document.getElementById('signup-email-error');
        const passwordErrorElement = document.getElementById('signup-password-error');
        const confirmPasswordErrorElement = document.getElementById('signup-confirm-password-error');
        emailErrorElement.textContent = '';
        passwordErrorElement.textContent = '';
        confirmPasswordErrorElement.textContent = '';
    }
});
