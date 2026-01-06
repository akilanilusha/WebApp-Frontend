import InputField from "../InputField";

function BookingDetails({
  nameOfBooker,
  setNameOfBooker,
  emailAddress,
  setEmailAddress,
  bookerPhone,
  setBookerPhone,
  passportNumber,
  setPassportNumber,
  arrivalDateTime,
  setArrivalDateTime,
  departureDateTime,
  setDepartureDateTime,
  flightNumber,
  setFlightNumber,
  departureAirport,
  setDepartureAirport,
  adults,
  setAdults,
  children,
  setChildres,
  babies,
  setBabies,
  specialPassengerNote,
  setSpecialPassengerNote,
}) {
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
      {" "}
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Booking Details
      </h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Name of Booker */}
        <InputField
          label="Name of Booker"
          value={nameOfBooker}
          onChange={(e) => setNameOfBooker(e.target.value)}
        />
        <InputField
          label="Email Address"
          type="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
         <InputField
          label="Whatsapp Phone Number"
          value={bookerPhone}
          onChange={(e) => setBookerPhone(e.target.value)}
        />
        {/* Passport Number */}
        <InputField
          label="Passport Number"
          value={passportNumber}
          onChange={(e) => setPassportNumber(e.target.value)}
        />

        {/* Arrival Date and Time */}
        <InputField
          label="Arrival Date and Time"
          type="datetime-local"
          value={arrivalDateTime}
          onChange={(e) => setArrivalDateTime(e.target.value)}
        />

        {/* Departure Date and Time */}
        <InputField
          label="Departure Date and Time"
          type="datetime-local"
          value={departureDateTime}
          onChange={(e) => setDepartureDateTime(e.target.value)}
        />

        {/* Flight Number */}
        <InputField
          label="Flight Number"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
        />

        {/* Departure Airport */}
        <InputField
          label="Departure Airport"
          value={departureAirport}
          onChange={(e) => setDepartureAirport(e.target.value)}
        />
      </div>
      <h1 className="text-xl mt-6 mb-3 text-center font-bold sm:text-left">
        Passenger Count
      </h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Name of Booker */}
        <InputField
          label="Adults"
          type="number"
          value={adults}
          onChange={(e) => setAdults(e.target.value)}
        />

        {/* Passport Number */}
        <InputField
          label="Children"
          type="number"
          value={children}
          onChange={(e) => setChildres(e.target.value)}
        />

        {/* Arrival Date and Time */}
        <InputField
          label="Babies"
          type="number"
          value={babies}
          onChange={(e) => setBabies(e.target.value)}
        />
      </div>
      <textarea
        className="field-sizing-fixed w-full  bg-white text-gray-700
          border border-gray-300
          rounded-md px-4 py-3
          focus:outline-none focus:border-gray-400
          placeholder:text-gray-400
          shadow-sm"
        rows="2"
        placeholder="Add a special note for yourself or any passenger."
        value={specialPassengerNote}
        onChange={(e) => setSpecialPassengerNote(e.target.value)}
      ></textarea>
    </div>
  );
}

export default BookingDetails;
