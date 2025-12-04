

import Btn from './homePage/Btn';

// function Navbar(){
    // return(
    //     <div className="w-full h-[75px] bg-primary justify-between items-center fixed drop-shadow-xl z-20 flex">
    //         <div className="w-fit h-fit ml-10 sm:text-2xl md:text-3xl">Logo Here</div>
    //         <div className="w-fit h-fit flex flex-row justify-center items-center mr-10">
    //             <div className="w-[100px] h-fit hidden sm:inline-block ">
    //                 <Link to="/">Home</Link>
    //             </div>
                
    //             <div className="w-[100px] h-fit hidden sm:inline-block">
    //                 <Link to="/About">About Us</Link>
    //             </div>

    //             <div className="w-[100px] h-fit hidden sm:inline-block">
    //                 <Link to="/Contact">Contact Us</Link>
    //             </div>

    //             <div className="w-fit h-fit hidden lg:inline-block">
    //                 <Link to="/Booking">
    //                     <Btn name="Book Now" bg="bg-accent"/>
    //                 </Link>
    //             </div>

    //             <div className="w-fit h-fit text-xl sm:hidden"><ion-icon name="menu-outline"></ion-icon></div>
    //         </div>

           
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <div className="text-2xl font-bold">Logo Here</div>

        <div className="hidden md:flex items-center gap-10 text-[17px] font-medium">

          <Link to="/Home" className="hover:text-blue-500">Home</Link>

          <div className="relative group cursor-pointer">

            <div className="flex items-center gap-1 hover:text-blue-500">
              Service
              <IoIosArrowDown className="transition-all duration-300 group-hover:rotate-180" />
            </div>

            <div className="
              absolute left-0 top-[120%]
              w-48 bg-white shadow-lg border border-gray-200 
              opacity-0 invisible 
              group-hover:opacity-100 group-hover:visible 
              transition-all duration-300
            ">
              <Link
                to="/Booking"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Booking
              </Link>

              <Link
                to="/ServiceDetails"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Service Details
              </Link>
            </div>

          </div>

          <Link to="/Contact" className="hover:text-blue-500">Contact</Link>
          <Link 
            to="/login" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            User Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
