import React from "react";
import Btn from "./Btn";
import hero2 from "../../assets/homepage/hero-2.jpg";

function Hero(){
    return(
        <section className="w-full h-screen relative  bg-amber-100">
                <div className="w-full h-full bg-amber-400 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${hero2})` }}>
                    <div className="w-full h-screen bg-accent opacity-50"></div>
                    <div className="w-fit flex flex-col justify-center items-center left-[30%] top-40 absolute z-10 sm:left-20 sm:items-start">
                        <p className="w-fit text-xl font-bold text-white mb-4 md:text-2xl lg:text-3xl">Welcome to Our Website</p>
                        <h1 className="w-fit text-2xl  text-white md:text-5xl lg:text-7xl">Natural Wonder</h1>
                        <h1 className="w-fit text-2xl  text-white md:text-5xl lg:text-7xl">of the World</h1>
                                           
                    </div>

                    <div className="w-fit h-fit flex flex-row absolute z-12 top-[50%] left-[15%] sm:left-20 md:items-start md:top-[60%]">
                            <Btn name="Explore Tours"  bg="bg-secondary"/>
                            <Btn name="Our Services"  border="border-2 border-white"/>
                    </div>

                   
                </div>
                
        </section>
    )
}

export default Hero