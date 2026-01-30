import tourGuides from "../../data/tourGuides";
import TourGuideCard from "./TourGuideCard";


function TourGuideList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tourGuides.map((guide) => (
        <TourGuideCard key={guide.id} guide={guide} />
      ))}
    </div>
  );
}

export default TourGuideList;