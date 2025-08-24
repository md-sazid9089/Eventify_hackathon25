// backend/models/StudentDashboard.js
import mongoose from "mongoose";

const StudentEventSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "AdminEvent" },
  registeredAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("StudentEvent", StudentEventSchema);
