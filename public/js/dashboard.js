document.addEventListener('DOMContentLoaded', async () => {
    // Check Auth manually since main.js might not finish in time
    try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        
        if (!data.success) {
            window.location.href = 'login.html';
            return;
        }

        document.getElementById('user-name-nav').innerText = data.data.fullName;

        // Fetch bookings for stats
        fetchDashboardData();
    } catch (err) {
        window.location.href = 'login.html';
    }
});

async function fetchDashboardData() {
    try {
        const res = await fetch('/api/bookings/my');
        const data = await res.json();

        if (data.success) {
            const bookings = data.data;
            
            // Calculate stats
            document.getElementById('stat-total').innerText = bookings.length;
            document.getElementById('stat-pending').innerText = bookings.filter(b => b.status === 'Pending').length;
            document.getElementById('stat-active').innerText = bookings.filter(b => b.status === 'Active' || b.status === 'Approved').length;

            // Render Recent Bookings (top 5)
            const tbody = document.getElementById('recent-bookings-list');
            tbody.innerHTML = '';

            if (bookings.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No bookings found. <a href="equipment.html">Book now!</a></td></tr>';
                return;
            }

            const recent = bookings.slice(0, 5);
            recent.forEach(b => {
                const badgeClass = b.status === 'Pending' ? 'bg-warning' : 
                                  (b.status === 'Approved' || b.status === 'Active') ? 'bg-success' : 
                                  (b.status === 'Rejected' || b.status === 'Cancelled') ? 'bg-danger' : 'bg-secondary';
                
                const sDate = new Date(b.startDate).toLocaleDateString();
                const eDate = new Date(b.endDate).toLocaleDateString();

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${b.bookingReference}</strong></td>
                    <td>
                        <div class="d-flex align-items-center">
                            ${b.equipmentId ? `<span class="fw-medium">${b.equipmentId.name}</span> <small class="text-muted ms-2">x${b.quantity}</small>` : 'Equipment Deleted'}
                        </div>
                    </td>
                    <td>${sDate} to ${eDate}</td>
                    <td><span class="badge ${badgeClass}">${b.status}</span></td>
                    <td><a href="my-bookings.html" class="btn btn-sm btn-outline-primary">View</a></td>
                `;
                tbody.appendChild(tr);
            });
        }
    } catch (err) {
        console.error('Failed to load dashboard data', err);
        document.getElementById('recent-bookings-list').innerHTML = '<tr><td colspan="5" class="text-center text-danger">Failed to load data.</td></tr>';
    }
}
