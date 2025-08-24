Eventify 

An Event Management Platform built with React.js, Node.js, Express.js, Firebase Authentication, and MongoDB Atlas.

Eventify provides a seamless way to organize, manage, and participate in events. The platform offers two dedicated dashboards:

Admin Dashboard – Manage events, view analytics, monitor participants, and create or delete events.

Student Dashboard – Browse events, register, view certificates, and track personal event participation.

Features:
 Authentication

Login & Role-based access using Firebase Authentication.

Admins and Students are redirected to their respective dashboards after login.

Admin Dashboard

Create, edit, delete events.

View total events, participants, and analytics (graphs & charts with Recharts).

Track ongoing, upcoming, and completed events.

Student Dashboard

Browse all available events with search and filters (by category, date, keyword).

Register or unregister for events.

Download Certificates of Participation (auto-generated PDF with jsPDF).

Dark/Light mode and smooth UI animations (GSAP).

Analytics

Line, Bar, and Pie Charts for event statistics.

Visual representation of participant trends and event statuses.

Tech Stack:

Frontend: React.js, TailwindCSS, Framer Motion, GSAP, Recharts

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: Firebase Auth

Deployment: Netlify (Frontend), Render/Heroku (Backend)

1. Clone the Repository

git clone https://github.com/yourusername/eventify.git
cd eventify

2. Setup Frontend (React)
cd frontend
npm install
npm start

3. Setup Backend (Node.js + MongoDB)
cd backend
npm install
npm run dev

Make sure to configure .env file with:

MONGO_URI =n/a
PORT = 5000
FIREBASE_API_KEY = n/a

4. Run the Project

Frontend: http://localhost:3000

Backend API: http://localhost:5000