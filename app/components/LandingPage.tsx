"use client"
import { Sparkles } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-950">
      {/* Background wave patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMCAwYzE0NC4xODMgMTI3LjY0OSAyODguMzY2IDI1NS4yOTggNDMyLjU0OSAyNTUuMjk4UzEyOTUuNjQ5IDAgMTQ0MCAwdjc2MEgwVjB6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4yIi8+PC9zdmc+')]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full transform rotate-180 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMCAwYzE0NC4xODMgMTI3LjY0OSAyODguMzY2IDI1NS4yOTggNDMyLjU0OSAyNTUuMjk4UzEyOTUuNjQ5IDAgMTQ0MCAwdjc2MEgwVjB6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4yIi8+PC9zdmc+')]"></div>
      </div>

      {/* Circular patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full border border-white/10 translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full border border-white/10 translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full border border-white/10 translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl">
            Get Orders from  <span className=" decoration-2 underline-offset-4">All Places</span> to{" "}
            <span className=" decoration-2 underline-offset-4">directly into your ERP/Accounting Software</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/90 mb-16 max-w-2xl">
          Say "Goodbye" to complex order management—chat with OrderIT AI, your smart ordering assistant.
          </p>

          {/* Say Hello to */}
          <p className="text-2xl md:text-3xl font-medium text-white mb-8">Say Hello to</p>

          {/* Aera AI Logo */}
          <div className="relative mb-6 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
          </div>

          {/* Aera AI Text */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-wide">OrderIT AI</h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-12">
          Your AI-powered order management assistant that understands your needs—even when you're unsure how to explain them.
          </p>

          {/* CTA Button */}
          <button className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1">
            Get Started
          </button>
        </div>
      </div>
    </main>
  )
}

