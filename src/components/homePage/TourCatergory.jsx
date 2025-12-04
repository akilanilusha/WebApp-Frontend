import Card1 from "../homePage/Card1"
import CurveSlider from "./CurveSlider"
import Topic from "./topic"

function TourCatergory(){
    return(

         
            <section className="w-full h-[700px] flex flex-col bg-ternary overflow-visible">
               <Topic topic="Wonderfull Places For You" subtopic="Tour Categories" margin="mt-20"/>
              

                <div className="w-full h-[800px] flex items-center justify-center px-4 sm:px-10 overflow-hidden">
                    {/* <Card1  />
                    <Card1 hid="hidden" blo="sm:block" />
                    <Card1 hid="hidden" blo="sm:block" />
                    <Card1 hid="hidden" blo="lg:block" />
                    <Card1 hid="hidden" blo="lg:block" /> */}

                    <CurveSlider />
                    
                </div>
            </section>

    )
}

export default TourCatergory