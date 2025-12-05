import InputField from "../InputField";

function BookingDetails({
  nameOfBooker,
  setNameOfBooker,
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
    </div>
  );
}

export default BookingDetails;
