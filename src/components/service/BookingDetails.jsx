import InputField from "../InputField";

function BookingDetails({ bookingDetails, setBookingDetails }) {
  const handleChange = (field, value) => {
    setBookingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div
      className="
        bg-white/50 
        backdrop-blur-xl
        border border-white/20 
        shadow-lg 
        rounded-2xl 
        p-6 
        mb-10
      "
    >
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Booking Details
      </h1>

      {/* Booking Info */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        <InputField
          label="Name of Booker"
          value={bookingDetails.nameOfBooker}
          onChange={(e) =>
            handleChange("nameOfBooker", e.target.value)
          }
        />

        <InputField
          label="Email Address"
          type="email"
          value={bookingDetails.emailAddress}
          onChange={(e) =>
            handleChange("emailAddress", e.target.value)
          }
        />

        <InputField
          label="Whatsapp Phone Number"
          value={bookingDetails.bookerPhone}
          onChange={(e) =>
            handleChange("bookerPhone", e.target.value)
          }
        />

        <InputField
          label="Passport Number"
          value={bookingDetails.passportNumber}
          onChange={(e) =>
            handleChange("passportNumber", e.target.value)
          }
        />

        <InputField
          label="Arrival Date and Time"
          type="datetime-local"
          value={bookingDetails.arrivalDateTime}
          onChange={(e) =>
            handleChange("arrivalDateTime", e.target.value)
          }
        />

        <InputField
          label="Departure Date and Time"
          type="datetime-local"
          value={bookingDetails.departureDateTime}
          onChange={(e) =>
            handleChange("departureDateTime", e.target.value)
          }
        />

        <InputField
          label="Flight Number"
          value={bookingDetails.flightNumber}
          onChange={(e) =>
            handleChange("flightNumber", e.target.value)
          }
        />

        <InputField
          label="Departure Airport"
          value={bookingDetails.departureAirport}
          onChange={(e) =>
            handleChange("departureAirport", e.target.value)
          }
        />
      </div>

      {/* Passenger Count */}
      <h1 className="text-xl mt-6 mb-3 font-bold text-center sm:text-left">
        Passenger Count
      </h1>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        <InputField
          label="Adults"
          type="number"
          value={bookingDetails.adults}
          onChange={(e) =>
            handleChange("adults", e.target.value)
          }
        />

        <InputField
          label="Children"
          type="number"
          value={bookingDetails.children}
          onChange={(e) =>
            handleChange("children", e.target.value)
          }
        />

        <InputField
          label="Babies"
          type="number"
          value={bookingDetails.babies}
          onChange={(e) =>
            handleChange("babies", e.target.value)
          }
        />
      </div>

      {/* Special Note */}
      <textarea
        className="
          w-full mt-6 bg-white text-gray-700
          border border-gray-300
          rounded-md px-4 py-3
          focus:outline-none focus:border-gray-400
          placeholder:text-gray-400
          shadow-sm
        "
        rows="2"
        placeholder="Add a special note for yourself or any passenger."
        value={bookingDetails.specialPassengerNote}
        onChange={(e) =>
          handleChange("specialPassengerNote", e.target.value)
        }
      />
    </div>
  );
}

export default BookingDetails;
