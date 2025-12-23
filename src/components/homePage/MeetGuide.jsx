import HorizontalSlider from "./HorizontalSlider";
import Topic from "./topic";
import tour from "../../assets/sectionImg/tour.jpg"

function MeetGuide(){
    return(
            <section className="w-full h-full flex flex-col  justify-start items-center bg-ternary mt-20 bg-cover bg-center" style={{backgroundImage: `url(${tour})`}}>
                <div className="w-full flex flex-col items-center py-10">
                    <div className="w-fit h-fit flex flex-col items-center">
                        <Topic topic="Meet With Guide" subtopic="Tour Guide"/>
                                          
                    
                    </div>
                
                    <div className="w-full flex justify-center items-center px-4 sm:px-10 overflow-hidden">
                        
                        <HorizontalSlider />
                        
                        
                        
                        
                    </div>
                </div>
          
            </section>
    )
}

export default MeetGuide