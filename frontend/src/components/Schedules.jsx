import { useState } from "react";

export default function Schedules() {
  // Tab days
  const days = [
    { id: "day1", title: "Day 01", date: "3 March, 2024" },
    { id: "day2", title: "Day 02", date: "4 March, 2024" },
    { id: "day3", title: "Day 03", date: "5 March, 2024" },
    { id: "day4", title: "Day 04", date: "6 March, 2024" },
    { id: "day5", title: "Day 05", date: "7 March, 2024" },
  ];

  // Default active tab
  const [activeDay, setActiveDay] = useState("day1");

  // Schedule data for each day
  const scheduleData = {
    day1: [
      {
        time: "08:00 - 10:00 AM",
        speaker: "Jack Williams",
        role: "Founder & CEO",
        topic: "The WordPress Introduction",
        image: "/images/speakers/1.jpg",
      },
      {
        time: "12:00 - 14:00 PM",
        speaker: "Rose Shipp",
        role: "Founder & CEO",
        topic: "Getting Started With WordPress",
        image: "/images/speakers/2.jpg",
      },
      {
        time: "16:00 - 18:00 PM",
        speaker: "Sophie Lane",
        role: "Founder & CEO",
        topic: "Prepare Your Hosting & Domain",
        image: "/images/speakers/3.jpg",
      },
      {
        time: "20:00 - 22:00 PM",
        speaker: "Evan Stone",
        role: "Founder & CEO",
        topic: "WordPress Theme Development Basic",
        image: "/images/speakers/4.jpg",
      },
    ],
    day2: [
      {
        time: "09:00 - 11:00 AM",
        speaker: "David Brown",
        role: "Marketing Head",
        topic: "SEO Strategies for Beginners",
        image: "/images/speakers/5.jpg",
      },
    ],
    // you can extend day3, day4, day5 here...
  };

  return (
    <section
      id="schedules"
      className="relative py-20 bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/bg/1.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-800/80"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-4xl font-bold text-center mb-10">Event Schedule</h2>

        {/* Tabs */}
        <div className="flex justify-center mb-8 space-x-2">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`px-6 py-3 font-semibold transition rounded-t-md ${
                activeDay === day.id
                  ? "bg-red-500 text-white"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            >
              <div>{day.title}</div>
              <div className="text-sm">{day.date}</div>
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="bg-white/10 rounded-lg shadow-lg overflow-hidden">
          {scheduleData[activeDay]?.map((session, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 p-6 border-b border-white/20 hover:bg-white/20 transition"
            >
              {/* Time */}
              <div className="col-span-3 md:col-span-2 font-semibold">
                {session.time}
              </div>

              {/* Speaker */}
              <div className="col-span-9 md:col-span-10 flex items-center space-x-4">
                <img
                  src={session.image}
                  alt={session.speaker}
                  className="w-14 h-14 rounded-full border-2 border-white"
                />
                <div>
                  <h4 className="font-bold">{session.speaker}</h4>
                  <p className="text-sm text-orange-300">{session.role}</p>
                </div>
                <p className="ml-auto font-semibold">{session.topic}</p>
              </div>
            </div>
          )) || (
            <p className="text-center py-10">
              No sessions scheduled for this day.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
