// Global Auth State
let currentUser = null;

// Check if user is logged in
async function checkAuth() {
    try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        
        if (data.success) {
            currentUser = data.data;
            document.querySelectorAll('.auth-hide').forEach(el => el.classList.add('d-none'));
            document.querySelectorAll('.auth-show').forEach(el => el.classList.remove('d-none'));
        } else {
            document.querySelectorAll('.auth-hide').forEach(el => el.classList.remove('d-none'));
            document.querySelectorAll('.auth-show').forEach(el => el.classList.add('d-none'));
        }
    } catch (err) {
        console.error(err);
    }
}

// Logout functionality
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });
            if (res.ok) {
                window.location.href = 'index.html';
            }
        } catch (err) {
            console.error(err);
        }
    });
}

// Initial auth check
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

// Utility: Show alerts
function showAlert(message, type = 'danger', containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}
