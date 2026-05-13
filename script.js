let userSession = { role: null, name: "" };
let authData = [
    { id: 1, name: "Insp. Ahmad", pos: "Area Supervisor" },
    { id: 2, name: "Sgt. Sarah", pos: "Patrol Lead" }
];

// Handle Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const role = document.getElementById('loginRole').value;
    
    userSession.role = role;
    userSession.name = role === 'admin' ? "System Administrator" : "Logged User";
    
    document.getElementById('login-overlay').classList.add('hidden');
    document.getElementById('dashboard-container').classList.remove('hidden');
    
    updateUI(role);
});

// Update Sidebar and UI based on Role
function updateUI(role) {
    const nav = document.getElementById('nav-menu');
    document.getElementById('user-role-badge').innerText = role;
    document.getElementById('user-display-name').innerText = userSession.name;

    let menuHTML = `<li><a onclick="showSection('sec-hotspot')"><i class="fas fa-fire"></i> Hotspots</a></li>`;
    
    if (role === 'citizen') {
        menuHTML += `<li><a onclick="showSection('sec-report')"><i class="fas fa-plus-circle"></i> Submit Report</a></li>`;
        menuHTML += `<li><a onclick="showSection('sec-profile')"><i class="fas fa-user-cog"></i> My Profile</a></li>`;
    } else if (role === 'authority') {
        menuHTML += `<li><a onclick="showSection('sec-profile')"><i class="fas fa-id-badge"></i> Auth Profile</a></li>`;
    } else if (role === 'admin') {
        menuHTML += `<li><a onclick="showSection('sec-admin')"><i class="fas fa-users-cog"></i> Manage Staff</a></li>`;
    }

    nav.innerHTML = menuHTML;
    showSection('sec-hotspot');
}

function showSection(id) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    document.getElementById('page-title').innerText = id.replace('sec-', '').toUpperCase();
    
    if(id === 'sec-admin') renderAuthTable();
}

// "Others" Logic
function checkOtherCategory(select) {
    const otherInput = document.getElementById('other_cat_name');
    if (select.value === 'Other') {
        otherInput.classList.remove('hidden');
        otherInput.setAttribute('required', 'true');
    } else {
        otherInput.classList.add('hidden');
        otherInput.removeAttribute('required');
    }
}

// Admin: Manage Authorities
function renderAuthTable() {
    const list = document.getElementById('auth-list');
    list.innerHTML = authData.map(a => `
        <tr>
            <td>${a.name}</td>
            <td>${a.pos}</td>
            <td><button onclick="deleteAuth(${a.id})" class="btn-danger-small">Remove</button></td>
        </tr>
    `).join('');
}

function addAuthority() {
    const name = document.getElementById('newAuthName').value;
    const pos = document.getElementById('newAuthPos').value;
    if(name && pos) {
        authData.push({ id: Date.now(), name, pos });
        renderAuthTable();
        document.getElementById('newAuthName').value = '';
    }
}

function deleteAuth(id) {
    authData = authData.filter(a => a.id !== id);
    renderAuthTable();
}

function logout() {
    location.reload();
}// Simulasi Data
let reports = [];

// Fungsi Navigasi
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Logik Log Masuk
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('user-status').innerText = "Logged In: Citizen";
    document.getElementById('main-nav').style.display = 'block';
    showSection('dashboard');
});

// Logik Hantar Laporan
document.getElementById('incidentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newReport = {
        id: "#" + (1000 + reports.length + 1),
        type: document.getElementById('incidentType').value,
        date: new Date().toLocaleDateString(),
        status: "Pending"
    };

    reports.push(newReport);
    updateReportTable();
    alert("Report submitted successfully!");
    showSection('view-reports');
});

// Kemaskini Jadual Laporan
function updateReportTable() {
    const tableBody = document.getElementById('report-list');
    tableBody.innerHTML = "";
    
    reports.forEach(r => {
        const row = `<tr>
            <td>${r.id}</td>
            <td>${r.type}</td>
            <td>${r.date}</td>
            <td><strong>${r.status}</strong></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
    
    document.getElementById('report-count').innerText = reports.length;
}

// Fungsi Log Keluar
function logout() {
    document.getElementById('user-status').innerText = "Logged Out";
    document.getElementById('main-nav').style.display = 'none';
    showSection('login-section');
}
