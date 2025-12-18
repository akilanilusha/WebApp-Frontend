import { Globe, Clock, TrendingUp, Shield } from "lucide-react";

const StatsBar = () => {
  const stats = [
    { icon: Globe, value: '150+', label: 'Destinations' },
    { icon: Clock, value: '24/7', label: 'Support' },
    { icon: TrendingUp, value: '99.9%', label: 'Uptime' },
    { icon: Shield, value: '100%', label: 'Secure' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              style={{ animationDelay: `${idx * 100}ms` }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 animate-fade-in"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl mb-4">
                <Icon size={28} className="text-blue-600" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default StatsBar;