document.addEventListener('DOMContentLoaded', () => {
    fetchEquipment();

    document.getElementById('applyFiltersBtn').addEventListener('click', () => {
        fetchEquipment();
    });
});

async function fetchEquipment() {
    const search = document.getElementById('search').value;
    const category = document.getElementById('categoryFilter').value;
    const sort = document.getElementById('sortFilter').value;

    let url = `/api/equipment?sort=${sort}`;
    if (search) url += `&search=${search}`;
    if (category) url += `&category=${category}`;

    const container = document.getElementById('equipment-container');
    container.innerHTML = '<div class="col-12 text-center py-5"><div class="spinner-border text-orange" role="status"></div><p class="mt-2 text-muted">Loading...</p></div>';

    try {
        const res = await fetch(url);
        const data = await res.json();

        container.innerHTML = '';

        if (data.success && data.data.length > 0) {
            data.data.forEach(item => {
                const isAvailable = item.totalQuantity > 0;
                
                const col = document.createElement('div');
                col.className = 'col-md-6 col-lg-4 d-flex align-items-stretch';
                col.innerHTML = `
                    <div class="card w-100">
                        <span class="badge-category">${item.category}</span>
                        <img src="${item.image}" class="card-img-top" alt="${item.name}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title fw-bold text-primary">${item.name}</h5>
                            <p class="card-text text-muted flex-grow-1 small">${item.description}</p>
                            <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                                <div>
                                    <span class="badge ${isAvailable ? 'bg-success' : 'bg-danger'} mb-1">
                                        ${isAvailable ? 'Available' : 'Out of Stock'}
                                    </span><br>
                                    <small class="text-muted fw-bold">Stock: ${item.totalQuantity}</small>
                                </div>
                                <button onclick="bookEquipment('${item._id}')" class="btn btn-primary" ${!isAvailable ? 'disabled' : ''}>
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(col);
            });
        } else {
            container.innerHTML = '<div class="col-12 text-center py-5"><h4 class="text-muted">No equipment found matching your criteria.</h4></div>';
        }
    } catch (err) {
        console.error(err);
        container.innerHTML = '<div class="col-12 text-center py-5"><h4 class="text-danger">Error loading equipment.</h4></div>';
    }
}

function bookEquipment(id) {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    window.location.href = `booking.html?id=${id}`;
}
