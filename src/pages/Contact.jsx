import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import bgImage from "../assets/ContactPage.jpg";
import { useState } from "react";


const CONTACT_API_URL = "http://localhost:8080/api/contact"; 
const GOOGLE_MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.653457199121!2d80.5284093!3d6.0592815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae624e75d5b78a9%3A0xcb1b5e3a34a17966!2sMatara%2081000!5e0!3m2!1sen!2slk!4v1703058882042!5m2!1sen!2slk";

function ContactUs(){

const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "", 
    message: "",
    });

    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState(""); 


    const isValidEmail = (email) =>
     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleChange = (e) => {
    setFormData({ 
        ...formData,
        [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    if (!formData.fullName || !formData.email || !formData.message) {
        setStatusMessage("❌ Please fill all required fields (Name, Email, Message).");
        return;
    }

    if (!isValidEmail(formData.email)) {
        setStatusMessage("❌ Please enter a valid email address.");
        return;
    }

    setLoading(true);

    try {
        const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone: formData.phone || "" }), 
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(errorData.message || "Failed with status: " + res.status);
      }

    setStatusMessage("✅ Message sent successfully! We will get back to you soon.");

    setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
    });

    } catch (err) {
        console.error("Contact Form Submission Error:", err);
        setStatusMessage("❌ Failed to send message. Please try again later.");
    } finally {
        setLoading(false);
    }
};

return(
<div className="w-full py-10 px-4 flex flex-col gap-10">

    {/*contact information*/}
    <div className="w-full flex flex-col items-center py-10 px-6">
        <h2 className="text-4xl font-semibold italic mb-4">Our Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
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
            <div className="p-6 rounded-xl shadow-md flex items-start gap-4 bg-white">
                <div className="bg-sky-500 hover:bg-blue-600 text-white p-4 rounded-full text-2xl">
                    <FaPhoneAlt/>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Phone Number</h3>
                    <p className="text-gray-600">0417773300</p>
                    <p className="text-gray-600">0713523088</p>
                </div>
            </div>
            <div className="p-6 rounded-xl shadow-md flex items-start gap-4 bg-white">
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
        <div className="md:w-3/7 h-160 rounded-xl md-gap-10 bg-white px-7 py-6 ml-3">
          <h2 className="text-3xl font-semibold mb-5">Contact Us</h2>
                    {statusMessage && (
                        <p className={`mb-4 p-3 rounded-lg font-medium ${
                            statusMessage.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                            {statusMessage}
                        </p>
                    )}

    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between  rounded-xl px-2 py-4 bg-white">
            <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 shadow-md rounded-lg focus:outline-sky-500" required 
            />
            </div>

            <div className="flex items-center justify-between  rounded-xl px-2 py-4 bg-white">
                <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 shadow-md  rounded-lg focus:outline-sky-500"
                                        required // Added required HTML attribute
                />
            </div>

            <div className="flex items-center justify-between  rounded-xl px-2 py-4 bg-white">
                <input
                type="text"
                name="phone"
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 shadow-md  rounded-lg focus:outline-sky-500"
                />
            </div>

            <div className="flex items-center justify-between  rounded-xl px-2 py-4 bg-white">
                <textarea
                placeholder="Your Message *"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 shadow-md  rounded-lg focus:outline-sky-500"
                                        required // Added required HTML attribute
                ></textarea>
            </div>

            <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium shadow-2xl hover:translate-y-[-2px] hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {loading ? "Sending..." : "Send Message"}
            </button>
    </form>
    </div>
</div>

{/*Google map*/}

<div className="w-full">
    <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
                src={GOOGLE_MAP_EMBED_URL} 
                width="100%"
                height="100%"
                style={{border:0}}
                allowFullScreen=""
                loading="lazy"
                >
            </iframe>
        </div>
    </div> 
</div>
    );
}

export default ContactUs;