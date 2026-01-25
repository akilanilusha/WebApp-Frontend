import axios from "axios";
import React, { useMemo } from "react";

// IMAGE CAROUSEL
function ImageCarousel({ images }) {
  const [index, setIndex] = React.useState(0);

  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  const touchStartX = React.useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    if (touchStartX.current - endX > 50) next();
    if (endX - touchStartX.current > 50) prev();
  };

  return (
    <div
      className="relative w-full h-40 overflow-hidden rounded-lg bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={images[index]}
        alt="vehicle"
        className="w-full h-full object-cover transition-all duration-300"
      />

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full px-2 py-1 text-black"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full px-2 py-1 text-black"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// MAIN MODAL COMPONENT
function VehicleModal({ vehicles, onClose, onSelect, passengerCount }) {
  async function viewVehicle(vehicleId) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_VEHICLE_SERVICE_API_URL}/vehicleController/api/v1/detailsOfVehicle/${vehicleId}`,
      );
      console.log("Vehicle Details:", response.data);
    } catch (error) {
      console.error("Error viewing vehicle:", error);
    }
  }

  // ✅ FIX: filter outside JSX
  const suggestedVehicles = useMemo(() => {
    return vehicles.filter(
      (v) => Number(v.passengerCount) >= Number(passengerCount),
    );
  }, [vehicles, passengerCount]);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-lg">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Select a Vehicle</h2>
          <button className="text-lg font-bold" onClick={onClose}>
            ✖
          </button>
        </div>

        {/* SUGGESTED VEHICLES */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Suggested Vehicles</h2>

          {suggestedVehicles.length === 0 && (
            <p className="text-gray-500">No suitable vehicles found</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedVehicles.map((v) => (
              <div
                key={v.vehicleId}
                className="border rounded-xl p-3 hover:bg-gray-100 transition"
              >
                <ImageCarousel images={v.vehicleImages} />

                <h3 className="text-xl font-semibold mt-2">{v.vehicleName}</h3>
                <p className="text-gray-600">Type: {v.type}</p>
                <p className="text-gray-600">
                  Passenger count: {v.passengerCount}
                </p>
                <p className="text-gray-600">
                  Booking Price: {v.bookingPrice?.toFixed(2)} USD
                </p>
                <p className="text-gray-600">
                  Cost per km: {v.costPerKm?.toFixed(2)} USD
                </p>

                <div>
                  <button onClick={() => viewVehicle(v.vehicleId)}>view</button>
                  <button
                    onClick={() => onSelect(v)}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  >
                    Select Vehicle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ALL VEHICLES */}
        <div>
          <h2 className="text-xl font-semibold mb-3">All Vehicles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((v) => (
              <div
                key={v.vehicleId}
                className="border rounded-xl p-3 hover:bg-gray-100 transition"
              >
                <ImageCarousel images={v.vehicleImages} />

                <h3 className="text-xl font-semibold mt-2">{v.vehicleName}</h3>
                <p className="text-gray-600">Type: {v.type}</p>
                <p className="text-gray-600">
                  Passenger count: {v.passengerCount}
                </p>
                <p className="text-gray-600">
                  Booking Price: {v.bookingPrice?.toFixed(2)} USD
                </p>
                <p className="text-gray-600">
                  Cost per km: {v.costPerKm?.toFixed(2)} USD
                </p>

                <div>
                  <button
                    onClick={() => viewVehicle(v.vehicleId)}
                    className="mt-3 w-full text-blue py-2 rounded-md hover:bg-blue-700 hover:text-white outline-accent outline-1"
                  >
                    view
                  </button>
                  <button
                    onClick={() => onSelect(v)}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  >
                    Select Vehicle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleModal;
