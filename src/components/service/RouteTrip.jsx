import { useState } from "react";
import InputField from "../InputField";
import DynamicList from "./DynamicList";
import VehicleModal from "./VehicleModal";
import DriverModal from "./DriverModal";
import TourGuideModal from "./TourGuideModal";

// ------- TEMP DATA -------
const tempVehicles = [
  {
    id: 1,
    name: "Toyota Prius",
    type: "Car",
    seats: 4,
    images: [
      "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg?semt=ais_hybrid&w=740&q=80",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0fehJccs0vA7le8QDxQfr_zy1T2Otb5DjYw&s",
    ],
    drivers: [
      {
        id: 101,
        name: "Kasun Perera",
        experience: "5 years",
        rating: 4.8,
        phone: "0771234567",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: 102,
        name: "Ruwan Silva",
        experience: "3 years",
        rating: 4.6,
        phone: "0719876543",
        photo: "https://randomuser.me/api/portraits/men/74.jpg",
      },
    ],
  },

  {
    id: 2,
    name: "Nissan Caravan",
    type: "Van",
    seats: 12,
    images: [
      "https://img.freepik.com/free-photo/van_...jpg",
      "https://img.freepik.com/free-photo/van-inside_...jpg",
    ],
    drivers: [
      {
        id: 201,
        name: "Saman Jayawardena",
        experience: "10 years",
        rating: 4.9,
        phone: "0758877445",
        photo: "https://randomuser.me/api/portraits/men/45.jpg",
      },
      {
        id: 202,
        name: "Nimal Kumara",
        experience: "6 years",
        rating: 4.7,
        phone: "0761122334",
        photo: "https://randomuser.me/api/portraits/men/11.jpg",
      },
    ],
  },

  {
    id: 3,
    name: "Toyota Axio",
    type: "Car",
    seats: 4,
    images: ["https://img.freepik.com/free-photo/sedan_...jpg"],
    drivers: [
      {
        id: 301,
        name: "Isuru Madushan",
        experience: "4 years",
        rating: 4.5,
        phone: "0785566778",
        photo: "https://randomuser.me/api/portraits/men/21.jpg",
      },
    ],
  },
];

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
}) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);

  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // ---- handlers ----
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedDriver(null);
    setShowVehicleModal(false);
  };

  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
    setShowDriverModal(false);
  };

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
        <InputField
          label="Start Location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          enableAutocomplete
        />

        <InputField
          label="End Location"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
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
          <button
            className="glass-btn w-full"
            onClick={() => setShowVehicleModal(true)}
          >
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
          vehicles={tempVehicles}
          onClose={() => setShowVehicleModal(false)}
          onSelect={handleVehicleSelect}
        />
      )}

      {showDriverModal && (
        <DriverModal
          drivers={selectedVehicle?.drivers || []}
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
          src={item.photo || item.images?.[0]}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        <p className="text-lg font-semibold">{item.name}</p>

        {type === "vehicle" && (
          <>
            <p className="text-gray-600 text-sm">{item.type}</p>
            <p className="text-gray-600 text-sm">{item.seats} Seats</p>
          </>
        )}

        {type === "driver" && (
          <>
            <p className="text-gray-600 text-sm">🎖 {item.experience}</p>
            <p className="text-gray-600 text-sm">⭐ {item.rating}</p>
            <p className="text-gray-600 text-sm">📞 {item.phone}</p>
          </>
        )}

        {type === "guide" && (
          <>
            <p className="text-gray-600 text-sm">🎖 {item.experience}</p>
            <p className="text-gray-600 text-sm">
              🌐 {item.languages.join(", ")}
            </p>
            <p className="text-gray-600 text-sm">⭐ {item.rating}</p>
            <p className="text-gray-600 text-sm">📞 {item.phone}</p>
          </>
        )}
      </div>
    </div>
  );
}
