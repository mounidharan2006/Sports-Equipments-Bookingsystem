document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        
        if (!data.success || data.data.role !== 'admin') {
            window.location.href = 'login.html';
            return;
        }

        document.getElementById('user-name-nav').innerText = data.data.fullName;
        
        loadAdminBookings();
    } catch (err) {
        window.location.href = 'login.html';
    }
});

async function loadAdminBookings() {
    const tbody = document.getElementById('admin-bookings-list');
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-5"><div class="spinner-border text-warning" role="status"></div></td></tr>';
    
    try {
        const res = await fetch('/api/bookings/admin/all');
        const data = await res.json();

        if (data.success) {
            if (data.data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No bookings found.</td></tr>';
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
                    <td><strong>${b.bookingReference}</strong><br><small class="text-muted">${b.purpose}</small></td>
                    <td>
                        <div class="fw-bold">${b.user ? b.user.fullName : 'Unknown User'}</div>
                        <small class="text-muted">${b.user ? b.user.registerNumber : ''}</small>
                    </td>
                    <td>
                        <div class="fw-bold">${b.equipmentId ? b.equipmentId.name : 'Unknown'}</div>
                        <small class="text-muted">Qty: ${b.quantity}</small>
                    </td>
                    <td>
                        <div class="small">
                            <div>${sDate}</div>
                            <div>to ${eDate}</div>
                        </div>
                    </td>
                    <td><span class="badge ${badgeClass}">${b.status}</span></td>
                    <td>
                        ${b.status === 'Pending' ? `
                            <div class="btn-group btn-group-sm">
                                <button onclick="updateStatus('${b._id}', 'Approved')" class="btn btn-success" title="Approve"><i class="fa-solid fa-check"></i></button>
                                <button onclick="updateStatus('${b._id}', 'Rejected')" class="btn btn-danger" title="Reject"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                        ` : `
                            <select class="form-select form-select-sm" onchange="updateStatus('${b._id}', this.value)" style="width: 110px;">
                                <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                <option value="Approved" ${b.status === 'Approved' ? 'selected' : ''}>Approved</option>
                                <option value="Active" ${b.status === 'Active' ? 'selected' : ''}>Active</option>
                                <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
                                <option value="Rejected" ${b.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                                <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                            </select>
                        `}
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
    } catch (err) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-danger">Failed to load bookings.</td></tr>';
    }
}

async function updateStatus(id, newStatus) {
    if (!confirm(`Change booking status to ${newStatus}?`)) return;

    try {
        const res = await fetch(`/api/bookings/admin/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        const data = await res.json();

        if (data.success) {
            showAlert(`Booking status updated to ${newStatus}`, 'success', 'alert-container');
            loadAdminBookings();
        } else {
            showAlert(data.error, 'danger', 'alert-container');
        }
    } catch (err) {
        showAlert('Error updating booking', 'danger', 'alert-container');
    }
}
