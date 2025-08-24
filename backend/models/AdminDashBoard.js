// backend/models/AdminDashboard.js
import mongoose from "mongoose";

const AdminEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: String,
  time: String,
  location: String,
  participants: { type: Number, default: 0 },
  maxParticipants: Number,
  status: { type: String, enum: ["upcoming", "ongoing", "previous"], default: "upcoming" }
}, { timestamps: true });

export default mongoose.model("AdminEvent", AdminEventSchema);
