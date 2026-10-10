document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/api/users/profile');
        const data = await res.json();
        
        if (!data.success) {
            window.location.href = 'login.html';
            return;
        }

        const user = data.data;
        document.getElementById('user-name-nav').innerText = user.fullName;
        
        // Populate form
        document.getElementById('display-name').innerText = user.fullName;
        document.getElementById('display-reg').innerText = user.registerNumber;
        
        document.getElementById('fullName').value = user.fullName;
        document.getElementById('registerNumber').value = user.registerNumber;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone;
        document.getElementById('department').value = user.department;
        document.getElementById('yearOfStudy').value = user.yearOfStudy;

    } catch (err) {
        window.location.href = 'login.html';
    }

    // Handle form submission
    document.getElementById('profile-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('save-btn');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...';

        const payload = {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            department: document.getElementById('department').value,
            yearOfStudy: document.getElementById('yearOfStudy').value
        };

        try {
            const res = await fetch('/api/users/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();

            if (data.success) {
                showAlert('Profile updated successfully', 'success', 'alert-container');
                document.getElementById('display-name').innerText = data.data.fullName;
                document.getElementById('user-name-nav').innerText = data.data.fullName;
            } else {
                showAlert(data.error, 'danger', 'alert-container');
            }
        } catch (err) {
            showAlert('Error updating profile', 'danger', 'alert-container');
        } finally {
            btn.disabled = false;
            btn.innerText = 'Save Changes';
        }
    });
});
