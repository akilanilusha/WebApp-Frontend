import brand1 from "../../assets/logo/brand_1_1.svg"
import brand2 from "../../assets/logo/brand_1_2.svg"
import brand3 from "../../assets/logo/brand_1_3.svg"
import brand4 from "../../assets/logo/brand_1_4.svg"
import brand5 from "../../assets/logo/brand_1_5.svg"
import brand6 from "../../assets/logo/brand_1_6.svg"


function Logo(){
    return(
        <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 place-items-center mt-10 mb-10">
            <div className="w-[200px] h-[200px]  bg-cover bg-center" style={{ backgroundImage: `url(${brand1})` }}></div>
            <div className="w-[200px] h-[200px] bg-cover bg-center" style={{ backgroundImage: `url(${brand2})` }}></div>
            <div className="w-[200px] h-[200px]  bg-cover bg-center" style={{ backgroundImage: `url(${brand3})` }}></div>
            <div className="w-[200px] h-[200px]  bg-cover bg-center" style={{ backgroundImage: `url(${brand4})` }}></div>
            <div className="w-[200px] h-[200px]  bg-cover bg-center" style={{ backgroundImage: `url(${brand5})` }}></div>
            <div className="w-[200px] h-[200px] bg-cover bg-center" style={{ backgroundImage: `url(${brand6})` }}></div>
            
        </div>
    )
}

export default  Logo