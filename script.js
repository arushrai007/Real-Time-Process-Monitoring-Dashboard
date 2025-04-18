function fetchProcesses() {
    fetch("http://localhost:5000/processes")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("process-list");
            tableBody.innerHTML = ""; 

            data.forEach(process => {
                let row = `<tr>
                    <td>${process.name}</td>
                    <td>${process.pid}</td>
                    <td>${process.memory}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching process data:", error));
}

fetchProcesses();

let processData = [];
function fetchProcesses() {
    fetch("http://localhost:5000/processes")
        .then(response => response.json())
        .then(data => {
            processData = data; 
            displayProcesses(data);
        })
        .catch(error => console.error("Error fetching process data:", error));
}

function displayProcesses(data) {
    const tableBody = document.getElementById("process-list");
    tableBody.innerHTML = ""; 

    data.forEach(process => {
        let row = `<tr>
            <td>${process.name}</td>
            <td>${process.pid}</td>
            <td>${process.memory}</td>
            <td><button onclick="killProcess(${process.pid})">Kill</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}


function filterProcesses() {
    let query = document.getElementById("searchBox").value.toLowerCase();
    let filteredData = processData.filter(p => p.name.toLowerCase().includes(query));
    displayProcesses(filteredData);
}


fetchProcesses();



function killProcess(pid) {
    fetch("http://localhost:5000/kill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pid: pid }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); 
        fetchProcesses(); 
    })
    .catch(error => console.error("Error killing process:", error));
}


function fetchSystemStats() {
    fetch("http://localhost:5000/stats")
        .then(response => response.json())
        .then(data => {
            document.getElementById("cpuUsage").innerHTML = 
                `<strong>Overall CPU Usage:</strong> ${data.cpuUsage[0]}% <br>` +
                `<strong>Core-wise Usage:</strong> <br> ${data.cpuUsage.slice(1).join("%, ")} %`;

            document.getElementById("totalMemory").textContent = data.totalMemory;
            document.getElementById("usedMemory").textContent = data.usedMemory;
            document.getElementById("freeMemory").textContent = data.freeMemory;
        })
        .catch(error => console.error("Error fetching system stats:", error));

fetch("http://localhost:5000/stats")
.then(response => response.json())
.then(data => {
    
    document.getElementById("memoryUsageValue").textContent = data.memoryUsage + "%";

    if (memoryChart.data.labels.length > 10) {
        memoryChart.data.labels.shift(); 
        memoryChart.data.datasets[0].data.shift();
    }

    memoryChart.data.labels.push(new Date().toLocaleTimeString());
    memoryChart.data.datasets[0].data.push(data.memoryUsage);
    memoryChart.update();
})
.catch(error => console.error("Error fetching system stats:", error));
}


setInterval(fetchSystemStats, 1000);

fetchSystemStats();

function fetchDiskStats() {
    fetch("http://localhost:5000/disk")
        .then(response => response.json())
        .then(data => {
            document.getElementById("totalDisk").textContent = data.totalDisk;
            document.getElementById("usedDisk").textContent = data.usedDisk;
            document.getElementById("freeDisk").textContent = data.freeDisk;
        })
        .catch(error => console.error("Error fetching disk stats:", error));
}

setInterval(fetchDiskStats, 5000);
fetchDiskStats();


function fetchNetworkStats() {
    fetch("http://localhost:5000/network")
        .then(response => response.json())
        .then(data => {
            document.getElementById("uploadSpeed").textContent = data.uploadSpeed;
            document.getElementById("downloadSpeed").textContent = data.downloadSpeed;
        })
        .catch(error => console.error("Error fetching network stats:", error));
}
setInterval(fetchNetworkStats, 1000);

fetchNetworkStats();


const ctx = document.getElementById("cpuChart").getContext("2d");

const cpuChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [], 
        datasets: [{
            label: "CPU Usage (%)",
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            data: [], 
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { display: true },
            y: { min: 0, max: 100 }
        }
    }
});

function updateCpuChart() {
    fetch("http://localhost:5000/cpu")
        .then(response => response.json())
        .then(data => {
            if (cpuChart.data.labels.length > 10) {
                cpuChart.data.labels.shift(); 
                cpuChart.data.datasets[0].data.shift(); 
            }

            cpuChart.data.labels.push(new Date().toLocaleTimeString()); 
            cpuChart.data.datasets[0].data.push(data.cpuUsage); 

            cpuChart.update();
        })
        .catch(error => console.error("Error fetching CPU usage:", error));
}

setInterval(updateCpuChart, 2000);
updateCpuChart(); 



const memoryCtx = document.getElementById("memoryChart").getContext("2d");

const memoryChart = new Chart(memoryCtx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Memory Usage (%)",
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderWidth: 2,
            data: []
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});







