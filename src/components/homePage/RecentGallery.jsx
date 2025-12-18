import Topic from "./topic";
import hero2 from '../../assets/homepage/girl.png'
import img1 from '../../assets/recentgallery/gallery1.jpg'
import img2 from '../../assets/recentgallery/gallery2.jpg'
import img3 from '../../assets/recentgallery/gallery3.jpg'
import img4 from '../../assets/recentgallery/gallery4.jpg'
import img7 from '../../assets/recentgallery/gallery7.png'
import eve from '../../assets/recentgallery/eve.jpg'
import build from '../../assets/recentgallery/building.jpg'

function RecentGallery(){
    return(
          

            <section className="w-full h-full flex flex-col  justify-start items-center mt-15">
                <Topic topic="Explore Our Gallery" subtopic="Recent Gallery"/>

                
                <div className="w-[300px] h-fit max-w-6xl grid grid-cols-1 sm:w-full mt-10 md:w-[80%] md:grid-cols-2 lg:grid-cols-5 gap-6 lg:mt-15">
                {/* Big wide image (top left) */}
                <div
                    className="w-full col-span-2 h-[260px] rounded-4xl drop-shadow-xl bg-cover bg-center bg-no-repeat bg-yellow-300"
                    style={{ backgroundImage: `url(${img1})` }}
                ></div>

                {/* Normal image (top middle) */}
                <div
                    className="w-full col-span-2 sm:col-span-1 h-[260px] rounded-4xl drop-shadow-xl bg-cover bg-center bg-no-repeat bg-yellow-300"
                    style={{ backgroundImage: `url(${eve})` }}
                ></div>

                {/* Tall center image (2 rows) */}
                <div
                    className="w-full col-span-2  h-[260px] sm:col-span-1 sm:row-span-2 sm:h-[540px] rounded-4xl drop-shadow-xl bg-cover bg-center bg-no-repeat bg-purple-300"
                    style={{ backgroundImage: `url(${hero2})` }}
                ></div>

                {/* Normal image (top right) */}
                <div
                    className="col-span-2 sm:col-span-1 h-[260px] rounded-4xl drop-shadow-xl bg-cover bg-center bg-no-repeat bg-yellow-300 hidden md:block"
                    style={{ backgroundImage: `url(${img2})` }}
                ></div>

                {/* Big wide image (bottom left) */}
                <div
                    className="col-span-2 h-[260px] rounded-4xl drop-shadow-xl bg-cover bg-center bg-no-repeat bg-yellow-300 hidden md:block"
                    style={{ backgroundImage: `url(${img3})` }}
                ></div>

                {/* Normal image (bottom middle) */}
                <div
                    className="col-span-2 sm:col-span-1 h-[260px] rounded-4xl drop-shadow-xl bg-cover bg-center bg-no-repeat bg-yellow-300 hidden md:block"
                    style={{ backgroundImage: `url(${img4})` }}
                ></div>

                {/* Normal image (bottom right) */}
                <div
                    className="col-span-2 sm:col-span-1 h-[260px] rounded-4xl drop-shadow-xl bg-cover bg-center bg-no-repeat bg-yellow-300 hidden md:block"
                    style={{ backgroundImage: `url(${img7})` }}
                ></div>
                </div>
          
            </section>

    )
}

export default RecentGallery