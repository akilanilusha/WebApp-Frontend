import Card1 from "../homePage/Card1"
import CurveSlider from "./CurveSlider"
import Topic from "./topic"
import tour from "../../assets/sectionImg/tour.jpg"

function TourCatergory(){
    return(

         
            <section className="w-full h-[700px] flex flex-col overflow-visible" style={{backgroundImage: `url(${tour})` }}>
               <Topic topic="Wonderfull Places For You" subtopic="Tour Categories" margin="mt-20"/>
              

                <div className="w-full h-[800px] flex items-center justify-center px-4 sm:px-10 overflow-hidden">
                   

                    <CurveSlider />
                    
                </div>
            </section>

    )
}

export default TourCatergory