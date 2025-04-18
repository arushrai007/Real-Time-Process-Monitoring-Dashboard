// const express = require("express");
// const cors = require("cors");
// const { exec } = require("child_process");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// // Route to get all running processes
// app.get("/processes", (req, res) => {
//     exec("tasklist", (error, stdout, stderr) => {
//         if (error) {
//             return res.status(500).json({ error: "Failed to retrieve processes" });
//         }

//         let lines = stdout.split("\n").slice(3); // Skip headers
//         let processes = lines
//             .map(line => line.trim().split(/\s+/))
//             .filter(parts => parts.length > 4)
//             .map(parts => ({
//                 name: parts[0],
//                 pid: parseInt(parts[1]),
//                 memory: parts[4] + " KB",
//             }));

//         res.json(processes);
//     });
// });

// // Route to kill a process by PID
// app.post("/kill", (req, res) => {
//     const { pid } = req.body;
    
//     if (!pid) {
//         return res.status(400).json({ error: "PID is required" });
//     }

//     exec(`taskkill /PID ${pid} /F`, (error, stdout, stderr) => {
//         if (error) {
//             return res.status(500).json({ error: `Failed to terminate process with PID: ${pid}` });
//         }
//         res.json({ message: `Process with PID ${pid} terminated.` });
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


// const os = require("os"); // Import OS module

// // Route to get CPU & Memory usage
// app.get("/stats", (req, res) => {
//     const totalMemory = os.totalmem();
//     const freeMemory = os.freemem();
//     const usedMemory = totalMemory - freeMemory;
//     const memoryUsage = ((usedMemory / totalMemory) * 100).toFixed(2);

//     const cpus = os.cpus();
//     const cpuUsage = cpus.map(cpu => {
//         let total = Object.values(cpu.times).reduce((acc, time) => acc + time, 0);
//         let usage = ((total - cpu.times.idle) / total) * 100;
//         return usage.toFixed(2);
//     });

//     res.json({
//         memoryUsage,
//         totalMemory: (totalMemory / (1024 * 1024 * 1024)).toFixed(2) + " GB",
//         usedMemory: (usedMemory / (1024 * 1024 * 1024)).toFixed(2) + " GB",
//         freeMemory: (freeMemory / (1024 * 1024 * 1024)).toFixed(2) + " GB",
//         cpuUsage
//     });
// });


// const { getDiskInfoSync } = require("node-disk-info");

// app.get("/disk", (req, res) => {
//     try {
//         const disks = getDiskInfoSync();
//         const disk = disks[0]; // Get first disk (C:/ or root)

//         res.json({
//             totalDisk: (disk.blocks / (1024 * 1024 * 1024)).toFixed(2) + " GB",
//             usedDisk: ((disk.used / (1024 * 1024 * 1024)).toFixed(2)) + " GB",
//             freeDisk: ((disk.available / (1024 * 1024 * 1024)).toFixed(2)) + " GB"
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error fetching disk usage data" });
//     }
// });


// const si = require("systeminformation");

// // Get Network Usage Stats
// app.get("/network", async (req, res) => {
//     try {
//         const networkStats = await si.networkStats();
//         res.json({
//             uploadSpeed: (networkStats[0].tx_sec / 1024).toFixed(2) + " KB/s",
//             downloadSpeed: (networkStats[0].rx_sec / 1024).toFixed(2) + " KB/s"
//         });
//     } catch (err) {
//         res.status(500).json({ error: "Error fetching network usage data" });
//     }
// });

// app.get("/cpu", async (req, res) => {
//     try {
//         const load = await si.currentLoad();
//         res.json({ cpuUsage: load.currentLoad.toFixed(2) }); // Sends CPU usage as percentage
//     } catch (error) {
//         res.status(500).json({ error: "Failed to get CPU usage" });
//     }
// });

const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.get("/processes", (req, res) => {
    exec("tasklist", (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: "Failed to retrieve processes" });
        }

        let lines = stdout.split("\n").slice(3); 
        let processes = lines
            .map(line => line.trim().split(/\s+/))
            .filter(parts => parts.length > 4)
            .map(parts => ({
                name: parts[0],
                pid: parseInt(parts[1]),
                memory: parts[4] + " KB",
            }));

        res.json(processes);
    });
});

app.post("/kill", (req, res) => {
    const { pid } = req.body;

    if (!pid) {
        return res.status(400).json({ message: "PID is required" });
    }

    exec(`taskkill /PID ${pid} /F`, (error, stdout, stderr) => {
        if (error) {
            return res.json({ message: `Failed to terminate process with PID: ${pid}. It may be a system process or access is denied.` });
        }
        res.json({ message: `Process with PID ${pid} terminated successfully.` });
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


const os = require("os"); 
app.get("/stats", (req, res) => {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsage = ((usedMemory / totalMemory) * 100).toFixed(2);

    const cpus = os.cpus();
    const cpuUsage = cpus.map(cpu => {
        let total = Object.values(cpu.times).reduce((acc, time) => acc + time, 0);
        let usage = ((total - cpu.times.idle) / total) * 100;
        return usage.toFixed(2);
    });

    res.json({
        memoryUsage,
        totalMemory: (totalMemory / (1024 * 1024 * 1024)).toFixed(2) + " GB",
        usedMemory: (usedMemory / (1024 * 1024 * 1024)).toFixed(2) + " GB",
        freeMemory: (freeMemory / (1024 * 1024 * 1024)).toFixed(2) + " GB",
        cpuUsage
    });
});


const { getDiskInfoSync } = require("node-disk-info");

app.get("/disk", (req, res) => {
    try {
        const disks = getDiskInfoSync();
        const disk = disks[0]; 

        res.json({
            totalDisk: (disk.blocks / (1024 * 1024 * 1024)).toFixed(2) + " GB",
            usedDisk: ((disk.used / (1024 * 1024 * 1024)).toFixed(2)) + " GB",
            freeDisk: ((disk.available / (1024 * 1024 * 1024)).toFixed(2)) + " GB"
        });
    } catch (err) {
        res.status(500).json({ error: "Error fetching disk usage data" });
    }
});


const si = require("systeminformation");


app.get("/network", async (req, res) => {
    try {
        const networkStats = await si.networkStats();
        res.json({
            uploadSpeed: (networkStats[0].tx_sec / 1024).toFixed(2) + " KB/s",
            downloadSpeed: (networkStats[0].rx_sec / 1024).toFixed(2) + " KB/s"
        });
    } catch (err) {
        res.status(500).json({ error: "Error fetching network usage data" });
    }
});

app.get("/cpu", async (req, res) => {
    try {
        const load = await si.currentLoad();
        res.json({ cpuUsage: load.currentLoad.toFixed(2) }); 
    } catch (error) {
        res.status(500).json({ error: "Failed to get CPU usage" });
    }
});


