import react from "react" ;

const Calendar = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Calendar</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }, (_, i) => (
          <div key={i} className="py-2 border border-gray-200 h-20 text-sm">
            {i > 6 && i < 32 ? i - 6 : ""}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Calendar;
