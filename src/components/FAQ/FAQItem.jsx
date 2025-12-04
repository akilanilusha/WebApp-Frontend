import { ChevronDown } from "lucide-react";

const FAQItem = ({ faq, index, isOpen, onToggle }) => (
  <div
    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 animate-fade-in"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <button
      onClick={onToggle}
      className="w-full px-8 py-6 flex items-start justify-between text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-300"
    >
      <div className="flex items-start gap-4 flex-1">
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg' 
            : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-cyan-100'
        }`}>
          <span className={`font-bold ${isOpen ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <span className="font-semibold text-gray-800 text-lg pr-4 leading-relaxed group-hover:text-blue-600 transition-colors">
          {faq.question}
        </span>
      </div>
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'bg-blue-100 rotate-180' : 'bg-gray-100 group-hover:bg-blue-50'
      }`}>
        <ChevronDown size={20} className={`transition-colors ${isOpen ? 'text-blue-600' : 'text-gray-600'}`} />
      </div>
    </button>
    
    <div
      className={`transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-8 pb-8">
        <div className="pl-14">
          <div className="h-px bg-gradient-to-r from-blue-200 via-cyan-200 to-transparent mb-6"></div>
          <p className="text-gray-600 leading-relaxed text-lg">{faq.answer}</p>
        </div>
      </div>
    </div>
  </div>
);
export default FAQItem;