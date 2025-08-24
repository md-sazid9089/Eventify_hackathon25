// backend/controllers/AdminDashboardController.js
import AdminEvent from "../models/AdminDashboard.js";

// Create event
export const createEvent = async (req, res) => {
  try {
    const event = new AdminEvent(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await AdminEvent.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    await AdminEvent.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
