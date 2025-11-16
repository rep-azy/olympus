import React from 'react'
import { Link } from 'react-router-dom'

const Geomap = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation header */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <span>Back to Portfolio</span>
          </Link>
          <h1 className="text-xl font-bold">GEOMAP - Live Demo</h1>
          <div className="w-32" /> {/* Spacer for centering */}
        </div>
      </nav>

      {/* Demo content area */}
      <div className="pt-20 px-6">
        <div className="container mx-auto max-w-7xl py-12">
          {/* Demo Header */}
          <div className="mb-12 text-center">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Geomap Emergency System
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Interactive demonstration of the emergency reporting system
            </p>
          </div>

          {/* Demo Container */}
          <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
            {/* Your actual demo content goes here */}
            <div className="p-8 min-h-[600px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 text-lg mb-4">
                  Replace this section with your actual Geomap demo components
                </p>
                <p className="text-gray-600 text-sm">
                  Import and render your demo components here
                </p>
              </div>
            </div>
          </div>

          {/* Optional: Demo Info Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
              <h3 className="text-xl font-bold mb-2">Features</h3>
              <p className="text-gray-400 text-sm">
                Emergency reporting, real-time tracking, and admin dashboard
              </p>
            </div>
            <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
              <h3 className="text-xl font-bold mb-2">Technologies</h3>
              <p className="text-gray-400 text-sm">
                React, Firebase, Material UI, TailwindCSS
              </p>
            </div>
            <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
              <h3 className="text-xl font-bold mb-2">Status</h3>
              <p className="text-gray-400 text-sm">
                Live Demo - Development Build
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Geomap