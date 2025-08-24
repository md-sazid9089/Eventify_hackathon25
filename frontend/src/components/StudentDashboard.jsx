import React, { useState, useEffect, useRef } from 'react';
import { Search, Calendar, MapPin, Users, Download, Sun, Moon, Menu, X, Filter, Clock, User } from 'lucide-react';
import jsPDF from 'jspdf';
import { gsap } from 'gsap';
import './StudentDashboard.css';
import { useNavigate } from "react-router-dom";

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: 'React.js Workshop',
    description: 'Learn the fundamentals of React.js development with hands-on coding exercises. Perfect for beginners and intermediate developers.',
    date: '2024-12-15',
    time: '10:00 AM',
    location: 'Computer Lab A',
    organizer: 'Tech Society',
    category: 'Technology',
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    registeredCount: 45,
    maxCapacity: 60,
    registrationDeadline: '2024-12-10T23:59:59',
    isCompleted: false
  },
  {
    id: 2,
    title: 'AI & Machine Learning Seminar',
    description: 'Explore the latest trends in artificial intelligence and machine learning. Industry experts will share insights and real-world applications.',
    date: '2024-12-20',
    time: '2:00 PM',
    location: 'Auditorium Main',
    organizer: 'AI Club',
    category: 'Technology',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    registeredCount: 120,
    maxCapacity: 150,
    registrationDeadline: '2024-12-18T23:59:59',
    isCompleted: false
  },
  {
    id: 3,
    title: 'Photography Contest',
    description: 'Showcase your photography skills in this exciting contest. Multiple categories including nature, portrait, and street photography.',
    date: '2024-11-25',
    time: '11:00 AM',
    location: 'Art Gallery',
    organizer: 'Photography Club',
    category: 'Arts',
    image: 'https://images.pexels.com/photos/606541/pexels-photo-606541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    registeredCount: 35,
    maxCapacity: 50,
    registrationDeadline: '2024-11-20T23:59:59',
    isCompleted: true
  },
  {
    id: 4,
    title: 'Entrepreneurship Summit',
    description: 'Connect with successful entrepreneurs and learn about starting your own business. Includes networking sessions and startup pitches.',
    date: '2024-12-30',
    time: '9:00 AM',
    location: 'Business Center',
    organizer: 'Entrepreneurship Cell',
    category: 'Business',
    image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    registeredCount: 80,
    maxCapacity: 100,
    registrationDeadline: '2024-12-25T23:59:59',
    isCompleted: false
  },
  {
    id: 5,
    title: 'Cultural Dance Festival',
    description: 'Celebrate diversity through traditional and modern dance performances. Open to all students with various cultural backgrounds.',
    date: '2024-12-12',
    time: '6:00 PM',
    location: 'Main Stadium',
    organizer: 'Cultural Committee',
    category: 'Culture',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    registeredCount: 200,
    maxCapacity: 300,
    registrationDeadline: '2024-12-08T23:59:59',
    isCompleted: false
  },
  {
    id: 6,
    title: 'Data Science Bootcamp',
    description: 'Intensive 3-day bootcamp covering Python, data analysis, visualization, and machine learning basics. Includes hands-on projects.',
    date: '2024-11-15',
    time: '9:00 AM',
    location: 'Computer Lab B',
    organizer: 'Data Science Society',
    category: 'Technology',
    image: 'https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    registeredCount: 25,
    maxCapacity: 30,
    registrationDeadline: '2024-11-10T23:59:59',
    isCompleted: true
  }
];

const StudentDashboard = () => {
  // State management
  const [currentView, setCurrentView] = useState('allEvents');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([1, 3, 6]); // Mock registered events
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDate, setFilterDate] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studentName, setStudentName] = useState('SAZID'); // Mock student name

  // Refs for animations
  const dashboardRef = useRef(null);
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);
const navigate = useNavigate();

  // Initialize animations
  useEffect(() => {
    // Initial page load animation
    gsap.fromTo(dashboardRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    // Animate sidebar items
    gsap.fromTo('.sidebar-item',
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.3 }
    );
  }, []);

  // Animate content changes
  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [currentView, selectedEvent]);

  // Theme toggle effect
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  // Filter events based on search and filters
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'All' || event.category === filterCategory;
    
    const matchesDate = !filterDate || event.date === filterDate;
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  // Check if registration is still open
  const isRegistrationOpen = (event) => {
    return new Date() < new Date(event.registrationDeadline);
  };

  // Handle event registration
  const handleRegister = (eventId) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
      // Animate registration success
      gsap.fromTo('.registration-success',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, yoyo: true, repeat: 1 }
      );
    }
  };

  // Handle event unregistration
  const handleUnregister = (eventId) => {
    setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
  };

  // Generate PDF certificate
  const generateCertificate = (event) => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Certificate background and styling
    doc.setFillColor(240, 230, 255); // Light purple background
    doc.rect(0, 0, 297, 210, 'F');

    // Header
    doc.setFillColor(147, 51, 234); // Purple header
    doc.rect(0, 0, 297, 40, 'F');

    // University/Event branding
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('STUDENT EVENT PORTAL', 148.5, 25, { align: 'center' });

    // Certificate title
    doc.setTextColor(147, 51, 234);
    doc.setFontSize(36);
    doc.setFont('helvetica', 'bold');
    doc.text('CERTIFICATE OF PARTICIPATION', 148.5, 70, { align: 'center' });

    // Student details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.text('This is to certify that', 148.5, 95, { align: 'center' });

    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(147, 51, 234);
    doc.text(studentName, 148.5, 115, { align: 'center' });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.text('has successfully participated in', 148.5, 135, { align: 'center' });

    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(147, 51, 234);
    doc.text(event.title, 148.5, 155, { align: 'center' });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text(`Organized by ${event.organizer} on ${event.date}`, 148.5, 175, { align: 'center' });

    // Footer
    doc.setFillColor(147, 51, 234);
    doc.rect(0, 190, 297, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text('Generated on: ' + new Date().toLocaleDateString(), 148.5, 202, { align: 'center' });

    // Save the PDF
    doc.save(`${event.title.replace(/\s+/g, '_')}_Certificate.pdf`);
  };

  // Sidebar navigation items
  const navigationItems = [
    { id: 'allEvents', icon: Calendar, label: 'All Events' },
    { id: 'myEvents', icon: User, label: 'My Events' },
    { id: 'certificates', icon: Download, label: 'Certificates' }
  ];

  // Render sidebar
  const renderSidebar = () => (
    <div ref={sidebarRef} className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Event Portal</h2>
        <button 
          className="sidebar-close"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navigationItems.map(item => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={`sidebar-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentView(item.id);
                setSelectedEvent(null);
                setSidebarOpen(false);
              }}
            >
              <IconComponent size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>






      <div className="sidebar-footer">
        <button className="logout-btn" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            <span>Logout</span>
        </button>
      </div>
    </div>
  );

  // Render event card
  const renderEventCard = (event) => {
    const isRegistered = registeredEvents.includes(event.id);
    const registrationOpen = isRegistrationOpen(event);

    return (
      <div key={event.id} className="event-card" onClick={() => setSelectedEvent(event)}>
        <div className="event-image">
          <img src={event.image} alt={event.title} loading="lazy" />
          <div className="event-category">{event.category}</div>
        </div>
        
        <div className="event-content">
          <h3 className="event-title">{event.title}</h3>
          <p className="event-description">{event.description}</p>
          
          <div className="event-meta">
            <div className="event-meta-item">
              <Calendar size={16} />
              <span>{event.date} at {event.time}</span>
            </div>
            <div className="event-meta-item">
              <MapPin size={16} />
              <span>{event.location}</span>
            </div>
            <div className="event-meta-item">
              <Users size={16} />
              <span>{event.registeredCount}/{event.maxCapacity} registered</span>
            </div>
          </div>

          <div className="event-actions">
            {isRegistered ? (
              <button 
                className="btn-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnregister(event.id);
                }}
              >
                Unregister
              </button>
            ) : (
              <button 
                className={`btn-primary ${!registrationOpen ? 'btn-disabled' : ''}`}
                disabled={!registrationOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  if (registrationOpen) handleRegister(event.id);
                }}
              >
                {registrationOpen ? 'Register' : 'Registration Closed'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render event details modal
  const renderEventDetails = () => {
    if (!selectedEvent) return null;

    const isRegistered = registeredEvents.includes(selectedEvent.id);
    const registrationOpen = isRegistrationOpen(selectedEvent);

    return (
      <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
        <div className="event-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setSelectedEvent(null)}>
            <X size={24} />
          </button>

          <div className="modal-image">
            <img src={selectedEvent.image} alt={selectedEvent.title} />
          </div>

          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedEvent.title}</h2>
              <span className="event-category-badge">{selectedEvent.category}</span>
            </div>

            <p className="modal-description">{selectedEvent.description}</p>

            <div className="modal-details">
              <div className="detail-row">
                <Calendar size={20} />
                <div>
                  <strong>Date & Time:</strong>
                  <span>{selectedEvent.date} at {selectedEvent.time}</span>
                </div>
              </div>
              <div className="detail-row">
                <MapPin size={20} />
                <div>
                  <strong>Location:</strong>
                  <span>{selectedEvent.location}</span>
                </div>
              </div>
              <div className="detail-row">
                <User size={20} />
                <div>
                  <strong>Organizer:</strong>
                  <span>{selectedEvent.organizer}</span>
                </div>
              </div>
              <div className="detail-row">
                <Users size={20} />
                <div>
                  <strong>Participants:</strong>
                  <span>{selectedEvent.registeredCount}/{selectedEvent.maxCapacity}</span>
                </div>
              </div>
              <div className="detail-row">
                <Clock size={20} />
                <div>
                  <strong>Registration Deadline:</strong>
                  <span>{new Date(selectedEvent.registrationDeadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              {isRegistered ? (
                <button 
                  className="btn-secondary btn-large"
                  onClick={() => handleUnregister(selectedEvent.id)}
                >
                  Unregister from Event
                </button>
              ) : (
                <button 
                  className={`btn-primary btn-large ${!registrationOpen ? 'btn-disabled' : ''}`}
                  disabled={!registrationOpen}
                  onClick={() => {
                    if (registrationOpen) handleRegister(selectedEvent.id);
                  }}
                >
                  {registrationOpen ? 'Register for Event' : 'Registration Closed'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render main content based on current view
  const renderContent = () => {
    switch (currentView) {
      case 'allEvents':
        return (
          <div className="content-section">
            <div className="section-header">
              <h1>All Events</h1>
              <p>Discover and register for upcoming events</p>
            </div>
            
            {/* Search and Filter Section */}
            <div className="search-filters">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search events by title, description, or organizer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-row">
                <div className="filter-group">
                  <label>Category</label>
                  <select 
                    value={filterCategory} 
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    <option value="Technology">Technology</option>
                    <option value="Arts">Arts</option>
                    <option value="Business">Business</option>
                    <option value="Culture">Culture</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                  />
                </div>
                
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCategory('All');
                    setFilterDate('');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>

            <div className="search-results">
              <h3>Found {filteredEvents.length} event(s)</h3>
            </div>
            
            <div className="events-grid">
              {filteredEvents.map(renderEventCard)}
            </div>
          </div>
        );

      case 'myEvents':
        const myEvents = mockEvents.filter(event => registeredEvents.includes(event.id));
        const filteredMyEvents = myEvents.filter(event => {
          const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesSearch;
        });
        
        return (
          <div className="content-section">
            <div className="section-header">
              <h1>My Events</h1>
              <p>Events you have registered for</p>
            </div>
            
            {myEvents.length > 0 && (
              <div className="search-filters">
                <div className="search-box">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Search your registered events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {searchTerm && (
                  <div className="search-results">
                    <h3>Found {filteredMyEvents.length} of your registered event(s)</h3>
                  </div>
                )}
              </div>
            )}
            
            {myEvents.length > 0 ? (
              filteredMyEvents.length > 0 ? (
                <div className="events-grid">
                  {filteredMyEvents.map(renderEventCard)}
                </div>
              ) : (
                <div className="empty-state">
                  <Search size={64} />
                  <h3>No events found</h3>
                  <p>Try adjusting your search terms</p>
                  <button 
                    className="btn-primary"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Search
                  </button>
                </div>
              )
            ) : (
              <div className="empty-state">
                <Calendar size={64} />
                <h3>No events registered</h3>
                <p>Browse all events to find something interesting!</p>
                <button 
                  className="btn-primary"
                  onClick={() => setCurrentView('allEvents')}
                >
                  Browse Events
                </button>
              </div>
            )}
          </div>
        );

      case 'certificates':
        const completedRegisteredEvents = mockEvents.filter(event => 
          registeredEvents.includes(event.id) && event.isCompleted
        );
        return (
          <div className="content-section">
            <div className="section-header">
              <h1>Certificates</h1>
              <p>Download certificates for completed events</p>
            </div>
            {completedRegisteredEvents.length > 0 ? (
              <div className="certificates-grid">
                {completedRegisteredEvents.map(event => (
                  <div key={event.id} className="certificate-card">
                    <div className="certificate-icon">
                      <Download size={32} />
                    </div>
                    <div className="certificate-content">
                      <h3>{event.title}</h3>
                      <p>Completed on {event.date}</p>
                      <p>Organized by {event.organizer}</p>
                    </div>
                    <button 
                      className="btn-primary"
                      onClick={() => generateCertificate(event)}
                    >
                      <Download size={16} />
                      Download Certificate
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Download size={64} />
                <h3>No certificates available</h3>
                <p>Complete events to earn certificates!</p>
              </div>
            )}
          </div>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div ref={dashboardRef} className="student-dashboard">
      {/* Mobile Header */}
      <header className="mobile-header">
        <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        <h1>Event Portal</h1>
        <button 
          className="theme-toggle"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Desktop Header */}
      <header className="desktop-header">
        <div className="header-left">
          <h1>Eventify</h1>
        </div>
        <div className="header-right">
          <span className="welcome-text">Welcome, {studentName}</span>
          <button 
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <div className="dashboard-container">
        {renderSidebar()}
        
        <main ref={contentRef} className="main-content">
          {renderContent()}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Event Details Modal */}
      {renderEventDetails()}

      {/* Registration Success Indicator */}
      <div className="registration-success">✓ Registration Successful!</div>
    </div>
  );
};

export default StudentDashboard;