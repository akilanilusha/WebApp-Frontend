import Card1 from "./Card1"
import Card2 from "./Card2"
import Topic from "./topic"
import tour from "../../assets/sectionImg/tour.jpg"

function PopularTour(){
    return(
        <section className="w-full h-fit flex flex-col relative justify-center items-center">
                <div className="w-full h-[650px] sm:h-[700px]">
                    <div className="w-full h-[500px] flex flex-col items-center bg-cover bg-center" style={{backgroundImage: `url(${tour})`}}>
                        <Topic topic="Best Popular Tour" subtopic="Most Popular Tour" margin="mt-10"/>
                        <p className="w-fit text-center mt-5 text-accent text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    
                    
                    </div>
                    
                    <div className="w-full h-[400px]  max-w-7xl absolute z-8 top-50 left-5 lg:left-1/10 sm:top-60 gap-5 place-items-center justify-items-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                        
                            <Card2  />
                            <Card2 hid="hidden" blo="md:block" />
                            <Card2 hid="hidden" blo="lg:block" />
                            <Card2 hid="hidden" blo="lg:block" />
                            

                            {/* <Card1
                                img={someImage}
                                title="Italy Tour Package"
                                rating={4.8}
                                ratingText="(4.8 Rating)"
                                price="980.00"
                                per="/Person"
                                duration="7 Days"
                                hid="hidden md:block"     // optional – your old responsive props
                                blo="lg:block"            // optional
                            /> */}
                            
                    </div>
                </div>
                

                
            </section>
    )
}

export default PopularTour