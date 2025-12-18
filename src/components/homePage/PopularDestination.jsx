import Card1 from "./Card1";
import FeaturedCarousel from "./FeaturedCarousel";
import Topic from "./topic";

 function PopularDestination(){
    return(
            <section className="w-full h-[700px] flex flex-col bg-primary">
                <Topic topic="Top Destination" subtopic="Popular Destination" margin="mt-20"/>

                <div className="w-full mt-15 flex items-center justify-center">
                    
                    {/* <Card1  />
                    <Card1 hid="hidden" blo="sm:block" />
                    <Card1 hid="hidden" blo="sm:block" />
                    <Card1 hid="hidden" blo="lg:block" />
                    <Card1 hid="hidden" blo="lg:block" /> */}

                    <FeaturedCarousel />
                </div>
            </section>
    )
 }

 export default PopularDestination