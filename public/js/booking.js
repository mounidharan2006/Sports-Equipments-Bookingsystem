document.addEventListener('DOMContentLoaded', async () => {
    // Check Auth manually since main.js might not finish in time
    try {
        const authRes = await fetch('/api/auth/me');
        const authData = await authRes.json();
        if (!authData.success) {
            window.location.href = 'login.html';
            return;
        }

        // Get equipment ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const eqId = urlParams.get('id');

        if (!eqId) {
            window.location.href = 'equipment.html';
            return;
        }

        // Fetch equipment details
        const res = await fetch(`/api/equipment/${eqId}`);
        const data = await res.json();

        if (data.success) {
            const eq = data.data;
            document.getElementById('equipmentId').value = eq._id;
            
            // Set min date to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('startDate').min = today;
            document.getElementById('endDate').min = today;

            // Show equipment info
            document.getElementById('equipment-details').classList.remove('d-none');
            document.getElementById('eq-name').innerText = eq.name;
            document.getElementById('eq-cat').innerText = eq.category;
            document.getElementById('eq-img').src = eq.image;
            document.getElementById('eq-stock').innerHTML = `<i class="fa-solid fa-box text-orange me-1"></i> Max Stock: ${eq.totalQuantity}`;
            
            document.getElementById('quantity').max = eq.totalQuantity;
        } else {
            showAlert('Equipment not found', 'danger', 'alert-container');
        }

    } catch (err) {
        window.location.href = 'login.html';
    }

    // Handle form submission
    document.getElementById('booking-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('submit-btn');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';

        const payload = {
            equipmentId: document.getElementById('equipmentId').value,
            quantity: document.getElementById('quantity').value,
            purpose: document.getElementById('purpose').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            notes: document.getElementById('notes').value
        };

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();

            if (data.success) {
                showAlert(`Booking created successfully! Ref: ${data.data.bookingReference}`, 'success', 'alert-container');
                setTimeout(() => {
                    window.location.href = 'my-bookings.html';
                }, 2000);
            } else {
                showAlert(data.error, 'danger', 'alert-container');
                btn.disabled = false;
                btn.innerText = 'Confirm Booking';
            }
        } catch (err) {
            showAlert('Server error while processing booking.', 'danger', 'alert-container');
            btn.disabled = false;
            btn.innerText = 'Confirm Booking';
        }
    });

    // Date validation
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');

    startDate.addEventListener('change', () => {
        endDate.min = startDate.value;
        if(endDate.value && endDate.value < startDate.value) {
            endDate.value = startDate.value;
        }
    });
});
