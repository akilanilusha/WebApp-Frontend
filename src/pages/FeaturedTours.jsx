import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Clock,Car,UserCheck,MapPin,Hotel,Info, ChevronLeft, ChevronRight } from "lucide-react";

const parseDuration = (str) => {
  const match = str?.match(/(\d+)/);
  return match ? parseInt(match[0], 10) : 0;
};

const VEHICLE_CAPACITY = {
  "ECONOMY": 4,
  SUV: 8,
  "Luxury Van": 15,
};

export default function FeaturedTours() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [viewedPkg, setviewedPkg] = useState(null);
  const [sortBy, setSortBy] = useState("Recommended");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  
  const [filters, setFilters] = useState({
    search: "",
    maxPrice: 5000,
    duration: "Any Duration", 
    vehicle: "All Vehicles",
    guide: "Any Guide",
    popularOnly: false,
    familyFriendly: false,
  });

  // Fetch packages
  useEffect(() => {
    axios
      .get("http://localhost:8084/api/packages")
      .then((res) => setPackages(res.data || []))
      .catch((err) => console.error("Failed to load packages", err))
      .finally(() => setLoading(false));
  }, []);

  // Filter Logic
  const filteredPackages = useMemo(() => {
    let result= packages.filter((pkg) => {
   
      const priceMatch = pkg.price <= filters.maxPrice;
      let durationMatch = true;
      const days = parseDuration(pkg.duration);
      if (filters.duration === "1-3 Days") durationMatch = days >= 1 && days <= 3;
      else if (filters.duration === "4-7 Days") durationMatch = days >= 4 && days <= 7;
      else if (filters.duration === "8-14 Days") durationMatch = days >= 8 && days <= 14;
      else if (filters.duration === "15+ Days") durationMatch = days >= 15;

      const vehicleMatch =
        filters.vehicle === "All Vehicles" ||
        pkg.vehicle?.toLowerCase().includes(filters.vehicle.replace("All ", "").toLowerCase());

      const guideMatch =
        filters.guide === "Any Guide" || pkg.guide === filters.guide;

      const popularMatch = !filters.popularOnly || pkg.popular === true;

      const searchLower = filters.search.toLowerCase();
      const searchMatch =
        pkg.name?.toLowerCase().includes(searchLower) ||
        pkg.destinations?.some((d) => d.toLowerCase().includes(searchLower));

      return (
        priceMatch &&
        durationMatch &&
        vehicleMatch &&
        guideMatch &&
        popularMatch &&
        searchMatch
      );
    });
    
      if (sortBy === "Price: Low to High") {
        result.sort((a, b) => a.price - b.price);
      } else if (sortBy === "Price: High to Low") {
        result.sort((a, b) => b.price - a.price);
      }
      return result;
    }, [packages, filters,sortBy]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPackages = filteredPackages.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);


   const handleFilterChange = (key, value) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
   };

    const clearFilters = () => {
      setFilters({
        search: "",
        maxPrice: 5000,
        duration: "Any Duration",
        vehicle: "All Vehicles",
        guide: "Any Guide",
        popularOnly: false,
        familyFriendly: false,
      });
    };

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      );
    }

  return (
    <div className="flex bg-gray-50 font-sans min-h-screen">
      {/* --- sidebar filters --- */}
      <aside className="w-80 bg-white shadow-lg p-6 flex flex-col space-y-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
          <button 
            onClick={clearFilters}
            className="text-sky-500 hover:text-sky-700 text-sm font-medium transition"
          >
            Clear All
          </button>
        </div>

        {/* Search */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Search Destination</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Where do you want to go?" 
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            />
             <MapPin
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range (per person)</label>
          <div className="px-2">
            <input 
              type="range" 
              min="0" 
              max="5000" 
              step="100"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>$0</span>
              <span className="font-semibold text-sky-600">${filters.maxPrice}</span>
              <span>$5,000</span>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (Days)</label>
          <select 
            value={filters.duration}
            onChange={(e) => handleFilterChange("duration", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition appearance-none bg-white cursor-pointer"
          >
            <option>Any Duration</option>
            <option>1-3 Days</option>
            <option>4-7 Days</option>
            <option>8-14 Days</option>
            <option>15+ Days</option>
          </select>
        </div>

        {/* Vehicle */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Type</label>
          <select 
            value={filters.vehicle}
            onChange={(e) => handleFilterChange("vehicle", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition appearance-none bg-white cursor-pointer"
          >
                  <option value="All">Any Vehicle</option>
                  <option value="ECONOMY">Economy Car (4 pax)</option>
                  <option value="SUV">Luxury SUV (6 pax)</option>
                  <option value="Van">Premium Van (12 pax)</option>
          </select>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 pt-2">
          <label className="flex items-center cursor-pointer group">
            <input 
              type="checkbox" 
              checked={filters.popularOnly}
              onChange={(e) => handleFilterChange("popularOnly", e.target.checked)}
              className="w-5 h-5 text-sky-500 border-gray-300 rounded focus:ring-2 focus:ring-sky-500 cursor-pointer"
            />
            <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-sky-600 transition">Popular Packages</span>
          </label>
        </div>

        <button className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200">
          Apply Filters
        </button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Discover Amazing Destinations</h1>
            <p className="text-gray-600 text-lg">Explore our curated collection of unforgettable travel experiences</p>
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-700">{filteredPackages.length} packages</span></p>
              <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm cursor-pointer">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                onClick={() => setSelectedPkg(pkg)}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative verflow-hidden group h-56">
                  <img 
                    src={pkg.imageUrl || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"} 
                    alt={pkg.name} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:translate-y-[-5px]"
                  />
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      POPULAR
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {pkg.features || "Experience breathtaking mountain views, pristine lakes, and charming villages in this unforgettable journey."}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                     <div className="w-12 h-12  rounded-full flex items-center justify-center text-sky-500">
                      <Clock className="w-6 h-6" />
                    </div>
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500">Starting from</p>
                      <p className="text-2xl font-bold text-sky-600">${pkg.price}</p>
                      <p className="text-xs text-gray-500">per person</p>
                    </div>
                    <button 
                      onClick={() => setviewedPkg(pkg)}
                      className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200"
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
   
    {viewedPkg && (
       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" 
          onClick={() => setviewedPkg(null)}
        ></div>
        
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header Image Area */}
        <div className="relative h-64 shrink-0">
          <img 
            src={viewedPkg.imageUrl || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"} 
            alt={viewedPkg.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {viewedPkg.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="group bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4
                  transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-sky-200">

              <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center text-sky-500">
                <Clock className="w-6 h-6" />
              </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase">Duration</p>
                  <p className="text-gray-800 font-bold">{viewedPkg.duration}</p>
                </div>
            </div>

            <div className="group bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4
                  transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-sky-200">

                <div className="w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-500">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase">Transport</p>
                  <p className="text-gray-800 font-bold">
                    {viewedPkg.vehicle || "Private Car"}
                    {VEHICLE_CAPACITY[viewedPkg.vehicle] && (
                      <span className="text-sm text-gray-500 font-medium">
                        {" "}({VEHICLE_CAPACITY[viewedPkg.vehicle]} pax)
                      </span>
                    )}
                    </p>
                </div>
            </div>

          <div className="group bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4
            transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-sky-200">
            <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center text-cyan-500">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">Guide</p>
              <p className="text-gray-800 font-bold">{viewedPkg.guide || "Local Expert"}</p>
            </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-8">
                <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sky-500" />
                  Destinations
                </h3>

                  <div className="flex flex-wrap gap-2">
                    {viewedPkg.destinations?.map((dest, i) => (
                      <span key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 shadow-sm
                  transition hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 hover:-translate-y-0.5">
                        {dest}
                      </span>
                    ))}
                  </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2 mt-6">
                        <Hotel className="w-5 h-5 text-amber-500" />
                        Accommodations
                      </h3>
                    <div className="space-y-1">
                        {selectedPkg.hotels?.map((h, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-2xl border border-amber-100">
                              <span className="font-semibold text-gray-600 ">{h}</span>
                            </div>
                        ))}
                     </div>
              </div>



              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-sky-500" />
                  About this Trip
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {viewedPkg.features || "Embark on an unforgettable journey designed to provide the perfect balance of adventure, relaxation, and cultural immersion. Our expert guides will ensure every moment is memorable."}
                </p>
              </div>
           </div>

           {/* Pricing Summary */}
           <div className="lg:col-span-1">
             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-0">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Pricing Breakdown</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Price Per person</span>
                  <span className="font-semibold text-gray-800">${viewedPkg.price}</span>
                </div>
             </div>
           </div>
        </div>
      </div>

      
      <div className="p-6 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
        <button 
          onClick={() => setviewedPkg(null)}
          className="px-6 py-3 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 border border-gray-200 transition-colors"
        >
          Close
        </button>
        <button 
          onClick={() => navigate(`/booking/${viewedPkg.id}`)}
          className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:shadow-lg hover:opacity-90 transition-all transform active:scale-95"
        >
          Proceed to Booking
        </button>
        </div>
      </div>
   </div>
  )}

             {/* Functional pagination*/}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center">
                  <nav className="flex items-center space-x-2 ">
                    <button
                      onClick={goToPrev}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition"
                    >
                       <ChevronLeft />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                          currentPage === number
                            ? 'px-4 py-2 bg-sky-500 text-white rounded-lg font-semibold'
                            : 'px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                    <button
                      onClick={goToNext}
                      disabled={currentPage === totalPages}
                      className={`p-3 rounded-xl transition ${
                        currentPage === totalPages
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                      }`}
                    >
                       <ChevronRight />
                    </button>
                  </nav>
                </div>
              )}
        </div>
      </main>
    </div>
  );
}