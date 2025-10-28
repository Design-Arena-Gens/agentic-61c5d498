import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sampleComplaints, Complaint } from '../data/complaints'

export default function MapView() {
  const navigate = useNavigate()
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'New': '#3B82F6',
      'Pending': '#EAB308',
      'Escalated': '#EF4444',
      'Resolved': '#10B981'
    }
    return colors[status] || '#6B7280'
  }

  const getDepartmentColor = (dept: string) => {
    const colors: { [key: string]: string } = {
      'Waste Management': 'bg-green-500',
      'Infrastructure': 'bg-blue-500',
      'Water Supply': 'bg-cyan-500',
      'Electricity': 'bg-yellow-500',
      'Health & Sanitation': 'bg-purple-500'
    }
    return colors[dept] || 'bg-gray-500'
  }

  // Calculate center of all complaints
  const centerLat = sampleComplaints.reduce((sum, c) => sum + (c.coordinates?.lat || 0), 0) / sampleComplaints.length
  const centerLng = sampleComplaints.reduce((sum, c) => sum + (c.coordinates?.lng || 0), 0) / sampleComplaints.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-indian-orange transition-colors"
          >
            CityFix Agent
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/submit')}
              className="px-4 py-2 bg-indian-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              New Complaint
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-indian-orange transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-indian-orange to-indian-green">
            <h2 className="text-3xl font-bold text-white mb-2">Complaint Map View</h2>
            <p className="text-white/90">Interactive visualization of civic complaints across India</p>
          </div>

          {/* Legend */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">Status Legend:</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-700">Escalated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-700">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-700">Resolved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-700">New</span>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative">
            {/* Embedded Google Maps */}
            <div className="w-full h-[600px]">
              <iframe
                width="100%"
                height="600"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${centerLat},${centerLng}&zoom=5`}
              ></iframe>
            </div>

            {/* Complaint Pins Overlay (Simulated) */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="relative w-full h-full">
                {sampleComplaints.map((complaint, index) => {
                  // Position pins at semi-random but consistent positions
                  const top = 15 + (index % 6) * 15
                  const left = 10 + (index % 8) * 11
                  return (
                    <button
                      key={complaint.id}
                      onClick={() => setSelectedComplaint(complaint)}
                      className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform cursor-pointer"
                      style={{
                        top: `${top}%`,
                        left: `${left}%`
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-full shadow-lg border-2 border-white"
                        style={{ backgroundColor: getStatusColor(complaint.status) }}
                      ></div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Complaints List */}
          <div className="p-6 max-h-96 overflow-y-auto bg-gray-50">
            <h3 className="font-bold text-gray-800 mb-4 text-xl">All Complaints ({sampleComplaints.length})</h3>
            <div className="space-y-3">
              {sampleComplaints.map(complaint => (
                <div
                  key={complaint.id}
                  onClick={() => setSelectedComplaint(complaint)}
                  className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`${getDepartmentColor(complaint.department)} text-white text-xs px-3 py-1 rounded-full font-semibold`}>
                      {complaint.department}
                    </span>
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getStatusColor(complaint.status) }}
                    ></span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">{complaint.text}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>📍 {complaint.location}</span>
                    <span>•</span>
                    <span>{complaint.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Selected Complaint Modal */}
      {selectedComplaint && (
        <div
          onClick={() => setSelectedComplaint(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Complaint Details</h3>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className={`${getDepartmentColor(selectedComplaint.department)} text-white px-4 py-2 rounded-lg font-semibold`}>
                  {selectedComplaint.department}
                </span>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-1">Complaint ID</p>
                <p className="text-lg font-mono font-bold text-indian-orange">{selectedComplaint.id}</p>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-1">Description</p>
                <p className="text-gray-800">{selectedComplaint.text}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Location</p>
                  <p className="text-gray-800 font-semibold">📍 {selectedComplaint.location}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getStatusColor(selectedComplaint.status) }}
                    ></div>
                    <span className="text-gray-800 font-semibold">{selectedComplaint.status}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Priority</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xl ${
                      selectedComplaint.priority === 'High' ? '🔴' :
                      selectedComplaint.priority === 'Medium' ? '🟡' : '🟢'
                    }`}></span>
                    <span className="text-gray-800 font-semibold">{selectedComplaint.priority}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Estimated Resolution</p>
                  <p className="text-gray-800 font-semibold">{selectedComplaint.estimatedResolution}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
