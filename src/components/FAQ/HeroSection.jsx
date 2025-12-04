import { Sparkles, Search } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";


const HeroSection = ({ searchTerm, setSearchTerm }) => (
  <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white">
    <AnimatedBackground />
    
    <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
      <div className="text-center space-y-8">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 animate-fade-in">
          
          <span className="text-sm font-medium text-cyan-100">Your Travel Questions Answered</span>
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-slide-up bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
          How Can We Help?
        </h1>
        
        <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto animate-slide-up animation-delay-200">
          Explore our comprehensive guide to bookings, rides, and travel plans
        </p>
        
        <div className="max-w-3xl mx-auto relative animate-slide-up animation-delay-400">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-lg opacity-50"></div>
          <div className="relative bg-white rounded-3xl shadow-2xl p-2">
            <div className="flex items-center gap-4">
              <Search className="ml-4 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Search for anything..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 py-4 text-lg text-gray-800 bg-transparent focus:outline-none placeholder-gray-400"
              />
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f0f9ff"/>
      </svg>
    </div>
  </div>
);
export default HeroSection;
