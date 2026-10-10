document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        
        if (!data.success) {
            window.location.href = 'login.html';
            return;
        }
        document.getElementById('user-name-nav').innerText = data.data.fullName;
        
        loadBookings();
    } catch (err) {
        window.location.href = 'login.html';
    }
});

async function loadBookings() {
    const tbody = document.getElementById('bookings-table-body');
    
    try {
        const res = await fetch('/api/bookings/my');
        const data = await res.json();

        if (data.success) {
            if (data.data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">You have no bookings. <a href="equipment.html" class="text-orange fw-bold">Book equipment now</a></td></tr>';
                return;
            }

            tbody.innerHTML = '';
            data.data.forEach(b => {
                const badgeClass = b.status === 'Pending' ? 'bg-warning text-dark' : 
                                  (b.status === 'Approved' || b.status === 'Active') ? 'bg-success' : 
                                  (b.status === 'Rejected' || b.status === 'Cancelled') ? 'bg-danger' : 'bg-secondary';
                
                const sDate = new Date(b.startDate).toLocaleDateString();
                const eDate = new Date(b.endDate).toLocaleDateString();
                
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${b.bookingReference}</strong></td>
                    <td>
                        <div class="d-flex align-items-center">
                            ${b.equipmentId ? `
                                <img src="${b.equipmentId.image}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 5px;" class="me-2 d-none d-md-block">
                                <div>
                                    <span class="fw-bold">${b.equipmentId.name}</span><br>
                                    <small class="badge bg-light text-dark border">${b.equipmentId.category}</small>
                                </div>
                            ` : '<span class="text-danger">Equipment Deleted</span>'}
                        </div>
                    </td>
                    <td class="text-center fw-bold">${b.quantity}</td>
                    <td>
                        <div class="small">
                            <div class="text-muted">From: <span class="text-dark fw-medium">${sDate}</span></div>
                            <div class="text-muted">To: <span class="text-dark fw-medium">${eDate}</span></div>
                        </div>
                    </td>
                    <td><span class="badge ${badgeClass} fs-6">${b.status}</span></td>
                    <td>
                        ${(b.status !== 'Completed' && b.status !== 'Cancelled' && b.status !== 'Rejected') ? 
                            `<button onclick="cancelBooking('${b._id}')" class="btn btn-sm btn-outline-danger"><i class="fa-solid fa-xmark me-1"></i>Cancel</button>` 
                            : `<button class="btn btn-sm btn-outline-secondary" disabled>No Action</button>`
                        }
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
    } catch (err) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-danger">Failed to load bookings.</td></tr>';
    }
}

async function cancelBooking(id) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
        const res = await fetch(`/api/bookings/${id}/cancel`, {
            method: 'PATCH'
        });
        const data = await res.json();

        if (data.success) {
            showAlert('Booking cancelled successfully', 'success', 'alert-container');
            loadBookings();
        } else {
            showAlert(data.error, 'danger', 'alert-container');
        }
    } catch (err) {
        showAlert('Error cancelling booking', 'danger', 'alert-container');
    }
}
