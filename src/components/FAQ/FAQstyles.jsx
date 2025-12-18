const FAQstyles = () => (
  <style>{`
    @keyframes blob {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
    }
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    .animate-blob { animation: blob 7s infinite; }
    .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
    .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
    .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
    .animation-delay-200 { animation-delay: 200ms; }
    .animation-delay-400 { animation-delay: 400ms; }
    .animation-delay-600 { animation-delay: 600ms; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-4000 { animation-delay: 4s; }
  `}</style>
);
export default FAQstyles;
