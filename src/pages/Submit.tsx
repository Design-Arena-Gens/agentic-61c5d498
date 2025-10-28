import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AnalysisResult {
  department: string;
  confidence: number;
  priority: string;
  estimatedResolution: string;
  complaintId: string;
}

export default function Submit() {
  const navigate = useNavigate()
  const [complaint, setComplaint] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

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

  const analyzeComplaint = (text: string) => {
    const lowerText = text.toLowerCase()

    let department = 'Infrastructure'
    if (lowerText.includes('garbage') || lowerText.includes('waste') || lowerText.includes('trash') || lowerText.includes('dump')) {
      department = 'Waste Management'
    } else if (lowerText.includes('water') || lowerText.includes('sewage') || lowerText.includes('drain') || lowerText.includes('pipe')) {
      department = 'Water Supply'
    } else if (lowerText.includes('electricity') || lowerText.includes('power') || lowerText.includes('light') || lowerText.includes('transformer')) {
      department = 'Electricity'
    } else if (lowerText.includes('health') || lowerText.includes('sanitation') || lowerText.includes('toilet') || lowerText.includes('mosquito') || lowerText.includes('animal')) {
      department = 'Health & Sanitation'
    }

    const urgentKeywords = ['urgent', 'emergency', 'dangerous', 'accident', 'fire', 'hazard', 'risk']
    const isUrgent = urgentKeywords.some(keyword => lowerText.includes(keyword))

    const priority = isUrgent ? 'High' : Math.random() > 0.5 ? 'Medium' : 'Low'
    const confidence = Math.floor(90 + Math.random() * 9)

    const resolutionTimes: { [key: string]: string } = {
      'High': Math.random() > 0.5 ? '12 hours' : '24 hours',
      'Medium': Math.random() > 0.5 ? '24 hours' : '36 hours',
      'Low': Math.random() > 0.5 ? '48 hours' : '72 hours'
    }

    return {
      department,
      confidence,
      priority,
      estimatedResolution: resolutionTimes[priority],
      complaintId: `CFX-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!complaint || !location) return

    setLoading(true)
    setResult(null)
    setShowSuccess(false)

    await new Promise(resolve => setTimeout(resolve, 2000))

    const analysisResult = analyzeComplaint(complaint)
    setResult(analysisResult)
    setLoading(false)
    setShowSuccess(true)

    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleReset = () => {
    setComplaint('')
    setLocation('')
    setResult(null)
    setShowSuccess(false)
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
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-indian-orange transition-colors"
            >
              Dashboard
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

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-20 right-6 bg-indian-green text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-slide-in">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <span className="font-semibold">Complaint submitted successfully!</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Submit Civic Complaint</h2>
          <p className="text-gray-600 mb-8">AI-powered complaint analysis and routing</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Describe your civic complaint
              </label>
              <textarea
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                placeholder="Example: Large pothole on MG Road near school causing accidents..."
                className="w-full h-40 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indian-orange focus:outline-none transition-colors resize-none"
                maxLength={400}
                required
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {complaint.length}/400 characters
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., MG Road, Kanpur"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indian-orange focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-8 py-4 bg-indian-orange text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-orange-600 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Analyzing...' : 'Submit Complaint'}
              </button>
              {result && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-4 bg-gray-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-700 transform hover:scale-105 transition-all"
                >
                  New Complaint
                </button>
              )}
            </div>
          </form>

          {/* Loading Animation */}
          {loading && (
            <div className="mt-12 text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indian-orange mb-4"></div>
              <p className="text-xl text-gray-700 font-semibold">AI Agent analyzing your complaint...</p>
              <p className="text-gray-500 mt-2">Classifying department and priority</p>
            </div>
          )}

          {/* Analysis Result */}
          {result && !loading && (
            <div className="mt-12 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🤖</span>
                <h3 className="text-2xl font-bold text-gray-800">AI Analysis Complete</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 mb-2 font-semibold">Department</p>
                  <div className="flex items-center gap-2">
                    <span className={`${getDepartmentColor(result.department)} text-white px-4 py-2 rounded-lg font-semibold text-lg`}>
                      {result.department}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 mb-2 font-semibold">Confidence</p>
                  <p className="text-3xl font-bold text-indian-green">{result.confidence}%</p>
                </div>

                <div>
                  <p className="text-gray-600 mb-2 font-semibold">Priority</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl ${
                      result.priority === 'High' ? '🔴' :
                      result.priority === 'Medium' ? '🟡' : '🟢'
                    }`}></span>
                    <span className="text-xl font-bold text-gray-800">{result.priority}</span>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 mb-2 font-semibold">Estimated Resolution</p>
                  <p className="text-xl font-bold text-gray-800">{result.estimatedResolution}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <p className="text-gray-600 mb-2 font-semibold">Complaint ID</p>
                <p className="text-2xl font-mono font-bold text-indian-orange">{result.complaintId}</p>
                <p className="text-sm text-gray-500 mt-2">Use this ID to track your complaint status</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
