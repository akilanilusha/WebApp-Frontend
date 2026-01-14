import TestimonialCarousel from "./TestimonialCarousel";
import CustomerComments from "./TestimonialCarousel";
import Topic from "./topic";

function AboutUs(){
    return(
         <section className="w-full h-[700px] bg-primary flex flex-col justify-start items-center mt-15">
                <Topic topic="Testimonial" subtopic="What Clients Say About Us"/>

                <div className="w-full h-fit mt-15">
                    <TestimonialCarousel />
                </div>
            </section>

    )
}

export default AboutUs