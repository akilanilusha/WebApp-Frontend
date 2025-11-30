import React, { useState } from "react";
import Styles from "../components/FAQ/FAQstyles";

import HeroSection from "../components/FAQ/HeroSection";
import CategoryFilter from "../components/FAQ/CategoryFilter";
import FAQList from "../components/FAQ/FAQList";
import StatsBar from "../components/FAQ/StatsBar";
import ContactSection from "../components/FAQ/ContactSection";
import TrustBadges from "../components/FAQ/TrustBadges";
import { Plane, Car, CreditCard, MapPin, Globe } from "lucide-react";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Topics', icon: MapPin },
    { id: 'booking', name: 'Booking', icon: Plane },
    { id: 'rides', name: 'Rides', icon: Car },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'plans', name: 'Travel Plans', icon: Globe },
  ];

  const faqs = [
    {
      category: 'booking',
      question: 'How do I book a trip with your platform?',
      answer: 'Simply browse our curated destinations, select your preferred dates and travel preferences, then click "Book Now". Our intelligent booking system guides you through a seamless checkout process where you can customize every aspect of your journey and complete your reservation securely.'
    },
    {
      category: 'booking',
      question: 'Can I modify or cancel my booking after confirmation?',
      answer: 'Yes! You have full flexibility to modify your booking up to 48 hours before departure through your personalized dashboard. Changes are subject to availability and any applicable fare differences. Our system makes modifications quick and hassle-free.'
    },
    {
      category: 'rides',
      question: 'What types of ride services do you offer?',
      answer: 'We provide a comprehensive range of transportation options including economy rides for budget travelers, premium vehicles for enhanced comfort, and luxury experiences for those seeking the finest service. All our vehicles undergo regular maintenance and our drivers are professionally vetted and trained.'
    },
    {
      category: 'rides',
      question: 'How far in advance should I schedule a ride?',
      answer: 'Our flexible system allows you to book rides up to 30 days in advance or request immediate pickup based on real-time availability. For airport transfers and special events, we recommend booking at least 24 hours ahead to ensure optimal vehicle selection.'
    },
    {
      category: 'payment',
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit and debit cards including Visa, Mastercard, and American Express, plus digital payment solutions like PayPal, Apple Pay, and Google Pay. All transactions are processed through our secure, encrypted payment gateway.'
    },
    {
      category: 'payment',
      question: 'How secure is my payment information?',
      answer: 'Your security is our top priority. We employ bank-level 256-bit SSL encryption and maintain PCI DSS compliance. Your payment data is tokenized and never stored on our servers, ensuring maximum protection against unauthorized access.'
    },
    {
      category: 'plans',
      question: 'What\'s included in your curated travel plans?',
      answer: 'Our expertly designed travel plans offer comprehensive packages including carefully selected accommodations, all necessary transportation, guided tours with knowledgeable local experts, and select meals showcasing regional cuisine. Each itinerary is crafted by seasoned travel specialists.'
    },
    {
      category: 'plans',
      question: 'Can I customize a pre-made travel plan?',
      answer: 'Absolutely! Every travel plan is fully customizable to match your unique preferences. Add or remove activities, upgrade accommodations, adjust the pace of your itinerary, and include special experiences. Our platform makes personalization intuitive and enjoyable.'
    },
    {
      category: 'booking',
      question: 'What is your cancellation and refund policy?',
      answer: 'Cancellations made 7 or more days before departure receive a full refund. For cancellations 3-6 days prior, you\'ll receive a 50% refund. Less than 3 days: you\'ll receive credit toward a future booking. Premium and custom plans may have different terms which are clearly outlined at booking.'
    },
    {
      category: 'rides',
      question: 'Do you provide airport pickup and drop-off services?',
      answer: 'Yes! We offer comprehensive 24/7 airport transportation services. Your professional driver monitors your flight status in real-time and automatically adjusts pickup time for any delays, ensuring you never wait or worry about missing your ride.'
    },
  ];

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      <Styles />
      <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CategoryFilter 
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <StatsBar />
      <FAQList 
        faqs={filteredFaqs}
        openItems={openItems}
        toggleItem={toggleItem}
      />
      <ContactSection />
      <TrustBadges />
    </div>
  );
};

export default FAQ;