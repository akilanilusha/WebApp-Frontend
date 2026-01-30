import TourGuideList from "./TourGuideList";


function TourGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* You can place Navbar here */}

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-blue-700 text-center">
          Meet Our Tour Guides
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Choose the best guide for your perfect journey
        </p>

        <div className="mt-10">
          <TourGuideList />
        </div>
      </div>
    </div>
  );
}

export default TourGuidePage;