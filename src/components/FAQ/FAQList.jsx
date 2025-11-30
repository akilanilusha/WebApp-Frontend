import FAQItem from "./FAQItem";
import { Search } from "lucide-react";

const FAQList = ({ faqs, openItems, toggleItem }) => (
  <div className="max-w-5xl mx-auto px-6 py-16">
    {faqs.length === 0 ? (
      <div className="text-center py-20 animate-fade-in">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl mb-6 shadow-lg">
          <Search size={48} className="text-blue-500" />
        </div>
        <h3 className="text-3xl font-bold text-gray-700 mb-4">No results found</h3>
        <p className="text-xl text-gray-500">Try adjusting your search or browse all topics</p>
      </div>
    ) : (
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            index={index}
            isOpen={openItems.has(index)}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    )}
  </div>
);
export default FAQList;