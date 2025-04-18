# Real-Time-Process-Monitoring-Dashboard
Project Overview 
1.1 Introduction & Description of the Project 
The Real-Time Process Monitoring Dashboard is a graphical tool designed to provide 
system administrators with real-time insights into system processes, CPU usage, and 
memory consumption. A process monitoring dashboard is essential for managing system 
performance efficiently, enabling users to identify performance bottlenecks, monitor 
trends, and take necessary actions such as terminating unresponsive processes. 
Traditional process monitoring tools often provide static or periodic updates, but this 
project aims to introduce a real-time solution with dynamic visualization and alert 
mechanisms. 
This dashboard will leverage modern technologies like AI-driven anomaly detection, Web 
Sockets for real-time updates, and interactive visualization to offer an intuitive and 
efficient experience for users. By continuously tracking and analysing system processes, 
the tool ensures optimal resource allocation and helps prevent system slowdowns or 
crashes. 
1.2 Key Goals & Objectives of the Project 
 Develop an interactive dashboard: Provide a real-time graphical interface to 
monitor system performance. 
 Real-time Process Monitoring: Continuously track and display active system 
processes, CPU usage, and memory consumption. 
 Efficient Process Management: Enable users to search, filter, and terminate 
unresponsive processes. 
 Threshold-Based Alerts: Notify users when CPU or memory usage exceeds 
predefined limits. 
 Scalability & Adaptability: Ensure that the solution works for both small-scale 
systems and large-scale distributed networks. 
 Performance Optimization: Optimize system resource allocation, preventing 
bottlenecks and improving responsiveness. 
1.3 Expected Outcomes 
 Enhanced System Performance: By proactively monitoring processes, the system 
will help improve overall performance and efficiency. 
 Improved Resource Utilization: The tool will optimize resource allocation by 
providing clear insights into CPU and memory usage trends. 
 Intelligent Process Control: The system will provide actionable insights, allowing 
users to terminate, prioritize, or analyse running processes effectively. 
 Reduced Downtime: By detecting anomalies and performance issues early, the 
dashboard will help prevent system crashes and slowdowns. 
 Prototype Implementation: A fully functional working prototype demonstrating 
real-time process monitoring and management in a controlled or live system 
environment. 
MODULE WISE BREAKDOWN 
2.1 Module 1: Data Collection & Processing Engine 
 
Purpose: 
To interface with the operating system, retrieve real-time metrics, and transform raw data into a      
structured format that the dashboard can consume. 
Responsibilities: 
i. System Metrics Acquisition: Poll system API (via libraries like psutil) to retrieve CPU 
statistics, memory usage, and active process details. 
ii. Periodic Polling: Implement a timer-driven loop or asynchronous process to refresh data 
every few seconds. 
iii. Data Normalization: Convert data into structured objects (e.g., JSON/dictionaries) with 
clearly defined fields (such as process_id, process_name, c pu_usage, memory_usage). 
iv. API / Observer Integration: Pass the updated data to the GUI module using callbacks, 
observer patterns, or REST/Web Socket endpoints (if web-based) 
     
         2.2 Module 2: Graphical User Interface (GUI) & Dashboard 
    Purpose: 
To serve as the visual layer of the application, displaying dynamic system metrics and 
providing interactive controls for process management. 
     Responsibilities: 
     i. Dashboard Layout: Organize the UI into distinct panels: gauges for CPU/memory usage,         
trend charts for historical data, and a detailed process table. 
    ii. Real-Time Visualization: 
• Update charts and tables seamlessly as new data arrives. 
• Use interactive elements (tool tips, hover effects) to present additional details. 
          iii. User Interaction & Process Management: 
• Enable filtering/sorting of the process list. 
• Offer context menus (e.g., right-click) with options such as “Terminate Process” or 
“Change Priority.” 
         iv. Customization: Allow users to adjust refresh rates, choose display options, and set         
alert thresholds. 
 
        
 
 
2.3 Module 4: Process Control & Management 
 Purpose: 
     To enable users to take corrective actions by managing system processes directly from the                       
dashboard. 
              Responsibilities: 
                 i. Process Termination: Allow users to kill unresponsive or unnecessary processes. 
                ii. Priority Adjustment: Provide options to modify the priority of processes dynamically. 
                iii. Process Filtering & Searching: Enable users to locate specific processes based on name, CPU                                          
usage, or memory consumption. 
               iv. Automated Resource Optimization (Future Scope): Suggest automatic adjustments based 
on    resource usage trends (e.g., reducing process priority when the system load is high). 
 
2.4  Module 5: GitHub Version Control & Collaboration 
  Purpose: 
      To track code changes, maintain repository history, and support collaborative development. 
              Responsibilities: 
    i. Version Tracking: Maintain a clear commit history for changes in data collection, UI, and     
analytics modules. 
   ii. Branching & Merging: Use feature branches for updates like UI enhancements and new alert 
mechanisms. 
  iii. Collaborative Development: Enable multiple developers to work efficiently with issue 
tracking, pull requests, and documentation updates. 
   iv. Release Management: Define stable versions and provide changelogs for improvements 
and bug fixes. 
3. FUNCTIONALITIES 
        3.1 KEY FUNCTIONALITIES 
       3.1.1 Data Acquisition & Processing: 
a. Periodic Polling: Fetch real-time system metrics at regular 
intervals using psutil. 
b. Data Structuring: Normalize collected data into structured JSON 
objects. 
c. Error Handling & Permissions Management: Gracefully handle 
inaccessible processes, permission errors, and system API failures. 
            3.1.2 Real-Time Visualization: 
a. Dynamic Metrics Display: Live panels showing CPU usage, memory 
consumption, and process activity. 
b. Interactive Process Table: Sortable, filterable, and searchable table 
with real-time updates. 
c. Hover & Tooltip Insights: Show additional details when hovering over 
processes or graphs. 
3.1.3 User Interaction and Controls: 
a. Process Filtering & Sorting: Enable searching and sorting of processes 
based on CPU/memory usage, PID, or name. 
b. Contextual Process Management: Allow users to terminate, suspend, 
or adjust priority via right-click menus. 
c. User Configurable Settings: Provide options to modify polling intervals, 
alert thresholds, and display preferences. 
3.2  VISUAL DATA REPRESENTATION 
i. Graphical Widgets: 
a. Gauges & Meters: Display real-time CPU and memory utilization as 
circular or bar gauges. 
b. Line Charts: Show historical performance trends for CPU and 
memory usage. 
c. Interactive Process Table: Real-time, filterable table displaying 
process details such as PID, CPU%, memory%, and state. 
ii. Dashboard Layout: 
 Multi-Panel Interface: Organizes metrics into separate, well-defined 
sections. 
 At-a-Glance System Overview: Quick access to key system health 
indicators. 
 Customization Options: Users can rearrange widgets, set dark/light 
themes, and configure displayed data. 
4. TECHNOLOGIES USED 
4.1  Programming Languages 
4.1.1 HTML, CSS, and JavaScript 
 HTML: Defines the structure of the dashboard, including elements like tables, charts, and 
controls. 
 CSS: Styles the interface, ensuring a visually appealing and responsive layout. 
 JavaScript (Vanilla): Handles user interactions, dynamic updates, and real-time 
visualization on the frontend. 
4.1.2 Node.js 
 Backend Execution: Acts as the server-side runtime environment, managing data retrieval 
and processing. 
 Asynchronous Processing: Enables efficient handling of multiple API requests using event
driven architecture. 
4.2 Libraries & Tools 
4.2.1 Backend Technologies (Node.js & Express.js) 
 Express.js: Provides a backend framework for handling API requests efficiently. 
 child_process (exec): Executes system commands like tasklist and taskkill for process      
management. 
 OS Module: Fetches system metrics like CPU usage, memory consumption, and process details. 
 node-disk-info: Retrieves disk space details, including total, used, and free storage. 
 systeminformation: Gathers system stats like CPU load, network activity, and process     statuses. 
4.2.2 Frontend Technologies 
 Vanilla JavaScript: Implements real-time updates, interactivity, and user controls    without 
relying on heavy frameworks. 
 CSS & HTML: Used for structuring and styling the dashboard interface. 
4.2.3 Networking & CORS 
 CORS Module: Enables Cross-Origin Resource Sharing (CORS) for secure API access    and 
communication between frontend and backend. 
4.3 Other Tools 
 Git: Version control system for tracking code changes and collaboration. 
 GitHub/GitLab: Repository hosting for source code management and project tracking. 
 IDE/Text Editors: Development tools like Visual Studio Code for writing and debugging code.
