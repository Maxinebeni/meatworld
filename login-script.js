import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

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

    
    const greetingSection = document.getElementById('greetingSection');
    const greetingText = document.getElementById('greetingText');

    function updateGreetingMessage(user) {
        const email = user.email;
        const username = email.split('@')[0]; // Extract the first part of the email address
        greetingText.innerHTML = `<h2>Hello, ${username}! Start shopping now!</h2>`;
        greetingSection.style.display = 'block';
    }

    function hideGreetingMessage() {
        greetingSection.style.display = 'none';
    }

    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            updateGreetingMessage(user);
        } else {
            hideGreetingMessage();
        }
    });


    // Handle toggling between modals
    document.getElementById('showSignupModal').addEventListener('click', function() {
        $('#loginModal').modal('hide');
        $('#signupModal').modal('show');
    });

    document.getElementById('showLoginModal').addEventListener('click', function() {
        $('#signupModal').modal('hide');
        $('#loginModal').modal('show');
    });

    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate password strength
    function isStrongPassword(password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordRegex.test(password);
    }

    // Login form submission
    document.getElementById('login-form').addEventListener('submit', function(event) {
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
                const user = userCredential.user;
                updateHeaderWithUsername(user); // Update header with username
                alert('Login successful');
                $('#loginModal').modal('hide'); // Hide login modal
            })
            .catch((error) => {
                showLoginError('login-password-error', 'Error: ' + error.message);
            });
    });

    // Signup form submission
    document.getElementById('signup-form').addEventListener('submit', function(event) {
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
                const user = userCredential.user;
                updateHeaderWithUsername(user); // Update header with username
                alert('Signup successful');
                $('#signupModal').modal('hide'); // Hide signup modal
            })
            .catch((error) => {
                showSignupError('signup-password-error', 'Error: ' + error.message);
            });
    });

    function updateHeaderWithUsername(user) {
        const loginLinks = document.querySelectorAll('#loginLink');
        const email = user.email;
        const username = email.split('@')[0]; // Extract the first part of the email address
        loginLinks.forEach(link => {
            link.textContent = `Hello, ${username}!`;
        });
        // Show the logout link
        document.querySelectorAll('#logoutLink').forEach(link => {
            link.style.display = 'inline';
        });
    }

    function resetHeaderToLogin() {
        const loginLinks = document.querySelectorAll('#loginLink');
        loginLinks.forEach(link => {
            link.textContent = 'Login';
        });
        // Hide the logout link
        document.querySelectorAll('#logoutLink').forEach(link => {
            link.style.display = 'none';
        });
    }

    // Logout functionality
    document.querySelectorAll('#logoutLink').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            signOut(auth).then(() => {
                resetHeaderToLogin();
                alert('Logout successful');
            }).catch((error) => {
                console.error('Error logging out: ', error);
            });
        });
    });

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
        document.getElementById('login-email-error').textContent = '';
        document.getElementById('login-password-error').textContent = '';
    }

    // Function to clear signup form errors
    function clearSignupErrors() {
        document.getElementById('signup-email-error').textContent = '';
        document.getElementById('signup-password-error').textContent = '';
        document.getElementById('signup-confirm-password-error').textContent = '';
    }

    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            updateHeaderWithUsername(user);
        } else {
            resetHeaderToLogin();
        }
    });
});
