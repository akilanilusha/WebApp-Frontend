import React from "react";
import Btn from "./Btn";
import pk from "../../assets/homepage/ut.jpeg";
import sp from "../../assets/homepage/sp.jpg"

function Hero(){
    return(
        <section className="w-full h-[50vh] md:h-screen relative  bg-green-300">
                <div className="w-full h-full md:h-full bg-amber-400 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${sp})` }}>
                    <div className="w-full h-full md:h-screen bg-accent opacity-35"></div>
                    <div className="w-fit flex flex-col justify-center items-center left-2/9 top-1/4 absolute z-10 sm:left-20 sm:items-start">
                        <p className="w-fit text-xl font-bold text-white mb-4 md:text-2xl lg:text-3xl">Welcome to Our Website</p>
                        <h1 className="w-fit text-4xl  text-white md:text-5xl lg:text-7xl mt-5 text-shadow-lg">Natural Wonder</h1>
                        <h1 className="w-fit text-4xl  text-white md:text-5xl lg:text-7xl mt-5 text-shadow-lg">of the World</h1>
                                           
                    </div>

                    <div className="w-fit h-fit grid grid-cols-1 absolute z-12 top-3/4 left-3/8 sm:left-15 lg:left-20 lg:grid-cols-2 lg:items-start md:top-[60%] gap-2">
                            <Btn name="Explore Tours"  bg="bg-secondary" text="text-primary" hover="hover:bg-accent" hovert="hover:text-white"/>
                            <Btn name="Our Services"  border="border-2 border-white" text="text-primary" hover="hover:bg-white" hovert="hover:text-accent"/>
                    </div>

                   
                </div>
                
        </section>
    )
}

export default Hero