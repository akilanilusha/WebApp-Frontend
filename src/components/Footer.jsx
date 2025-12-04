
import Links from './Links'
import man4 from '../assets/man-4.jpg'

function Footer(){
    return(
        
        <div className="w-full h-fit flex justify-center items-center bg-primary">
            <div className=" max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  lg:[50vh] gap-4">
                <div className="m-5">
                    <div className="w-fit text-2xl text-accent">Logo Here</div>
                    <div className="w-[90%]  text-[16px] mt-5">Rapidiously myocardinate cross-platform intellectual capital model. Appropriately create interactive infrastructures</div>
                    <div className="w-fit flex flex-row gap-5 text-xl mt-5">
                        <div className=""><ion-icon name="logo-facebook"></ion-icon></div>
                        <div className=""><ion-icon name="logo-instagram"></ion-icon></div>
                        <div className=""><ion-icon name="logo-twitter"></ion-icon></div>
                        <div className=""><ion-icon name="logo-linkedin"></ion-icon></div>
                    </div>
            
                </div>
                <Links
                    header="Quick Links"
                    link1="Home"
                    link2="About us"
                    link3="Our Services"
                    link4="Term of Services"
                    link5="Term Booking Now"
                />
                <Links
                    header="Address"
                    link1="+123456789"
                    link2="TripGenix@gmail.com"
                    link3="Colombo Sri Lanka"
                />
                <div className="w-full m-5">
                    <div className="w-fit text-2xl text-accent">Instergram Post</div>
                    <div className="w-full h-fit grid grid-cols-2 lg:grid-cols-2 gap-5 mt-5">
                        <div className="w-[75%] h-30 bg-green-200 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${man4})` }}></div>
                        <div className="w-[75%] h-30 bg-green-200 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${man4})` }}></div>
                        <div className="w-[75%] h-30 bg-green-200 lg:hidden rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${man4})` }}></div>
                        <div className="w-[75%] h-30 bg-green-200 lg:hidden rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${man4})` }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer