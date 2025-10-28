import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sampleComplaints } from '../data/complaints'

export default function Dashboard() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<string>('All')
  const [showSimulation, setShowSimulation] = useState(false)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [simulationComplete, setSimulationComplete] = useState(false)

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

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'New': 'bg-blue-100 text-blue-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Escalated': 'bg-red-100 text-red-800',
      'Resolved': 'bg-green-100 text-green-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60))
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  const filteredComplaints = filter === 'All'
    ? sampleComplaints
    : sampleComplaints.filter(c => c.department.includes(filter))

  const stats = {
    total: sampleComplaints.length,
    pending: sampleComplaints.filter(c => c.status === 'Pending').length,
    escalated: sampleComplaints.filter(c => c.status === 'Escalated').length,
    resolved: sampleComplaints.filter(c => c.status === 'Resolved').length
  }

  const runSimulation = async () => {
    setShowSimulation(true)
    setSimulationProgress(0)
    setSimulationComplete(false)

    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 80))
      setSimulationProgress(i)
    }

    setSimulationComplete(true)
  }

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
              onClick={() => navigate('/map')}
              className="text-gray-600 hover:text-indian-orange transition-colors"
            >
              Map View
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <p className="text-gray-600 text-sm font-semibold mb-1">Total Complaints</p>
            <p className="text-4xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <p className="text-gray-600 text-sm font-semibold mb-1">Pending</p>
            <p className="text-4xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <p className="text-gray-600 text-sm font-semibold mb-1">Escalated</p>
            <p className="text-4xl font-bold text-red-600">{stats.escalated}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <p className="text-gray-600 text-sm font-semibold mb-1">Resolved</p>
            <p className="text-4xl font-bold text-green-600">{stats.resolved}</p>
          </div>
        </div>

        {/* Filters and Demo Button */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {['All', 'Waste', 'Infrastructure', 'Water', 'Electricity', 'Health'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filter === f
                      ? 'bg-indian-orange text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button
              onClick={runSimulation}
              className="px-6 py-2 bg-indian-green text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
            >
              🎬 Demo Mode
            </button>
          </div>
        </div>

        {/* Complaints Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComplaints.map(complaint => (
            <div
              key={complaint.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:transform hover:scale-105 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`${getDepartmentColor(complaint.department)} text-white text-xs px-3 py-1 rounded-full font-semibold`}>
                  {complaint.department}
                </span>
                <span className={`text-xl ${
                  complaint.priority === 'High' ? '🔴' :
                  complaint.priority === 'Medium' ? '🟡' : '🟢'
                }`}></span>
              </div>

              <p className="text-gray-800 mb-4 line-clamp-3">{complaint.text}</p>

              <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                <span>📍</span>
                <span>{complaint.location}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{getTimeAgo(complaint.timestamp)}</span>
                <span className={`${getStatusColor(complaint.status)} text-xs px-3 py-1 rounded-full font-semibold`}>
                  {complaint.status}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500 font-mono">{complaint.id}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Simulation Modal */}
      {showSimulation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">AI Simulation Running</h3>

            {!simulationComplete ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 font-semibold">Processing complaints...</span>
                    <span className="text-indian-orange font-bold">{simulationProgress}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-indian-orange to-indian-green h-4 rounded-full transition-all duration-300"
                      style={{ width: `${simulationProgress}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-gray-600 text-center">
                  AI Agent analyzing, classifying, and routing complaints...
                </p>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">✓</span>
                    <h4 className="text-2xl font-bold text-green-700">Simulation Complete!</h4>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Complaints processed:</span>
                      <span className="text-2xl font-bold text-gray-800">100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Processing time:</span>
                      <span className="text-2xl font-bold text-gray-800">8 seconds</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Classification accuracy:</span>
                      <span className="text-2xl font-bold text-green-600">95%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Duplicates detected:</span>
                      <span className="text-2xl font-bold text-blue-600">38</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Auto-escalated:</span>
                      <span className="text-2xl font-bold text-red-600">12</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h5 className="font-bold text-gray-800 mb-3">Distribution by Department:</h5>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Waste Management:</span>
                      <span className="font-bold">31</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Infrastructure:</span>
                      <span className="font-bold">27</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Water Supply:</span>
                      <span className="font-bold">19</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Electricity:</span>
                      <span className="font-bold">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Health & Sanitation:</span>
                      <span className="font-bold">8</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowSimulation(false)
                    setSimulationComplete(false)
                  }}
                  className="w-full px-6 py-3 bg-indian-orange text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
