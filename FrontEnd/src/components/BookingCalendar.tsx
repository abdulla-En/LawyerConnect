import { useState } from 'react';
import { X, Clock, Calendar } from 'lucide-react';

interface BookingCalendarProps {
  lawyer: any;
  onClose: () => void;
}

export function BookingCalendar({ lawyer, onClose }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dates = [
    { day: 'Mon', date: 8 },
    { day: 'Tue', date: 9 },
    { day: 'Wed', date: 10 },
    { day: 'Thu', date: 11 },
    { day: 'Fri', date: 12 },
    { day: 'Sat', date: 13 },
    { day: 'Sun', date: 14 }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', 
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      alert(`Booking confirmed with ${lawyer.name} on Dec ${selectedDate} at ${selectedTime}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-gray-900">Book Consultation</h2>
            <p className="text-sm text-gray-500 mt-1">with {lawyer?.name}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-[#5A4FFF]" />
              <h3 className="text-lg text-gray-900">Select Date</h3>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {dates.map((item) => (
                <button
                  key={item.date}
                  onClick={() => setSelectedDate(item.date)}
                  className={`p-3 rounded-xl border transition-all ${
                    selectedDate === item.date
                      ? 'bg-gradient-to-r from-[#5A4FFF] to-[#7C64FF] text-white border-transparent shadow-md'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-[#5A4FFF]'
                  }`}
                >
                  <div className="text-xs mb-1">{item.day}</div>
                  <div className="text-lg">{item.date}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[#5A4FFF]" />
              <h3 className="text-lg text-gray-900">Select Time</h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-3 rounded-xl border transition-all text-sm ${
                    selectedTime === time
                      ? 'bg-gradient-to-r from-[#5A4FFF] to-[#7C64FF] text-white border-transparent shadow-md'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-[#5A4FFF]'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#F5F5F5] rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Consultation Fee</span>
              <span className="text-xl text-gray-900">${lawyer?.price}/hr</span>
            </div>
            {selectedDate && selectedTime && (
              <div className="text-sm text-gray-500 border-t border-gray-200 pt-3">
                <p>Selected: December {selectedDate}, 2025 at {selectedTime}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className={`w-full py-4 rounded-xl transition-all ${
              selectedDate && selectedTime
                ? 'bg-gradient-to-r from-[#5A4FFF] to-[#7C64FF] text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
