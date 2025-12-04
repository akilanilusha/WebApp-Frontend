import { ChevronDown } from "lucide-react";

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => (
  <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10 animate-slide-up animation-delay-600">
    <div className="bg-white rounded-3xl shadow-2xl p-6 backdrop-blur-lg border border-gray-100">
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{ animationDelay: `${idx * 100}ms` }}
              className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 animate-fade-in ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl shadow-blue-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} className={`transition-transform group-hover:rotate-12 ${isActive ? 'animate-bounce-slow' : ''}`} />
              <span>{cat.name}</span>
              {isActive && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);
export default CategoryFilter;
