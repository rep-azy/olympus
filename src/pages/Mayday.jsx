import React from 'react'
import { Link } from 'react-router-dom'

const Mayday = () => {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Side - Mobile App Demo */}
      <div className="w-1/3 min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-8 border-r border-neutral-800">
        {/* Phone Mockup Container */}
        <div className="relative">
          {/* Phone Frame */}
          <div className="relative w-[340px] h-[700px] bg-neutral-900 rounded-[40px] border-[8px] border-neutral-800 shadow-2xl overflow-hidden">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
            
            {/* Screen Content Area */}
            <div className="w-full h-full bg-white overflow-hidden">
              {/* Your Mobile App Content Goes Here */}
              <div className="flex items-center justify-center h-full bg-gradient-to-b from-blue-500 to-purple-600">
                <div className="text-center px-6">
                  <div className="text-white text-6xl mb-4">📱</div>
                  <p className="text-white font-semibold text-lg mb-2">Mobile App Demo</p>
                  <p className="text-white/80 text-sm">
                    Import your mobile app component here
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Back Button (Floating) */}
          <Link 
            to="/" 
            className="absolute -top-12 left-0 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg> */}
            <span>Back</span>
          </Link>
        </div>
      </div>

      {/* Right Side - Dashboard Demo */}
      <div className="flex-1 min-h-screen bg-black overflow-auto">
        {/* Dashboard Content Area */}
        <div className="w-full h-full p-8">
          {/* Your Dashboard Content Goes Here */}
          <div className="h-full bg-neutral-900 rounded-2xl border border-neutral-800 p-8">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-6xl mb-6">🖥️</div>
              <h2 className="text-3xl font-bold mb-4 text-white">Dashboard Demo</h2>
              <p className="text-gray-400 text-center max-w-md">
                Import and render your admin dashboard components here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mayday;