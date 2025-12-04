import Btn from "./Btn"
import Topic from "./topic"
import Articles from "../../assets/homepage/articles.jpg"

function Reviews(){
    return(
        
                    <section className="w-full h-fit bg-ternary flex flex-col justify-start items-center">
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-items-center place-items-center-safe mt-15">
                            <div className="">
                                <Topic topic="About us Restuarent" subtopic="News & Article"/>
                            </div>
                            <div className="mt-10 sm:mt-0">
                                <Btn name="Explore Tours"  bg="bg-secondary"/>
                            </div>
                        </div>
        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 sm:mt-20 mb-10">
                            <div className="w-fit">
                                <div className="w-[300px] h-[300px] bg-gray-400 rounded-3xl bg-cover bg-center" style={{backgroundImage: `url(${Articles})` }}></div>
                                <div className="">
                                    <div className="mt-5">2025 June</div>
                                    <div className="text-xl mb-5">10 Reasons for Visit Sri Lanka</div>
                                    <Btn name="Our Services"  border="border-2 border-white"/>
                                </div>
                            </div>
                            <div className="w-fit hidden sm:block">
                                <div className="w-[300px] h-[300px] bg-gray-400 rounded-3xl bg-cover bg-center" style={{backgroundImage: `url(${Articles})` }}></div>
                                <div className="mt-5">2025 July</div>
                                <div className="text-xl mb-5">10 Reasons for Visit Sri Lanka</div>
                                <Btn name="Our Services"  border="border-2 border-white"/>
                            </div>
        
                            <div className="w-fit hidden lg:block">
                                <div className="w-[300px] h-[300px] bg-gray-400 rounded-3xl bg-cover bg-center" style={{backgroundImage: `url(${Articles})` }}></div>
                                <div className="mt-5">2025 July</div>
                                <div className="text-xl mb-5">10 Reasons for Visit Sri Lanka</div>
                                <Btn name="Our Services"  border="border-2 border-white"/>
                            </div>
        
                            <div className="w-fit hidden lg:block">
                                <div className="w-[300px] h-[300px] bg-gray-400 rounded-3xl bg-cover bg-center" style={{backgroundImage: `url(${Articles})` }}></div>
                                <div className="mt-5">2025 July</div>
                                <div className="text-xl mb-5">10 Reasons for Visit Sri Lanka</div>
                                <Btn name="Our Services"  border="border-2 border-gray-200"/>
                            </div>
                           
                        </div>
        
                        
                    </section>
        
    )
}

export default Reviews