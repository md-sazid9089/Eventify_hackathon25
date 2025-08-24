const mongoose = require('mongoose');

// ...existing code for connecting to MongoDB...
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Event schema/model (adjust if you already have one)
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  location: String,
  organizer: String,
  category: String,
  image: String,
  registeredCount: Number,
  maxCapacity: Number,
  registrationDeadline: String,
  isCompleted: Boolean,
});
const Event = mongoose.model('Event', eventSchema);

// Dummy event data
const events = [
  {
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

// Seed function
async function seedEvents() {
  try {
    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log('Dummy events seeded!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedEvents();
