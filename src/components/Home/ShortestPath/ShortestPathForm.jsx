import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import RouteMap from "./RouteMap";
import GooglePlaceInput from "../../service/GooglePlaceInput";
import DynamicAdd from "./DynamicAdd";
import { IoRocketOutline } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { CgSmartphoneChip } from "react-icons/cg";

export default function ShortestPathForm() {
  const [routeData, setRouteData] = useState({
    startLocation: "",
    endLocation: "",
    destinations: [],
    travelMode: "DRIVING",
  });

  const [routeDetails, setRouteDetails] = useState(null);

  const updateField = (field, value) => {
    setRouteData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ================= SUBMIT ================= */

  const calculateShortestPath = async () => {
    if (!routeData.startLocation || !routeData.endLocation) {
      toast.error("Please select start and end locations");
      return;
    }

    const toastId = toast.loading("Calculating route...");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_GOOGLE_MAPS_API_URL}/api/maps/shortest-route`,
        {
          start: routeData.startLocation,
          end: routeData.endLocation,
          waypoints:
            routeData.travelMode === "TRANSIT" ? [] : routeData.destinations,
          travelMode: routeData.travelMode,
        }
      );

      setRouteDetails({
        routeData: res.data,
        distance: res.data.distance,
        duration: res.data.duration,
        polyline: res.data.polyline,
        travelMode: routeData.travelMode,
      });

      toast.success("Route calculated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to calculate route");
    } finally {
      toast.dismiss(toastId);
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-2xl bg-white/60 backdrop-blur-xl border shadow">
      {/* FORM */}
      <div className="p-6">
        <h2 className="text-black text-lg md:text-3xl font-semibold text-center mb-10">
          DESIGN YOUR
          <span className="text-[#1DA9CC]"> JOURNEY</span>
        </h2>
        <div className="space-y-5">
          <GooglePlaceInput
            label="Start Location"
            value={routeData.startLocation}
            onChange={(val) => updateField("startLocation", val)}
          />

          <GooglePlaceInput
            label="End Location"
            value={routeData.endLocation}
            onChange={(val) => updateField("endLocation", val)}
          />
          <div>
            <label htmlFor="travelMode">Travel Mode</label>
            <select
              className=" w-full bg-white text-gray-700
          border border-gray-300
          rounded-md px-4 py-3
          focus:outline-none focus:border-gray-400
          placeholder:text-gray-400
          shadow-sm"
              value={routeData.travelMode}
              onChange={(e) => updateField("travelMode", e.target.value)}
            >
              <option value="DRIVING">🚗 Driving</option>
              <option value="WALKING">🚶 Walking</option>
              <option value="BICYCLING">🚴 Cycling</option>
              <option value="TRANSIT">🚆 Train</option>
            </select>
          </div>

          {routeData.travelMode !== "TRANSIT" && (
            <DynamicAdd
              title="Waypoints"
              destinations={routeData.destinations}
              setDestinations={(list) => updateField("destinations", list)}
            />
          )}

          <button
            onClick={calculateShortestPath}
            className="w-full p-3 rounded-md text-white bg-[#1DA9CC]"
          >
            Calculate Shortest Path
          </button>
        </div>
      </div>

      {/* RESULT (TripSummery-style RouteMap) */}
      <div className="flex items-center justify-center ">
        {routeDetails ? (
          <RouteMap
            routeDetails={routeDetails}
            setRouteDetails={setRouteDetails}
            tripDetails={routeData}
          />
        ) : (
          <div className="rounded-2x gentle-bounce m-4">
            <div className="max-w-2xl text-center p-8 rounded-2xl shadow-xl">
              <h2 className="text-3xl font-extrabold mb-4">
                Smart Route Planning Made Easy
              </h2>

              <p className="text-gray-600 mb-6">
                Plan efficient journeys with intelligent route optimization,
                multi-stop support, and real-time distance insights — designed
                to save your time and fuel.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center text-center">
                  <IoRocketOutline className="text-3xl text-[#1DA9CC]" />

                  <h4 className="font-semibold mt-2">Fast & Accurate</h4>
                  <p className="text-sm text-gray-500">
                    Instant route calculation
                  </p>
                </div>

                <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center text-center">
                  <FaMapLocationDot className="text-3xl text-[#1DA9CC]" />

                  <h4 className="font-semibold mt-2">Multi-Location Support</h4>
                  <p className="text-sm text-gray-500">
                    Add multiple stops easily
                  </p>
                </div>

                <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center text-center">
                  <CgSmartphoneChip className="text-3xl text-[#1DA9CC]" />

                  <h4 className="font-semibold mt-2">Smart Decisions</h4>
                  <p className="text-sm text-gray-500">
                    Distance & time insights
                  </p>
                </div>
                
              </div>

              <p className="text-md font-medium text-gray-700 mb-4">
                Get the full experience — make your trip with us
              </p>

              {/* CTA Button – logic will be added later */}
              <button className="px-6 py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-900 transition">
                Book Your Trip 🚗
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
