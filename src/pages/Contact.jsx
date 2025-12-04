import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import bgImage from "../assets/ContactPage.jpg";

function ContactUs(){
    return(
        <div className="w-full py-10 px-4 flex flex-col gap-10">

            {/*contact information*/}
            <div className="w-full flex flex-col items-center py-10 px-6">
              <h2 className="text-4xl font-semibold italic mb-4">Our Contact Information</h2>

                        
                {/* Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">

                    {/* Address Card */}

                    <div className="p-6 rounded-xl shadow-md flex items-start gap-4 bg-white">
                    <div className="bg-sky-500 hover:bg-blue-600 text-white p-4 rounded-full text-2xl">
                        <FaMapMarkerAlt/>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Our Address</h3>
                        <p className="text-gray-600">
                            No 248 Gunathilaka Mawatha, Matara 81000
                        </p>
                    </div>
                    </div>

                    {/* Phone Card */}

                    <div className="p-6 rounded-xl shadow-md  flex items-start gap-4 bg-white">
                    <div className="bg-sky-500 hover:bg-blue-600 text-white p-4 rounded-full text-2xl">
                        <FaPhoneAlt/>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Phone Number</h3>
                        <p className="text-gray-600">0417773300</p>
                        <p className="text-gray-600">0713523088</p>
                    </div>
                    </div>

                    {/* Email Card */}

                    <div className="p-6 rounded-xl shadow-md  flex items-start gap-4 bg-white">
                    <div className="bg-sky-500 hover:bg-blue-600 text-white p-4 rounded-full text-2xl">
                        <FaEnvelope/>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Email Address</h3>
                        <p className="text-gray-600">unicorninfo@tourm.com</p>
                        <p className="text-gray-600">support24@tourm.com</p>
                    </div>
                    </div>

                </div>
            </div>

            
            {/*Contact Form*/}


            <div className="w-full flex flex-col py-20 px-6 bg-cover bg-center rounded-xl " style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="  md:w-3/7 h-160  rounded-xl  md-gap-10 bg-white px-7 py-6 ml-3"  >
              
             <h2 className="text-3xl font-semibold mb-5">Contact Us</h2>

                <form className="space-y-4">
                     <div class="flex items-center justify-between  rounded-xl px-2 py-4 bg-white">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-3  shadow-md rounded-lg"
                    />
                    </div>

                    <div class="flex items-center justify-between  rounded-xl px-2 py-4 bg-white">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-3 shadow-md  rounded-lg"
                    />
                    </div>

                    <div class="flex items-center justify-between  rounded-xl px-2 py-4 bg-white">
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="w-full p-3 shadow-md  rounded-lg"
                    />
                    </div>

                    <div class="flex items-center justify-between  rounded-xl px-2 py-4 bg-white">
                    <textarea
                        placeholder="Your Message"
                        rows="4"
                        className="w-full p-3 shadow-md  rounded-lg"
                    ></textarea>
                    </div>

                    <button
                        type="submit"
                            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium shadow-2xl hover:translate-y-[-2px] hover:bg-blue-700 transition duration-300"
                        >

                        Send Message
                    </button>

                </form>
                </div>
                </div>

            {/*Google map*/}

            <div className="w-full">
              

                <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63494.183086549674!2d80.49340408510743!3d5.9413587488928705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae13fb8cfcc0f89%3A0xc22e5a1c4319102e!2sUnicorn%20Tours%20SL!5e0!3m2!1sen!2slk!4v1763260116657!5m2!1sen!2slk"
                        width="100%"
                        height="100%"
                        style={{border:0}}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                       
                    ></iframe>

                </div>
            </div>
            </div>
        

    );
}

export default ContactUs