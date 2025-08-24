const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Admin Event schema/model (adjust if you already have one)
const adminEventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  location: String,
  participants: Number,
  maxParticipants: Number,
  status: String,
});
const AdminEvent = mongoose.model('AdminEvent', adminEventSchema);

// Dummy admin dashboard events
const adminEvents = [
  {
    title: "Tech Conference 2025",
    description: "Latest innovations",
    date: "2025-09-15",
    time: "10:00",
    location: "Convention Center",
    participants: 150,
    maxParticipants: 200,
    status: "upcoming"
  },
  {
    title: "Design Workshop",
    description: "UI/UX design principles",
    date: "2025-08-25",
    time: "14:00",
    location: "Design Studio",
    participants: 45,
    maxParticipants: 50,
    status: "ongoing"
  },
  {
    title: "Marketing Seminar",
    description: "Digital strategies",
    date: "2025-07-10",
    time: "09:00",
    location: "Business Center",
    participants: 80,
    maxParticipants: 100,
    status: "previous"
  }
];

// Seed function
async function seedAdminEvents() {
  try {
    await AdminEvent.deleteMany({});
    await AdminEvent.insertMany(adminEvents);
    console.log('Admin dashboard events seeded!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedAdminEvents();
