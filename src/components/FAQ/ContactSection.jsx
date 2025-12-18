import { Phone, Mail, MessageCircle } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";

const ContactSection = () => (
  <div className="max-w-7xl mx-auto px-6 py-20">
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 rounded-3xl shadow-2xl p-12 lg:p-16">
      <AnimatedBackground />
      
      <div className="relative z-10 text-center text-white space-y-8">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
          <MessageCircle size={18} className="text-cyan-300" />
          <span className="text-sm font-medium">Need More Help?</span>
        </div>
        
        <h2 className="text-4xl lg:text-5xl font-bold">Still Have Questions?</h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
          Our dedicated support team is ready to assist you around the clock
        </p>
        
        <div className="flex flex-wrap gap-6 justify-center pt-4">
          <a
            href="tel:+1234567890"
            className="group relative flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <Phone size={22} className="group-hover:rotate-12 transition-transform" />
            <span>Call Us Now</span>
          </a>
          <a
            href="mailto:support@example.com"
            className="group relative flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-5 rounded-2xl font-bold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all"
          >
            <Mail size={22} className="group-hover:rotate-12 transition-transform" />
            <span>Email Support</span>
          </a>
        </div>
      </div>
    </div>
  </div>
);
export default ContactSection;