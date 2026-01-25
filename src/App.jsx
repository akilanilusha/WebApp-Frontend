import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import CustomPackage from "./pages/CustomBooking";
import UserLogin from "./pages/UserLogin";
import Faq from "./pages/FAQ";
import UserRegister from "./pages/UserRegister";
import PrivateRoute from "./route/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import WhatsappButton from "./components/WhatsappButton";
import FeaturedTours from "./pages/FeaturedTours";
import PaymentPage from "./pages/payment/PaymentPage";
import About from '../src/pages/About'
import Profile from '../src/pages/profile'
import Test from './pages/test'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import CanclePayment from "./pages/payment/CanclePayment";
import SuccessPayment from "./pages/payment/SuccessPayment";

function App() {
    useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  return (
    <BrowserRouter>
    
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />

            <div className="pt-[80px]">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Contact" element={<Contact />} />
                    <Route path="/About" element={<About />} />
<Route path="/Profile" element={<Profile />} />
        <Route path="/CustomPackage" element={<CustomPackage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/faq" element={<Faq />} />
        {/* <Route path="/payment" element={<PaymentPage />} /> */}
        <Route path="/payment/:tourId" element={<PaymentPage />} />
        <Route path="cancel-tour" element={<CanclePayment />} />
        <Route path="/payment-success" element={<SuccessPayment />} />


        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/FeaturedTours" element={<FeaturedTours />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      </div>
      {/* <WhatsappButton /> */}
    </BrowserRouter>
  );
}

export default App;
