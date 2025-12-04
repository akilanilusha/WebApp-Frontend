import Topic from "./topic";

function AboutUs(){
    return(
         <section className="w-full h-[700px] bg-primary flex flex-col justify-start items-center mt-15">
                <Topic topic="Testimonial" subtopic="What Clients Say About Us"/>

                <div className="w-fit gap-5 mt-15 grid grid-cols-1">
                    <div className="w-[350px] h-[200px] bg-yellow-800"></div>
                    <div className="w-[350px] h-[200px] bg-yellow-800"></div>
                </div>
            </section>

    )
}

export default AboutUs