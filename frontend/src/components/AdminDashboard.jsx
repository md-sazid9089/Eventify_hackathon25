import React, { useState, useEffect } from "react";
import {
  Calendar, Users, Edit, Trash2, Plus, Clock,
  CheckCircle, XCircle, X, Home, Settings,
  LogOut, Menu, User
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell
} from "recharts";
import { useNavigate } from "react-router-dom";
import "./Admin-dash.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([
    { id: 1, title: "Tech Conference 2025", description: "Latest innovations", date: "2025-09-15", time: "10:00", location: "Convention Center", participants: 150, maxParticipants: 200, status: "upcoming" },
    { id: 2, title: "Design Workshop", description: "UI/UX design principles", date: "2025-08-25", time: "14:00", location: "Design Studio", participants: 45, maxParticipants: 50, status: "ongoing" },
    { id: 3, title: "Marketing Seminar", description: "Digital strategies", date: "2025-07-10", time: "09:00", location: "Business Center", participants: 80, maxParticipants: 100, status: "previous" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({ title: "", description: "", date: "", time: "", location: "", maxParticipants: "" });

  // Update status based on time
  useEffect(() => {
    const updateEventStatus = () => {
      const now = new Date();
      setEvents(prev =>
        prev.map(event => {
          const eventDate = new Date(`${event.date}T${event.time}`);
          const endDate = new Date(eventDate.getTime() + 4 * 60 * 60 * 1000);
          if (eventDate > now) return { ...event, status: "upcoming" };
          if (eventDate <= now && now <= endDate) return { ...event, status: "ongoing" };
          return { ...event, status: "previous" };
        })
      );
    };
    updateEventStatus();
    const interval = setInterval(updateEventStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // form handlers
  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(prev => prev.map(ev => ev.id === editingEvent.id ? { ...ev, ...formData } : ev));
    } else {
      setEvents(prev => [...prev, { id: Date.now(), ...formData, participants: 0, maxParticipants: parseInt(formData.maxParticipants, 10), status: "upcoming" }]);
    }
    resetForm();
  };
  const resetForm = () => { setFormData({ title: "", description: "", date: "", time: "", location: "", maxParticipants: "" }); setEditingEvent(null); setShowModal(false); };
  const handleEdit = (event) => { setEditingEvent(event); setFormData({ title: event.title, description: event.description, date: event.date, time: event.time, location: event.location, maxParticipants: event.maxParticipants.toString() }); setShowModal(true); };
  const handleDelete = (id) => { if (window.confirm("Delete event?")) setEvents(prev => prev.filter(e => e.id !== id)); };
  const filterEvents = () => activeTab === "all" ? events : events.filter(e => e.status === activeTab);

  // participate handler
  const handleParticipate = (id) => {
    setEvents(prev =>
      prev.map(event =>
        event.id === id && event.participants < event.maxParticipants
          ? { ...event, participants: event.participants + 1 }
          : event
      )
    );
  };

  const stats = {
    total: events.length,
    upcoming: events.filter(e => e.status === "upcoming").length,
    ongoing: events.filter(e => e.status === "ongoing").length,
    previous: events.filter(e => e.status === "previous").length,
    participants: events.reduce((sum, e) => sum + e.participants, 0),
  };

  const COLORS = ["#ec4899", "#8b5cf6", "#a855f7"]; // pink/violet

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? "open" : "closed"} bg-gradient-to-b from-pink-500 via-purple-600 to-violet-700 text-white`}>
        <div className="sidebar-header">
          <h2>EVENTIFY</h2>
          <button className="admin-sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={20} />
          </button>
        </div>
        <nav className="admin-sidebar-nav">
          <a href="#" className="admin-nav-item active"><Home size={20} /><span>Dashboard</span></a>
          <a href="#" className="admin-nav-item"><Calendar size={20} /><span>Analytics</span></a>
          <a href="#" className="admin-nav-item"><Settings size={20} /><span>Events</span></a>
          <a href="#" className="admin-nav-item logout" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            <LogOut size={20} /><span>Logout</span>
          </a>
        </nav>
      </div>

      {/* Main */}
      <div className="main-content">
        <header className="topbar">
          <h1 className="text-violet-700 font-bold">Event Management Dashboard</h1>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white hover:opacity-90 flex items-center gap-2" onClick={() => setShowModal(true)}>
            <Plus size={20} /> Create Event
          </button>
        </header>

        <div className="dashboard-content">
          {/* Stat cards */}
          <div className="stats-grid">
            <div className="stat-card border-t-4 border-pink-400"><div className="stat-value text-violet-700">{stats.total}</div><div>Total Events</div><Calendar size={24} /></div>
            <div className="stat-card border-t-4 border-pink-400"><div className="stat-value text-violet-700">{stats.upcoming}</div><div>Upcoming</div><Clock size={24} /></div>
            <div className="stat-card border-t-4 border-pink-400"><div className="stat-value text-violet-700">{stats.ongoing}</div><div>Ongoing</div><CheckCircle size={24} /></div>
            <div className="stat-card border-t-4 border-pink-400"><div className="stat-value text-violet-700">{stats.previous}</div><div>Completed</div><XCircle size={24} /></div>
            <div className="stat-card border-t-4 border-pink-400"><div className="stat-value text-violet-700">{stats.participants}</div><div>Total Participants</div><Users size={24} /></div>
          </div>

          {/* Analytics Section */}
          <div className="analytics-section mt-12">
            <h2 className="text-2xl font-bold text-violet-700 mb-6">Analytics</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="mb-4 font-semibold text-pink-600">Participants Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={events.map(e => ({ name: e.title, participants: e.participants }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="participants" stroke="#ec4899" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="mb-4 font-semibold text-pink-600">Capacity vs Enrolled</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={events.map(e => ({ name: e.title, max: e.maxParticipants, current: e.participants }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="max" fill="#8b5cf6" />
                    <Bar dataKey="current" fill="#ec4899" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-6 md:col-span-2">
                <h3 className="mb-4 font-semibold text-pink-600">Event Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={[
                      { name: "Upcoming", value: stats.upcoming },
                      { name: "Ongoing", value: stats.ongoing },
                      { name: "Completed", value: stats.previous }
                    ]} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value" label>
                      {COLORS.map((c, i) => <Cell key={i} fill={c} />)}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="events-section mt-12">
            <h2 className="text-2xl font-bold text-violet-700 mb-6">Manage Events</h2>
            <div className="tabs">
              {["all", "upcoming", "ongoing", "previous"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white" : "bg-gray-200 text-gray-700"}`}>
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="events-grid">
              {filterEvents().map(ev => (
                <div key={ev.id} className="event-card bg-white p-4 rounded-lg shadow border-l-4 border-pink-400">
                  <h3 className="font-bold text-violet-700">{ev.title}</h3>
                  <p className="text-gray-600">{ev.description}</p>
                  <div>{ev.date} at {ev.time}</div>
                  <div>📍 {ev.location}</div>
                  <p className="text-sm mt-2">Participants: {ev.participants}/{ev.maxParticipants}</p>
                  <div className="event-actions flex gap-2 mt-2">
                    <button onClick={() => handleEdit(ev)} className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"><Edit size={14} /> Edit</button>
                    <button onClick={() => handleDelete(ev.id)} className="px-3 py-1 bg-violet-600 text-white rounded hover:bg-violet-700"><Trash2 size={14} /> Delete</button>
                    <button onClick={() => handleParticipate(ev.id)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Participate</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="text-violet-700">{editingEvent ? "Edit Event" : "Create New Event"}</h2>
              <button className="close-btn" onClick={resetForm}><X size={24} /></button>
            </div>
            <form className="event-form" onSubmit={handleSubmit}>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Event Title" required />
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required />
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
              <input type="time" name="time" value={formData.time} onChange={handleInputChange} required />
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" required />
              <input type="number" name="maxParticipants" value={formData.maxParticipants} onChange={handleInputChange} placeholder="Max Participants" required />
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={resetForm}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded">{editingEvent ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;