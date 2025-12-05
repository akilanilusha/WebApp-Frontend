import BookingDetails from "../components/service/bookingDetails";
import RouteTrip from "../components/service/RouteTrip";
import TripSummary from "../components/service/TripSummery";
import DropDownField from "../components/DropDownField";
import { FaLocationDot } from "react-icons/fa6";
import PlacesGrid from "../components/service/PlaceGrid";
import axios from "axios";
import { useEffect, useState } from "react";
import bgImage from "../assets/bg.webp";

export default function CustomPackage() {
  //booking details state
  const [nameOfBooker, setNameOfBooker] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [arrivalDateTime, setArrivalDateTime] = useState("");
  const [departureDateTime, setDepartureDateTime] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildres] = useState(0);
  const [babies, setBabies] = useState(0);
  //Trip data state
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isVehicle, setVehicle] = useState(false);
  const [destinations, setDestinations] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState(null);

  const submitTrip = async () => {
    const tripData = {
      bookingDetails: {
        nameOfBooker,
        passportNumber,
        arrivalDateTime,
        departureDateTime,
        flightNumber,
        departureAirport,
        adults,
        children,
        babies,
      },
      tripDetails: {
        startLocation,
        endLocation,
        startDate,
        endDate,
        isVehicle,
        destinations,
      },
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_GOOGLE_MAPS_API_URL}/maps/shortest-route`,
        {
          start: startLocation,
          end: endLocation,
          waypoints: destinations,
        }
      );

      console.log("Route API Response:", response.data);
      setRouteData(response.data);
    } catch (error) {
      console.error("Route API Error:", error.response?.data || error.message);
    }
    //console.log("🚀 Final Submitted Trip Data:", tripData);
  };

  const fetchPlaces = async () => {
    if (!selectedDistrict) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_GOOGLE_MAPS_API_URL}/places/${selectedDistrict}`
      );
      setPlaces(res.data);
    } catch (err) {
      console.error("Error fetching places:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, [selectedDistrict]);

  return (
    <>
      <div
        className="
    min-h-screen 
    bg-slate-900/60
    bg-cover bg-center bg-fixed
  "
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="text-center p-10">
          <h1 className="hidden md:block font-bold text-gray-900 md:text-4xl ">
            Make Your Dream Tour
          </h1>
          <h1 className="font-bold text-gray-900 md:hidden">
            <span className="text-4xl">Make Your</span>
            <br />
            <span className="text-3xl">Dream Tour</span>
          </h1>
        </div>

        <div className="container mx-auto px-2 grid grid-cols-12 gap-4">
          {/* booking Panel */}
          <div className="col-span-12 lg:col-span-8">
            <BookingDetails
              nameOfBooker={nameOfBooker}
              setNameOfBooker={setNameOfBooker}
              passportNumber={passportNumber}
              setPassportNumber={setPassportNumber}
              arrivalDateTime={arrivalDateTime}
              setArrivalDateTime={setArrivalDateTime}
              departureDateTime={departureDateTime}
              setDepartureDateTime={setDepartureDateTime}
              flightNumber={flightNumber}
              setFlightNumber={setFlightNumber}
              departureAirport={departureAirport}
              setDepartureAirport={setDepartureAirport}
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildres={setChildres}
              babies={babies}
              setBabies={setBabies}
            />
            <RouteTrip
              startLocation={startLocation}
              setStartLocation={setStartLocation}
              endLocation={endLocation}
              setEndLocation={setEndLocation}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              isVehicle={isVehicle}
              setVehicle={setVehicle}
              destinations={destinations}
              setDestinations={setDestinations}
              submit={submitTrip}
            />
          </div>

          {/* trip summery*/}
          <div className="col-span-12 lg:col-span-4">
            <TripSummary
              name={nameOfBooker}
              startLocation={startLocation}
              endLocation={endLocation}
              startDate={startDate}
              endDate={endDate}
              waypoints={destinations}
              routeData={routeData}
            />
          </div>
        </div>

        {/* District Search Section */}
        <div className="container mx-auto px-2 grid">
          <div className="m-5">
            <h1 className="font-bold text-center text-gray-900 text-3xl mb-6">
              Need Help Choosing a Location?
            </h1>

            <div className="flex justify-center">
              <div className="bg-[#D4F6FF]/60 rounded-xl py-6 px-6 max-w-4xl">
                <p className="text-gray-700 text-base flex items-center gap-3">
                  <span className="text-blue-500 text-xl hidden md:block">
                    <FaLocationDot />
                  </span>
                  If you don't know the exact location, we can help you explore
                  beautiful places by district.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <div className="md:w-[300px] w-full">
                <DropDownField
                  label="District"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  options={[
                    "Colombo",
                    "Gampaha",
                    "Kalutara",
                    "Kandy",
                    "Matale",
                    "Nuwara Eliya",
                    "Galle",
                    "Matara",
                    "Hambantota",
                    "Jaffna",
                    "Kilinochchi",
                    "Mannar",
                    "Vavuniya",
                    "Mullaitivu",
                    "Batticaloa",
                    "Ampara",
                    "Trincomalee",
                    "Kurunegala",
                    "Puttalam",
                    "Anuradhapura",
                    "Polonnaruwa",
                    "Badulla",
                    "Monaragala",
                    "Ratnapura",
                    "Kegalle",
                  ]}
                />
              </div>
            </div>

            {loading ? (
              <p className="text-center mt-6 text-gray-600">
                Loading places... Please wait 😊
              </p>
            ) : (
              <PlacesGrid places={places} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
