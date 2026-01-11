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
import PaymentPage from "./pages/PaymentPage";
import About from '../src/pages/About'
import Profile from '../src/pages/profile'
import TourGuidePage from "./components/tourguide/TourGuidePage";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
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
        <Route path="/payment/:ref" element={<PaymentPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/FeaturedTours" element={<FeaturedTours />} />

        {/* Tour Guide Page */}
        <Route path="/TourGuide" element={<TourGuidePage />} />
      </Routes>
      <WhatsappButton />
    </BrowserRouter>
  );
}

export default App;
