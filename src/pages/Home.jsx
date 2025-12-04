
import TourCatergory from "../components/homePage/TourCatergory";
import PopularDestination from "../components/homePage/PopularDestination";
import PopularTour from "../components/homePage/PopularTour";
import RecentGallery from "../components/homePage/RecentGallery";
import MeetGuide from "../components/homePage/MeetGuide";
import AboutUs from "../components/homePage/AboutUs";
import Reviews from "../components/homePage/Reviews";
import Newsletter from "../components/homePage/Newsletter";
import Hero from "../components/homePage/Hero";


function Home(){



    
    return(
        <div className="w-full h-fit flex flex-col">
            
           

            <Hero />

         

            <TourCatergory />

            <PopularDestination />

            <PopularTour />

            <RecentGallery />


            <MeetGuide />

            <AboutUs />

            <Reviews />

           


            <Newsletter />

            
            <section className="w-full h-2 flex justify-center items-center">
                <div className="w-[90%] h-0.1 border border-accent opacity-15"></div>
            </section>
        </div>
    )
}

export default Home