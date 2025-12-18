import { Shield, Clock, Plane } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Bank-level encryption protects your data',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for you',
      gradient: 'from-cyan-500 to-cyan-600',
    },
    {
      icon: Plane,
      title: 'Best Prices',
      description: 'Guaranteed competitive rates always',
      gradient: 'from-sky-500 to-sky-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              style={{ animationDelay: `${idx * 150}ms` }}
              className="group bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 animate-fade-in"
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${badge.gradient} rounded-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={36} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{badge.title}</h3>
              <p className="text-gray-600 leading-relaxed">{badge.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TrustBadges;