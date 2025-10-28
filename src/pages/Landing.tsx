import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indian-orange via-orange-400 to-indian-green">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">CityFix Agent</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-white hover:text-gray-100 transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/map')}
              className="text-white hover:text-gray-100 transition-colors"
            >
              Map View
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            CityFix Agent
            <br />
            <span className="text-4xl md:text-5xl">
              Autonomous AI for Responsive Civic Governance
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            India's first autonomous AI system managing civic complaints from submission to resolution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/submit')}
              className="px-8 py-4 bg-indian-orange text-white text-lg font-semibold rounded-lg shadow-xl hover:bg-orange-600 transform hover:scale-105 transition-all"
            >
              Submit Complaint
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-gray-800 text-white text-lg font-semibold rounded-lg shadow-xl hover:bg-gray-700 transform hover:scale-105 transition-all"
            >
              View Dashboard
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white shadow-2xl hover:transform hover:scale-105 transition-all">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-3">Instant AI Classification</h3>
            <p className="text-white/80">
              Advanced AI algorithms categorize and prioritize complaints in seconds, ensuring rapid response times
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white shadow-2xl hover:transform hover:scale-105 transition-all">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-3">Smart Auto-Routing</h3>
            <p className="text-white/80">
              Intelligent department assignment with 95%+ accuracy, eliminating manual sorting and delays
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white shadow-2xl hover:transform hover:scale-105 transition-all">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold mb-3">Complete Transparency</h3>
            <p className="text-white/80">
              Real-time status tracking and updates keep citizens informed at every step of the resolution process
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-white/70">
        <p className="text-lg">Built by <span className="font-semibold">Código Sereno</span></p>
      </footer>
    </div>
  )
}
