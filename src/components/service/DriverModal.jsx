import React from "react";

function DriverModal({ drivers, onClose, onSelect }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-xl max-h-[80vh] overflow-y-auto shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Select a Driver</h2>
          <button className="text-lg font-bold" onClick={onClose}>✖</button>
        </div>

        {/* Driver List */}
        <div className="grid grid-cols-1 gap-4">
          {drivers.map((d) => (
            <div
              key={d.id}
              className="border rounded-xl p-3 hover:bg-gray-100 flex gap-4 items-center"
            >
              <img
                src={d.photo}
                alt={d.name}
                className="w-20 h-20 rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="text-xl font-semibold">{d.name}</h3>
                <p className="text-gray-600">Experience: {d.experience}</p>
                <p className="text-gray-600">Rating: ⭐ {d.rating}</p>
                <p className="text-gray-600">Phone: {d.phone}</p>

                <button
                  onClick={() => onSelect(d)}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Select Driver
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default DriverModal;
