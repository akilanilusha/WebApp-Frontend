import { useState } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import GooglePlaceInput from "../service/GooglePlaceInput";

export default function DynamicList({
  title = "Add Destination",
  destinations,
  setDestinations,
}) {
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() === "") return;
    setDestinations([...destinations, newItem]);
    setNewItem("");
  };

  const removeItem = (index) => {
    setDestinations(destinations.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col">

      {/* TITLE */}
      <label className="text-gray-900 text-[15px] font-medium">
        {title}
      </label>

      {/* INPUT SECTION (ALWAYS VISIBLE) */}
      <div className="sticky top-0  z-10 flex items-center gap-3 pb-2">
        <GooglePlaceInput
          value={newItem}
          onChange={setNewItem}
          placeholder="Enter location"
        />

        <button
          onClick={addItem}
          className="bg-[#0F3B45] text-white px-4 py-3 rounded-md flex items-center gap-2 hover:bg-[#0c2e36]"
        >
          Add <FiPlus />
        </button>
      </div>

      {/* SCROLLABLE DESTINATION LIST */}
      <div className="h-[160px] overflow-y-auto space-y-3 pr-1">
        {destinations.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-xl text-gray-800"
          >
            <span className="truncate">{item}</span>
            <FiTrash2
              className="text-red-500 cursor-pointer hover:text-red-600"
              onClick={() => removeItem(index)}
            />
          </div>
        ))}

        {/* Empty state */}
        {destinations.length === 0 && (
          <p className="text-sm text-gray-400 text-center">
            No destinations added
          </p>
        )}
      </div>
    </div>
  );
}
