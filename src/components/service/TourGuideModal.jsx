import React from "react";

function TourGuideModal({ guides, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-xl max-h-[80vh] overflow-y-auto shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Select a Tour Guide</h2>
          <button className="text-lg font-bold" onClick={onClose}>✖</button>
        </div>

        {/* Guide List */}
        <div className="grid grid-cols-1 gap-4">
          {guides.map((g) => (
            <div
              key={g.id}
              className="border rounded-xl p-3 hover:bg-gray-100 flex gap-4 items-center"
            >
              <img
                src={g.photo}
                alt={g.name}
                className="w-20 h-20 rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="text-xl font-semibold">{g.name}</h3>

                <p className="text-gray-600 text-sm">
                  🎖 Experience: {g.experience}
                </p>

                <p className="text-gray-600 text-sm">
                  🌐 Languages: {g.languages.join(", ")}
                </p>

                <p className="text-gray-600 text-sm">⭐ {g.rating}</p>
                <p className="text-gray-600 text-sm">📞 {g.phone}</p>

                <button
                  onClick={() => onSelect(g)}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Select Guide
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default TourGuideModal;
