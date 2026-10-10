document.addEventListener('DOMContentLoaded', () => {
    // Register Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('reg-btn');
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Registering...';

            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'danger', 'alert-container');
                btn.disabled = false;
                btn.innerText = 'Register';
                return;
            }

            const payload = {
                fullName: document.getElementById('fullName').value,
                registerNumber: document.getElementById('registerNumber').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                department: document.getElementById('department').value,
                yearOfStudy: document.getElementById('yearOfStudy').value,
                password
            };

            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();

                if (data.success) {
                    showAlert('Registration successful! Redirecting to login...', 'success', 'alert-container');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                } else {
                    showAlert(data.error, 'danger', 'alert-container');
                    btn.disabled = false;
                    btn.innerText = 'Register';
                }
            } catch (err) {
                showAlert('Server error. Please try again later.', 'danger', 'alert-container');
                btn.disabled = false;
                btn.innerText = 'Register';
            }
        });
    }

    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('login-btn');
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Logging in...';

            const payload = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };

            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();

                if (data.success) {
                    if (data.user.role === 'admin') {
                        window.location.href = 'admin-dashboard.html';
                    } else {
                        window.location.href = 'dashboard.html';
                    }
                } else {
                    showAlert(data.error, 'danger', 'alert-container');
                    btn.disabled = false;
                    btn.innerText = 'Log In';
                }
            } catch (err) {
                showAlert('Server error. Please try again later.', 'danger', 'alert-container');
                btn.disabled = false;
                btn.innerText = 'Log In';
            }
        });

        // Toggle Password Visibility
        const togglePassword = document.getElementById('toggle-password');
        const passwordInput = document.getElementById('password');
        const eyeIcon = document.getElementById('eye-icon');

        if(togglePassword) {
            togglePassword.addEventListener('click', () => {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                eyeIcon.classList.toggle('fa-eye');
                eyeIcon.classList.toggle('fa-eye-slash');
            });
        }
    }
});
