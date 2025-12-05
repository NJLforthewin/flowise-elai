// --- CAR DATABASE (10 Units from Excel) ---
const carInventory = [
    {
        id: 1,
        name: "2023 Toyota Vios 1.3 XLE",
        price: "₱650,000",
        type: "Sedan",
        mileage: "12,000 km",
        transmission: "Automatic",
        status: "Available",
        img: "theo-lonic-TkF_mDULpdw-unsplash.jpg"
    },
    {
        id: 2,
        name: "2020 Ford Territory Titanium",
        price: "₱820,000",
        type: "SUV",
        mileage: "35,000 km",
        transmission: "Automatic",
        status: "Reserved",
        img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "2019 Montero Sport GLX",
        price: "₱950,000",
        type: "SUV",
        mileage: "45,000 km",
        transmission: "Manual (Diesel)",
        status: "Available",
        img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "2018 Honda City 1.5 VX",
        price: "₱580,000",
        type: "Sedan",
        mileage: "50,000 km",
        transmission: "Automatic",
        status: "Available",
        img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "2021 Toyota Fortuner G",
        price: "₱1,350,000",
        type: "SUV",
        mileage: "25,000 km",
        transmission: "Automatic",
        status: "Available",
        img: "luke-thornton-O489L_ixvPw-unsplash.jpg"
    },
    {
        id: 6,
        name: "2022 Nissan Navara",
        price: "₱1,100,000",
        type: "Pickup",
        mileage: "18,000 km",
        transmission: "Automatic",
        status: "Available",
        img: "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "2019 Mitsubishi Xpander",
        price: "₱720,000",
        type: "SUV",
        mileage: "42,000 km",
        transmission: "Automatic",
        status: "Reserved",
        img: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "2020 Toyota Wigo G",
        price: "₱450,000",
        type: "Sedan",
        mileage: "30,000 km",
        transmission: "Automatic",
        status: "Available",
        img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        name: "2021 Ford Ranger Raptor",
        price: "₱1,850,000",
        type: "Pickup",
        mileage: "15,000 km",
        transmission: "Automatic",
        status: "Available",
        img: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        name: "2017 Honda CR-V 2.0",
        price: "₱880,000",
        type: "SUV",
        mileage: "55,000 km",
        transmission: "Automatic",
        status: "Available",
        img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80"
    }
];

// --- DISPLAY CARS FUNCTION (Horizontal Row) ---
function displayCars(filterType) {
    const grid = document.getElementById('carGrid');
    grid.innerHTML = ""; 

    const filteredCars = carInventory.filter(car => {
        if (filterType === 'all') return true;
        if (filterType === 'Reserved') return car.status === 'Reserved';
        if (filterType === 'SUV') return car.type === 'SUV';
        if (filterType === 'Sedan') return car.type === 'Sedan';
        if (filterType === 'Pickup') return car.type === 'Pickup';
        return car.type === filterType;
    });

    filteredCars.forEach(car => {
        const statusClass = car.status === "Reserved" ? "reserved" : "";
        
        const carHTML = `
            <div class="car-card">
                <div class="car-img">
                    <img src="${car.img}" alt="${car.name}">
                    <span class="tag ${statusClass}">${car.status}</span>
                </div>
                <div class="car-details">
                    <h3>${car.name}</h3>
                    <div class="specs">
                        <span><i class="fa-solid fa-gauge"></i> ${car.mileage}</span>
                        <span><i class="fa-solid fa-gears"></i> ${car.transmission}</span>
                    </div>
                    <div class="price-row">
                        <span class="price">${car.price}</span>
                        <button class="btn-view" onclick="openModal('${car.name}', '${car.price}', '${car.img}')">View Details</button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += carHTML;
    });
}

// --- NEW FUNCTION: SCROLL THE CARDS ---
function scrollCards(direction) {
    const grid = document.getElementById('carGrid');
    const scrollAmount = 350; // How much to scroll (width of card + gap)
    grid.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });
}

// --- FILTER BUTTON LOGIC ---
function filterCars(category, btnElement) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');
    displayCars(category);
}

// --- LOAN CALCULATOR ---
function calculateLoan() {
    const price = parseFloat(document.getElementById('carPrice').value);
    const downpayment = parseFloat(document.getElementById('downPayment').value);
    const months = parseInt(document.getElementById('loanTerm').value);
    const interestRate = 0.05; 

    if (isNaN(price) || isNaN(downpayment)) {
        alert("Please enter valid numbers");
        return;
    }

    const principal = price - downpayment;
    const totalInterest = principal * (interestRate * (months / 12));
    const totalAmount = principal + totalInterest;
    const monthlyAmortization = totalAmount / months;

    document.getElementById('monthlyResult').innerText = "₱" + monthlyAmortization.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

// --- MODAL POPUP ---
function openModal(carName, price, imgUrl) {
    const modal = document.getElementById('carModal');
    document.getElementById('modalTitle').innerText = carName;
    document.getElementById('modalPrice').innerText = price;
    document.getElementById('modalImg').src = imgUrl;
    modal.style.display = "flex";
}

// Purchase Flow
function showForm() {
    document.getElementById('view-details').style.display = 'none';
    document.getElementById('view-form').style.display = 'block';
}

function backToDetails() {
    document.getElementById('view-form').style.display = 'none';
    document.getElementById('view-details').style.display = 'block';
}

function submitReservation() {
    document.getElementById('view-form').style.display = 'none';
    document.getElementById('view-success').style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('carModal');
    modal.style.display = "none";
    setTimeout(() => {
        document.getElementById('view-details').style.display = 'block';
        document.getElementById('view-form').style.display = 'none';
        document.getElementById('view-success').style.display = 'none';
    }, 500);
}

window.onclick = function(event) {
    const modal = document.getElementById('carModal');
    if (event.target == modal) closeModal();
}

// --- INITIALIZE ---
window.onload = function() {
    displayCars('all');
};