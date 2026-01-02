import React, { useState, useEffect, useRef } from 'react';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Andrew Simon",
      role: "Traveller",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      text: "The home boasts sleek, contemporary architecture with clean lines and expansive windows, allowing natural light to flood the interiors. It incorporates passive design principles.",
      rating: 5
    },
    {
      id: 2,
      name: "Alex Jordan",
      role: "Traveller",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      text: "Solar panels adorn the roof, harnessing renewable energy to power the home and even feed excess electricity back into the grid. High-performance insulation and triple-glazed windows enhance energy efficiency.",
      rating: 5,
      badge: "99"
    },
    {
      id: 3,
      name: "Maria Doe",
      role: "Traveller",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      text: "A home that perfectly balances sustainability with luxury. From the moment I stepped into this community, I knew this was where I wanted to live. Truly eco-friendly living.",
      rating: 5
    },

    {
      id: 4,
      name: "Milindu Jordan",
      role: "Traveller",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      text: "Solar panels adorn the roof, harnessing renewable energy to power the home and even feed excess electricity back into the grid. High-performance insulation and triple-glazed windows enhance energy efficiency.",
      rating: 3,
      badge: "99"
    },
  ];

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    
    if (walk < -100) {
      nextSlide();
      setIsDragging(false);
    } else if (walk > 100) {
      prevSlide();
      setIsDragging(false);
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 30) {
        nextSlide();
      } else if (e.deltaX < -30) {
        prevSlide();
      }
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    const normalizedDiff = diff < -1 ? diff + testimonials.length : diff > 1 ? diff - testimonials.length : diff;
    
    let transform = '';
    let width = '';
    let opacity = 0;
    let scale = 0.85;
    let zIndex = 0;

    if (normalizedDiff === 0) {
      transform = 'translateX(0%) translateY(-35px) scale(1)';
      opacity = 1;
      scale = 1;
      zIndex = 3;
      width = '100%';
    } else if (normalizedDiff === -1) {
      transform = 'translateX(-85%) translateY(0) scale(0.9)';
      opacity = 0.7;
      scale = 0.9;
      zIndex = 2;
      width = '80%';
    } else if (normalizedDiff === 1) {
      transform = 'translateX(85%) translateY(0) scale(0.9)';
      opacity = 0.7;
      scale = 0.9;
      zIndex = 2;
      width = '80%';
    } else {
      transform = normalizedDiff < 0 ? 'translateX(-100%)' : 'translateX(100%)';
      opacity = 0;
    }

    return {
      transform,
      opacity,
      zIndex,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  const StarRating = ({ rating }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-xl">★</span>
      ))}
    </div>
  );

  return (
    <div className="min-h-full w-full py-16 px-4">
      <div className="w-full mx-auto overflow-hidden">
        

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
          className="relative h-96 flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ userSelect: 'none' }}
        >
          {/* Cards */}
          <div className="relative w-full h-full flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="absolute w-full max-w-2xl"
                style={getCardStyle(index)}
              >
                <div className="bg-white rounded-3xl shadow-xl p-10 mx-auto relative border border-gray-200">
                  {/* Profile Section */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-cyan-100"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                        <p className="text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {testimonial.text}
                  </p>

                  {/* Badge if exists
                  {testimonial.badge && (
                    <div className="absolute bottom-10 right-10">
                      <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-3xl font-bold">{testimonial.badge}</span>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => !isAnimating && setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-cyan-500 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;