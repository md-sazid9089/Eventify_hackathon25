// backend/controllers/StudentDashboardController.js
import StudentEvent from "../models/StudentDashboard.js";
import AdminEvent from "../models/AdminDashboard.js";

// Register for event
export const registerEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    const event = await AdminEvent.findById(eventId);

    if (!event) return res.status(404).json({ error: "Event not found" });
    if (event.participants >= event.maxParticipants) {
      return res.status(400).json({ error: "Event full" });
    }

    event.participants += 1;
    await event.save();

    const studentEvent = new StudentEvent({ userId, eventId });
    await studentEvent.save();

    res.status(201).json(studentEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get my registered events
export const getMyEvents = async (req, res) => {
  try {
    const events = await StudentEvent.find({ userId: req.params.userId }).populate("eventId");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
