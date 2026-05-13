// Simulasi Data
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
