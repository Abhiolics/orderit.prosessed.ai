"Use client"
import { ArrowDown,  Database, FileText, Mail, MessageSquare, Phone, Users } from "lucide-react"

export default function IntegrationComponent() {
  // Source systems data
  const sourceSystems = [
    { name: "Sales Person", icon: <Users className="w-6 h-6" /> },
    { name: "Emails", icon: <Mail className="w-6 h-6" /> },
    { name: "Customer Portal", icon: <MessageSquare className="w-6 h-6" /> },
    { name: "PDF", icon: <FileText className="w-6 h-6" /> },
    { name: "Tesxt Message", icon: <Database className="w-6 h-6" /> },
    { name: "Calls", icon: <Phone className="w-6 h-6" /> },
  ]

  // Aera AI subsystems
  const subsystems = [
    { name: "Sales Rep App", description: "Intelligent sales data processing" },
    { name: "OrderIT AI Agent", description: "Business process automation" },
    { name: "Customer Portal", description: "Enhanced customer experience" },
  ]

  // Backend systems
  const backendSystems = [
    { name: "ERP", description: "Enterprise Resource Planning" },
    { name: "SAP", description: "Systems Applications and Products" },
    { name: "MYOB", description: "Mind Your Own Business" },
    { name: "Xero", description: "Cloud-based accounting software" },
    { name: "NetSuite", description: "Cloud business management suite" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-950 text-white p-4 md:p-8 lg:p-12">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMCAwYzE0NC4xODMgMTI3LjY0OSAyODguMzY2IDI1NS4yOTggNDMyLjU0OSAyNTUuMjk4UzEyOTUuNjQ5IDAgMTQ0MCAwdjc2MEgwVjB6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4yIi8+PC9zdmc+')]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full transform rotate-180 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMCAwYzE0NC4xODMgMTI3LjY0OSAyODguMzY2IDI1NS4yOTggNDMyLjU0OSAyNTUuMjk4UzEyOTUuNjQ5IDAgMTQ0MCAwdjc2MEgwVjB6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4yIi8+PC9zdmc+')]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
          Orders From
        </h1>

        {/* Source Systems */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {sourceSystems.map((system, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-2 text-blue-400">{system.icon}</div>
              <h3 className="font-medium">{system.name}</h3>
            </div>
          ))}
        </div>

        {/* Connection Lines */}
        <div className="flex justify-center mb-4">
          <div className="w-0 h-16 border-l-2 border-dashed border-blue-400 relative">
            <ArrowDown className="absolute -bottom-4 -left-3 text-blue-400 w-6 h-6" />
          </div>
        </div>

        {/* Aera AI Core */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-blue-400/20 to-purple-500/20 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-xl">
            <div className="p-6 text-center border-b border-white/20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                <span className="text-2xl font-bold">AI</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">OrderIT AI</h2>
              <p className="text-white/70 mt-2">Intelligent Order Management Assistant</p>
            </div>

            {/* Subsystems */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
              {subsystems.map((subsystem, index) => (
                <div key={index} className="p-4 text-center">
                  <h3 className="font-medium mb-1">{subsystem.name}</h3>
                  <p className="text-sm text-white/70">{subsystem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Connection Lines */}
        <div className="flex justify-center mb-4">
          <div className="w-0 h-16 border-l-2 border-dashed border-blue-400 relative">
            <ArrowDown className="absolute -bottom-4 -left-3 text-blue-400 w-6 h-6" />
          </div>
        </div>

        {/* Backend Systems */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <div className="flex flex-wrap justify-center gap-4">
              {backendSystems.map((system, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-lg px-4 py-3 flex items-center hover:bg-white/20 transition-all duration-300"
                >
                  <Database className="w-5 h-5 mr-2 text-blue-400" />
                  <span>{system.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="max-w-2xl mx-auto text-center bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-2">That&apos;s not Done!</h3>
          <p className="text-white/80 mb-4">You can do lot More with Prosessed.ai</p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1">
            Explore More 
          </button>
        </div>

        
      </div>
    </div>
  )
}

