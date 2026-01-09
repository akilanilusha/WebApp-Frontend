import { useState } from "react";
import Select from "react-select";
import { FaLocationDot } from "react-icons/fa6";
import { TbLocationShare } from "react-icons/tb";

const destinationOptions = [
  { value: "Kandy", label: "Kandy" },
  { value: "Nuwara Eliya", label: "Nuwara Eliya" },
  { value: "Ella", label: "Ella" },
  { value: "Galle", label: "Galle" },
  { value: "Sigiriya", label: "Sigiriya" },
  { value: "Colombo", label: "Colombo" },
];

export default function RoutePlanner() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [destinations, setDestinations] = useState([]);

  const isValid = start.trim() && end.trim();

  const handlePlanTrip = () => {
    const payload = {
      start,
      end,
      destinations: destinations.map((d) => d.value),
    };

    console.log("Plan Trip Payload:", payload);
    // 👉 call backend / route API here
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 text-black">
      {/* INPUT CARD */}
      <div
        className="
  bg-white/70
  backdrop-blur-xl
  border border-white/30
  rounded-2xl
  shadow-2xl
  p-6
"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {/* START LOCATION */}
          <div>
            <div className="flex items-center gap-2 border-b border-teal-500 py-2">
              <FaLocationDot className="text-teal-500 text-lg" />
              <input
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-black px-2 py-1 focus:outline-none placeholder-black"
                type="text"
                placeholder="Enter Start Location"
              />
            </div>
          </div>

          {/* END LOCATION */}
          <div>
            <div className="flex items-center gap-2 border-b border-teal-500 py-2">
              <FaLocationDot className="text-red-500 text-lg" />
              <input
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-black px-2 py-1 focus:outline-none placeholder-black"
                type="text"
                placeholder="Enter End Location"
              />
            </div>
          </div>

          {/* DESTINATIONS */}
          <div>
            <div className="flex items-center gap-2 border-b border-teal-500">
              <TbLocationShare className="text-teal-500 text-lg" />

              <Select
                isMulti
                options={destinationOptions}
                value={destinations}
                onChange={setDestinations}
                placeholder="Select destinations"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none",
                    minHeight: "44px",
                  }),
                  indicatorSeparator: () => ({ display: "none" }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    color: "#00000",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    paddingLeft: 0,
                    paddingRight: 0,
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#00000",
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "#f3f4f6",
                    borderRadius: "9999px",
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "#374151",
                    fontSize: "0.75rem",
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: "#6b7280",
                    ":hover": {
                      backgroundColor: "transparent",
                      color: "#111827",
                    },
                  }),
                }}
              />
            </div>
          </div>

          {/* PLAN TRIP BUTTON */}
          <div className="flex md:justify-end">
            <button
              onClick={handlePlanTrip}
              disabled={!isValid}
              className={`
                w-full md:w-auto
                px-8 py-3
                rounded-full
                font-semibold
                transition
                shadow-md
                ${
                  isValid
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-white-600 border border-blue-600 cursor-not-allowed"
                }
              `}
            >
              Plan Your Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
