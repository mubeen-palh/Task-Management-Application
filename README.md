# 🧠 MERN Task Management System

This project is developed to streamline the task management process by allowing dynamic task creation, customizable priority settings, team member assignment, and an intuitive calendar view. Built using the MERN stack (MongoDB, Express, React, Node.js).

---

## 🚀 Project Setup

### Prerequisites
- Node.js installed
- MongoDB running locally or in the cloud (e.g., MongoDB Atlas)

### ⚙️ Installation

## 1. Clone the repository

## 2. Setup Backend
cd backend
npm run dev

## 3. Setup Frontend
cd frontend
npm run dev

### ⚙️ Approaches Used
1) All tasks and team members are fetched on the Dashboard page (DashboardPage.jsx), where overallocated members are computed based on total hours of assigned tasks vs available hours (e.g., 8 hrs/day). Overallocations are visually flagged.

    # Test Case 1
    
    John has 3 tasks due on the same day totaling 12 hours
    
    John is overallocated (limit: 8 hrs/day)
    
    # Test Case 2
    
    Sarah has 2 tasks due on different days, each 4 hrs
    
    Sarah is not overallocated

2) The app supports:
    
    Creating, reading, updating, and deleting Tasks
    Assigning multiple team members to a task
    Creating, updating, and removing Team Members
    This is managed through REST APIs in the backend and forms/modals on the frontend.

3) Used react-big-calendar to display tasks. Task bars are color-coded based on priority and urgency:
    # Explanation:
    
    High-priority & near-due → Red
    
    Medium/Low-priority → Yellow
    
    Completed or far deadlines → Green

#### Challenges Faced

Overallocation Calculation
Deciding whether overallocated hours should be calculated per-day or per-week. The decision was made to calculate it per-day for clarity and strict scheduling.

Calendar View Display
Ensuring tasks are clearly displayed in the calendar even when multiple tasks are assigned to the same day, and handling dynamic color changes.

### 📌 Conclusion
This MERN project offers a visual, user-friendly interface for tracking workload and preventing overburdening team members. It helps in organizing and prioritizing work effectively across teams.




