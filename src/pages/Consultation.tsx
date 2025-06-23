import React, { useState } from 'react'
import { Calendar, Clock, Star, MessageCircle, Video, Phone, User, Award } from 'lucide-react'

interface Doctor {
  id: string
  name: string
  specialization: string
  experience: number
  rating: number
  reviews: number
  image: string
  price: number
  availableSlots: string[]
  languages: string[]
  isOnline: boolean
}

export default function Consultation() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [consultationType, setConsultationType] = useState<'video' | 'phone' | 'chat'>('video')
  const [showBooking, setShowBooking] = useState(false)

  const [doctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Dermatologist',
      experience: 8,
      rating: 4.9,
      reviews: 156,
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300',
      price: 85,
      availableSlots: ['9:00 AM', '10:30 AM', '2:00 PM', '4:30 PM'],
      languages: ['English', 'Spanish'],
      isOnline: true
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Cosmetic Dermatologist',
      experience: 12,
      rating: 4.8,
      reviews: 203,
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300',
      price: 120,
      availableSlots: ['11:00 AM', '1:00 PM', '3:30 PM', '5:00 PM'],
      languages: ['English', 'Mandarin'],
      isOnline: false
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialization: 'Aesthetic Medicine',
      experience: 6,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300',
      price: 95,
      availableSlots: ['8:30 AM', '12:00 PM', '2:30 PM', '6:00 PM'],
      languages: ['English', 'Spanish', 'French'],
      isOnline: true
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialization: 'Dermatologist',
      experience: 15,
      rating: 4.9,
      reviews: 298,
      image: 'https://images.pexels.com/photos/5327900/pexels-photo-5327900.jpeg?auto=compress&cs=tinysrgb&w=300',
      price: 110,
      availableSlots: ['9:30 AM', '11:30 AM', '3:00 PM', '4:00 PM'],
      languages: ['English'],
      isOnline: true
    }
  ])

  const handleBookConsultation = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setShowBooking(true)
  }

  const confirmBooking = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      alert(`Consultation booked with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`)
      setShowBooking(false)
      setSelectedDoctor(null)
      setSelectedDate('')
      setSelectedTime('')
    }
  }

  const getNextWeekDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      })
    }
    return dates
  }

  if (showBooking && selectedDoctor) {
    return (
      <div className="max-w-2xl mx-auto pb-20 md:pb-8">
        <button
          onClick={() => setShowBooking(false)}
          className="mb-6 text-pink-600 hover:text-pink-700 font-medium"
        >
          ← Back to Doctors
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <img
              src={selectedDoctor.image}
              alt={selectedDoctor.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h1 className="text-2xl font-bold text-gray-800">{selectedDoctor.name}</h1>
            <p className="text-gray-600">{selectedDoctor.specialization}</p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{selectedDoctor.rating} ({selectedDoctor.reviews} reviews)</span>
              </div>
              <div className="text-2xl font-bold text-pink-600">${selectedDoctor.price}</div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Consultation Type */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Consultation Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => setConsultationType('video')}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors duration-200 ${
                    consultationType === 'video'
                      ? 'border-pink-500 bg-pink-50 text-pink-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Video className="w-5 h-5" />
                  <span>Video Call</span>
                </button>
                <button
                  onClick={() => setConsultationType('phone')}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors duration-200 ${
                    consultationType === 'phone'
                      ? 'border-pink-500 bg-pink-50 text-pink-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                  <span>Phone Call</span>
                </button>
                <button
                  onClick={() => setConsultationType('chat')}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors duration-200 ${
                    consultationType === 'chat'
                      ? 'border-pink-500 bg-pink-50 text-pink-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat</span>
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Date</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {getNextWeekDates().map(date => (
                  <button
                    key={date.value}
                    onClick={() => setSelectedDate(date.value)}
                    className={`p-3 rounded-lg border-2 text-center transition-colors duration-200 ${
                      selectedDate === date.value
                        ? 'border-pink-500 bg-pink-50 text-pink-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium">{date.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Available Times</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {selectedDoctor.availableSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border-2 text-center transition-colors duration-200 ${
                      selectedTime === time
                        ? 'border-pink-500 bg-pink-50 text-pink-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium">{time}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Booking Summary */}
            {selectedDate && selectedTime && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Doctor: {selectedDoctor.name}</p>
                  <p>Type: {consultationType.charAt(0).toUpperCase() + consultationType.slice(1)} consultation</p>
                  <p>Date: {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                  <p>Time: {selectedTime}</p>
                  <p className="text-lg font-semibold text-gray-800 mt-2">Total: ${selectedDoctor.price}</p>
                </div>
              </div>
            )}

            {/* Confirm Button */}
            <button
              onClick={confirmBooking}
              disabled={!selectedDate || !selectedTime}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-20 md:pb-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Expert Consultation
        </h1>
        <p className="text-gray-600 text-lg">
          Get professional advice from certified dermatologists and skincare experts
        </p>
      </div>

      {/* Why Consult Section */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 md:p-8 text-white mb-8">
        <h2 className="text-2xl font-bold mb-4">Why Consult with Our Experts?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <Award className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Board Certified</h3>
              <p className="text-teal-100 text-sm">All our doctors are board-certified dermatologists with years of experience</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Video className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Convenient</h3>
              <p className="text-teal-100 text-sm">Video, phone, or chat consultations from the comfort of your home</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Clock className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Quick Response</h3>
              <p className="text-teal-100 text-sm">Get expert advice within 24 hours of booking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                    {doctor.isOnline && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{doctor.specialization}</p>
                  <p className="text-gray-500 text-xs">{doctor.experience} years experience</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{doctor.rating} ({doctor.reviews} reviews)</span>
              </div>

              {/* Languages */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Languages:</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.languages.map(lang => (
                    <span key={lang} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-gray-800">${doctor.price}</div>
                <div className="text-sm text-gray-500">per consultation</div>
              </div>

              {/* Available Slots Preview */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Next available:</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.availableSlots.slice(0, 2).map(slot => (
                    <span key={slot} className="px-2 py-1 bg-teal-100 text-teal-600 text-xs rounded">
                      {slot}
                    </span>
                  ))}
                  {doctor.availableSlots.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{doctor.availableSlots.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={() => handleBookConsultation(doctor)}
                className="w-full py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-medium hover:from-teal-600 hover:to-cyan-600 transition-all duration-200"
              >
                Book Consultation
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">What can I expect during a consultation?</h4>
            <p className="text-gray-600 text-sm">Our doctors will review your skin concerns, medical history, and current skincare routine. They'll provide personalized recommendations and treatment options.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">How long does a consultation last?</h4>
            <p className="text-gray-600 text-sm">Consultations typically last 15-30 minutes, depending on the complexity of your concerns.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Will I receive a treatment plan?</h4>
            <p className="text-gray-600 text-sm">Yes, you'll receive a detailed treatment plan with product recommendations and lifestyle tips tailored to your skin type and concerns.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Can I get a prescription if needed?</h4>
            <p className="text-gray-600 text-sm">Yes, our licensed dermatologists can prescribe medications when necessary for your treatment.</p>
          </div>
        </div>
      </div>
    </div>
  )
}