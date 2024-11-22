'use client'

import { useState } from 'react'
import Image from 'next/image'

const expertData = {
  expert: {
    name: "Dr. Jane Smith",
    title: "AI Research Scientist",
    image: "/images/dr-avatar-female.webp?height=200&width=200",
    bio: "Dr. Jane Smith is a leading expert in artificial intelligence with over 15 years of experience in machine learning and neural networks."
  },
  availableSlots: [
    { id: 1, time: "09:00 AM", available: true },
    { id: 2, time: "10:00 AM", available: true },
    { id: 3, time: "11:00 AM", available: false },
    { id: 4, time: "01:00 PM", available: true },
    { id: 5, time: "02:00 PM", available: true },
    { id: 6, time: "03:00 PM", available: true },
    { id: 7, time: "04:00 PM", available: false }
  ]
};

export default function ExpertBooking() {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [isBooked, setIsBooked] = useState(false)

  const handleSlotSelection = (slotId: number) => {
    setSelectedSlot(slotId)
    setIsBooked(false)
  }

  const handleBooking = () => {
    if (selectedSlot !== null) {
      setIsBooked(true)
      // Here you would typically make an API call to book the slot
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              className="h-48 w-full object-cover md:w-48"
              src={expertData.expert.image}
              alt={expertData.expert.name}
              width={200}
              height={200}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
              {expertData.expert.title}
            </div>
            <h2 className="mt-2 text-2xl leading-8 font-semibold text-black">
              {expertData.expert.name}
            </h2>
            <p className="mt-2 text-gray-600">{expertData.expert.bio}</p>
          </div>
        </div>
        <div className="px-8 py-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-black mb-4">Available Time Slots</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {expertData.availableSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => handleSlotSelection(slot.id)}
                disabled={!slot.available}
                className={`py-2 px-4 rounded-lg text-sm font-medium ${
                  slot.available
                    ? selectedSlot === slot.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
          {selectedSlot !== null && (
            <div className="mt-6">
              <button
                onClick={handleBooking}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Book Selected Time Slot
              </button>
            </div>
          )}
          {isBooked && (
            <div className="mt-4 text-center text-green-600 font-semibold">
              Time slot booked successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

