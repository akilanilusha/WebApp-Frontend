import { useState } from "react";
import InputField from "../InputField";
import DynamicList from "./DynamicList";
import VehicleModal from "./VehicleModal";
import DriverModal from "./DriverModal";
import TourGuideModal from "./TourGuideModal";

// --------------------
// TEMP DATA (Vehicles + Related Drivers)
// --------------------
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

// --------------------
// MAIN COMPONENT
// --------------------
function RouteTrip({
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

  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showDriverModal, setShowDriverModal] = useState(false);

  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showGuideModal, setShowGuideModal] = useState(false);

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedDriver(null); // reset driver when changing vehicle
    setShowVehicleModal(false);
  };

  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
    setShowDriverModal(false);
  };

  return (
    <div className="bg-gray-50 mb-10 p-6 rounded-xl">
      <h1 className="text-3xl font-bold mb-6">Trip Details</h1>

      <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 items-start">
        {/* Start Location */}
        <InputField
          label="Start Location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          enableAutocomplete={true}
        />

        {/* End Location */}
        <InputField
          label="End Location"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
        />

        {/* Destination List */}
        <div className="row-span-2">
          <DynamicList
            title="Add Destination"
            destinations={destinations}
            setDestinations={setDestinations}
          />
        </div>

        {/* Start Date */}
        <InputField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        {/* End Date */}
        <InputField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        {/* VEHICLE SELECTION */}
        <div>
          <button
            className="bg-[#fafafa] border border-black px-4 py-3 rounded-md hover:bg-gray-300 w-full text-center"
            onClick={() => setShowVehicleModal(true)}
          >
            Select Vehicle
          </button>

          {selectedVehicle && (
            <div className="mt-3 p-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 h-40 flex items-center">
              <div className="flex gap-4 items-center w-full">
                {/* Vehicle Image */}
                <div className="w-28 h-28 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                  <img
                    src={selectedVehicle.images[0]}
                    className="w-full h-full object-cover"
                    alt="vehicle"
                  />
                </div>

                {/* Vehicle Details */}
                <div className="flex flex-col justify-center flex-grow">
                  <p className="text-xl font-semibold">
                    {selectedVehicle.name}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {selectedVehicle.type}
                  </p>

                  <div className="mt-2 py-1 px-3 bg-gray-100 rounded-full text-sm w-fit">
                    🚘 {selectedVehicle.seats} Seats
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* DRIVER SELECTION */}
        <div>
          <button
            className="bg-[#fafafa] border border-black px-4 py-3 rounded-md hover:bg-gray-300 w-full text-center"
            disabled={!selectedVehicle}
            onClick={() => setShowDriverModal(true)}
          >
            Select Driver
          </button>

          {selectedDriver && (
            <div className="mt-3 p-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 h-40 flex items-center">
              <div className="flex gap-4 items-center w-full">
                {/* Driver Image */}
                <div className="w-28 h-28 rounded-xl overflow-hidden border shadow-sm flex-shrink-0">
                  <img
                    src={selectedDriver.photo}
                    className="w-full h-full object-cover"
                    alt="driver"
                  />
                </div>

                {/* Driver Details */}
                <div className="flex flex-col justify-center flex-grow">
                  <p className="text-xl font-semibold">{selectedDriver.name}</p>

                  <p className="text-gray-600 text-sm mt-1">
                    🎖 Experience: {selectedDriver.experience}
                  </p>

                  <p className="text-gray-600 text-sm">
                    ⭐ Rating: {selectedDriver.rating}
                  </p>

                  <p className="text-gray-600 text-sm">
                    📞 {selectedDriver.phone}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            className="bg-[#fafafa] border border-black px-4 py-3 rounded-md hover:bg-gray-300 w-full text-center"
            onClick={() => setShowGuideModal(true)}
          >
            Select Tour Guide
          </button>

          {selectedGuide && (
            <div className="mt-3 p-4 rounded-2xl border border-gray-200 bg-white shadow-sm h-40 flex items-center">
              <div className="flex gap-4 items-center w-full">
                <div className="w-28 h-28 rounded-xl overflow-hidden border shadow-sm">
                  <img
                    src={selectedGuide.photo}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-xl font-semibold">{selectedGuide.name}</p>
                  <p className="text-gray-600 text-sm">
                    🎖 Experience: {selectedGuide.experience}
                  </p>
                  <p className="text-gray-600 text-sm">
                    🌐 {selectedGuide.languages.join(", ")}
                  </p>
                  <p className="text-gray-600 text-sm">
                    ⭐ {selectedGuide.rating}
                  </p>
                  <p className="text-gray-600 text-sm">
                    📞 {selectedGuide.phone}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PROCEED BUTTON */}
        <div>
          <button
            className="bg-[#fafafa] border border-black px-4 py-3 rounded-md hover:bg-gray-300 w-full text-center"
            onClick={submit}
          >
            Proceed
          </button>
        </div>
      </div>

      {/* VEHICLE MODAL */}
      {showVehicleModal && (
        <VehicleModal
          vehicles={tempVehicles}
          onClose={() => setShowVehicleModal(false)}
          onSelect={handleVehicleSelect}
        />
      )}

      {/* DRIVER MODAL */}
      {showDriverModal && selectedVehicle && (
        <DriverModal
          drivers={selectedVehicle.drivers}
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

export default RouteTrip;
