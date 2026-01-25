import Hero from "../components/Home/Hero";
import ShotrestPath from "../components/Home/ShotrestPath";
import UserCoupan from "../components/Home/UserCoupan";
import PlanTrip from "../components/Home/planTrip";
import TourCatergory from "../components/homePage/TourCatergory";
import PopularDestination from "../components/homePage/PopularDestination";

function Home() {
  return (
    <>
      <Hero />
      <UserCoupan />
      <PlanTrip />
      <ShotrestPath />
      <TourCatergory />
      <PopularDestination />
    </>
  );
}

export default Home;
