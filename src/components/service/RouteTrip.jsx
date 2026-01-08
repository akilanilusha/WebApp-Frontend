import { useState, useEffect } from "react";
import InputField from "../InputField";
import DynamicList from "./DynamicList";
import VehicleModal from "./VehicleModal";
import DriverModal from "./DriverModal";
import TourGuideModal from "./TourGuideModal";
import axios from "axios";
import GooglePlaceInput from "../service/GooglePlaceInput";
const DRIVER_API = import.meta.env.VITE_DRIVER_SERVICE_API_URL;
const VEHICLE_API = import.meta.env.VITE_VEHICLE_SERVICE_API_URL;

const tempTourGuides = [
  {
    id: 1,
    name: "Shenal Fernando",
    experience: "6 years",
    languages: ["English", "Sinhala"],
    rating: 4.8,
    phone: "0774567890",
    photo: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 2,
    name: "Nadeesha Madubhani",
    experience: "4 years",
    languages: ["Tamil", "Sinhala"],
    rating: 4.6,
    phone: "0712345678",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Pramuditha Samarasekara",
    experience: "8 years",
    languages: ["English", "Sinhala", "Hindi"],
    rating: 4.9,
    phone: "0769988776",
    photo: "https://randomuser.me/api/portraits/men/28.jpg",
  },
];

export default function RouteTrip({
  startLocation,
  setStartLocation,
  endLocation,
  setEndLocation,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  destinations,
  setDestinations,
  submit,
  costPerKm,
  setCostPerKm,
  booking_price,
  setBookingPrice,
  selectedVehicle,
  setSelectedVehicle,
  selectedDriver,
  setSelectedDriver,
  selectedGuide,
  setSelectedGuide,
}) {
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]); // NEW

  // LOAD ALL DRIVERS
  useEffect(() => {
    async function loadDrivers() {
      try {
        const res = await axios.get(`${DRIVER_API}`);
        console.log("Fetched Drivers:", res);
        setDrivers(res.data);
      } catch (error) {
        console.error("Error loading drivers:", error);
      }
    }
    loadDrivers();
  }, []);

  // LOAD VEHICLES
  async function loadVehicles() {
    try {
      const response = await axios.get(
        `${VEHICLE_API}/webRequestController/api/v1/getvehicles`
      );
      const vehicles = response.data;
      console.log("Fetched Vehicles:", vehicles);
      setVehicles(vehicles);
      setShowVehicleModal(true);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  }

  // ---- handlers ----
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedDriver(null);
    setShowVehicleModal(false);

    setCostPerKm(vehicle.costPerKm);
    setBookingPrice(vehicle.bookingPrice);
  };

  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
    setShowDriverModal(false);
  };

  // FILTER DRIVERS BY SELECTED VEHICLE
  const filteredDrivers = selectedVehicle
    ? drivers.filter((driver) => {
        const vehicleCategory = Number(selectedVehicle.type); // category
        const vehicleId = selectedVehicle.vehicleId; // specific vehicle

        const matchByCategory =
          driver.selectedVehicleCategories?.includes(vehicleCategory);

        const matchByVehicleNumber =
          driver.selectedVehicleByNumber?.includes(vehicleId);

        return matchByCategory || matchByVehicleNumber;
      })
    : [];

  return (
    <div
      className="
        mb-10 p-6 
        rounded-2xl
        bg-white/50 
        backdrop-blur-[15px]
        border border-white/30
        shadow-[0_4px_30px_rgba(0,0,0,0.1)]
      "
    >
      <h1 className="text-3xl font-bold mb-8">Trip Details</h1>

      {/* -------- GRID -------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <GooglePlaceInput
          label="Start Location"
          value={startLocation}
          onChange={setStartLocation}
        />

        <GooglePlaceInput
          label="End Location"
          value={endLocation}
          onChange={setEndLocation}
        />
        <div className="sm:col-span-2 lg:col-span-1 row-span-2">
          <DynamicList
            title="Add Destination"
            destinations={destinations}
            setDestinations={setDestinations}
          />
        </div>
        <InputField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <InputField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        {/* VEHICLE */}
        <div>
          <button className="glass-btn w-full" onClick={loadVehicles}>
            Select Vehicle
          </button>

          {selectedVehicle && (
            <GlassCard item={selectedVehicle} type="vehicle" />
          )}
        </div>

        {/* DRIVER */}
        <div>
          <button
            disabled={!selectedVehicle}
            className={`glass-btn w-full ${
              !selectedVehicle ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setShowDriverModal(true)}
          >
            Select Driver
          </button>

          {selectedDriver && <GlassCard item={selectedDriver} type="driver" />}
        </div>

        {/* TOUR GUIDE */}
        <div>
          <button
            className="glass-btn w-full"
            onClick={() => setShowGuideModal(true)}
          >
            Select Tour Guide
          </button>

          {selectedGuide && <GlassCard item={selectedGuide} type="guide" />}
        </div>
      </div>

      {/* ---- ACTION BUTTONS ---- */}
      <div className="mt-10 flex flex-col sm:flex-row justify-end gap-4">
        <button className="clear-btn">Clear</button>
        <button className="proceed-btn" onClick={submit}>
          Proceed
        </button>
      </div>

      {/* ---- MODALS ---- */}
      {showVehicleModal && (
        <VehicleModal
          vehicles={vehicles}
          onClose={() => setShowVehicleModal(false)}
          onSelect={handleVehicleSelect}
        />
      )}

      {showDriverModal && (
        <DriverModal
          drivers={filteredDrivers} // IMPORTANT CHANGE
          onClose={() => setShowDriverModal(false)}
          onSelect={handleDriverSelect}
        />
      )}

      {showGuideModal && (
        <TourGuideModal
          guides={tempTourGuides}
          onSelect={(g) => {
            setSelectedGuide(g);
            setShowGuideModal(false);
          }}
          onClose={() => setShowGuideModal(false)}
        />
      )}
    </div>
  );
}

// ------- SUB COMPONENT FOR CARDS -------
function GlassCard({ item, type }) {
  return (
    <div
      className="
        mt-3 p-4 rounded-2xl 
        bg-white/30 backdrop-blur-xl 
        border border-gray-200
        shadow-md h-40 
        flex items-center gap-4
      "
    >
      <div className="w-28 h-28 rounded-xl overflow-hidden shadow">
        <img
          src={item.driverImage || item.vehicleImages?.[0]}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        <p className="text-lg font-semibold">{item.vehicleName}</p>

        {type === "vehicle" && (
          <>
            <p className="text-gray-600 text-sm">
              Booking Price-{item.bookingPrice}
            </p>
            <p className="text-gray-600 text-sm">
              Const Per Km -{item.costPerKm}
            </p>
            <p className="text-gray-600 text-sm">{item.passengerCount} Seats</p>
          </>
        )}

        {type === "driver" && (
          <>
            <p className="text-gray-600 text-sm">
              {item.firstName} {item.lastName}
            </p>
            <p className="text-gray-600 text-sm">{item.rating}</p>
            <p className="text-gray-600 text-sm">{item.phone}</p>
          </>
        )}

        {type === "guide" && (
          <>
            <p className="text-gray-600 text-sm">{item.experience}</p>
            <p className="text-gray-600 text-sm">
              🌐 {item.languages.join(", ")}
            </p>
            <p className="text-gray-600 text-sm">{item.rating}</p>
            <p className="text-gray-600 text-sm">{item.phone}</p>
          </>
        )}
      </div>
    </div>
  );
}
