import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import BookingDetails from "../components/service/bookingDetails";
import RouteTrip from "../components/service/RouteTrip";
import TripSummary from "../components/service/TripSummery";
import BookingSuccessfulModel from "../components/service/BookingSuccessfulModel";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

import Check from "@mui/icons-material/Check";
import Person from "@mui/icons-material/Person";
import Map from "@mui/icons-material/Map";
import Receipt from "@mui/icons-material/Receipt";

import bgImage from "../assets/bg.webp";

const API_URL = import.meta.env.VITE_BOOKING_SERVICE_API_URL;

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, #2196f3 0%, #21cbf3 50%, #1de9b6 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, #2196f3 0%, #21cbf3 50%, #1de9b6 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ ownerState }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient(136deg, #2196f3 0%, #21cbf3 50%, #1de9b6 100%)",
    boxShadow: "0 4px 10px rgba(0,0,0,.3)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient(136deg, #2196f3 0%, #21cbf3 50%, #1de9b6 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <Person />, // Booking Details
    2: <Map />, // Trip & Route
    3: <Receipt />, // Summary
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {completed ? <Check /> : icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

export default function CustomPackage() {
  /* =============================
     STEPPER (UI ONLY)
  ============================== */
  const steps = ["Booking Details", "Trip, Vehicle & Guide", "Summary"];

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((_, i) => !(i in completed))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleStep = (step) => () => setActiveStep(step);

  const handleComplete = () => {
    // STEP 1 VALIDATION
    if (activeStep === 0) {
      const error = validateStepOne();
      if (error) {
        toast.error(error);
        return;
      }
    }

    // STEP 2 VALIDATION
    if (activeStep === 1) {
      const error = validateStepTwo();
      if (error) {
        toast.error(error);
        return;
      }
    }

    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  /* =============================
     BOOKING DETAILS (UNCHANGED)
  ============================== */
  const [bookingDetails, setBookingDetails] = useState({
    nameOfBooker: "",
    emailAddress: "",
    bookerPhone: "",
    passportNumber: "",
    arrivalDateTime: "",
    departureDateTime: "",
    flightNumber: "",
    departureAirport: "",
    adults: 0,
    children: 0,
    babies: 0,
    specialPassengerNote: "",
  });

  /* =============================
     TRIP DETAILS (UNCHANGED)
  ============================== */
  const [tripDetails, setTripDetails] = useState({
    startLocation: "",
    endLocation: "",
    startDate: "",
    endDate: "",
    isVehicle: false,
    destinations: [],
  });

  /* =============================
     ROUTE DETAILS (UNCHANGED)
  ============================== */
  const [routeDetails, setRouteDetails] = useState({
    routeData: null,
    distance: 0,
    duration: 0,
    costPerKm: 0,
    bookingPrice: 0,
    totalCost: 0,
  });

  /* =============================
     RESOURCES (UNCHANGED)
     (vehicle, driver, guide selected inside RouteTrip)
  ============================== */
  const [resources, setResources] = useState({
    vehicle: null,
    driver: null,
    guide: null,
  });

  /* =============================
     UI STATE
  ============================== */
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  /* =============================
     DERIVED VALUES
  ============================== */
  const passengerCount =
    Number(bookingDetails.adults) +
    Number(bookingDetails.children) +
    Number(bookingDetails.babies);

  const isDateWithinRange = (date, start, end) => {
    const d = new Date(date).getTime();
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();

    return d >= s && d <= e;
  };
  /* =============================
     VALIDATION (UNCHANGED)
  ============================== */
  const validateBeforeConfirm = () => {
    const b = bookingDetails;
    const t = tripDetails;

    if (!b.nameOfBooker) return "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.emailAddress))
      return "Valid email required.";
    if (!b.bookerPhone) return "Phone number is required.";
    if (!b.passportNumber) return "Passport number is required.";
    if (!b.arrivalDateTime) return "Arrival date/time is required.";
    if (!b.departureDateTime) return "Departure date/time is required.";
    if (!b.flightNumber) return "Flight number is required.";
    if (!b.departureAirport) return "Departure airport is required.";

    if (!t.startLocation) return "Start location is required.";
    if (!t.endLocation) return "End location is required.";
    if (!t.startDate) return "Trip start date is required.";
    if (!t.endDate) return "Trip end date is required.";
    if (t.destinations.length === 0)
      return "Please add at least one destination.";

    if (!routeDetails.routeData) return "Please calculate the route first.";

    return null;
  };

  const validateStepOne = () => {
    const b = bookingDetails;

    if (!b.nameOfBooker) return "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.emailAddress))
      return "Valid email is required.";
    if (!b.bookerPhone) return "Phone number is required.";
    if (!b.passportNumber) return "Passport number is required.";
    if (!b.arrivalDateTime) return "Arrival date & time is required.";
    if (!b.departureDateTime) return "Departure date & time is required.";
    if (!b.flightNumber) return "Flight number is required.";
    if (!b.departureAirport) return "Departure airport is required.";

    return null;
  };

  const validateStepTwo = () => {
    const t = tripDetails;
    const b = bookingDetails;

    if (!t.startLocation) return "Start location is required.";
    if (!t.endLocation) return "End location is required.";

    if (!t.startDate) return "Trip start date is required.";
    if (!t.endDate) return "Trip end date is required.";

    // start date must be before or equal to end date
    if (new Date(t.startDate) > new Date(t.endDate)) {
      return "Trip start date cannot be after trip end date.";
    }

    // trip dates must be inside arrival & departure
    if (
      !isDateWithinRange(t.startDate, b.arrivalDateTime, b.departureDateTime)
    ) {
      return "Trip start date must be between arrival and departure dates.";
    }

    if (!isDateWithinRange(t.endDate, b.arrivalDateTime, b.departureDateTime)) {
      return "Trip end date must be between arrival and departure dates.";
    }

    if (t.destinations.length === 0) {
      return "Please add at least one destination.";
    }

    if (!routeDetails.routeData) {
      return "Please calculate the route first.";
    }

    return null;
  };

  /* =============================
     ROUTE CALCULATION (UNCHANGED)
  ============================== */
  const submitTrip = async () => {
    const toastId = toast.loading("Calculating route...");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_GOOGLE_MAPS_API_URL}/api/maps/shortest-route`,
        {
          start: tripDetails.startLocation,
          end: tripDetails.endLocation,
          waypoints: tripDetails.destinations,
        }
      );

      setRouteDetails((prev) => ({
        ...prev,
        routeData: res.data,
        distance: res.data.distance,
        duration: res.data.duration,
      }));

      toast.success("Route calculated successfully!");
    } catch (err) {
      toast.error("Failed to calculate route.");
      console.error(err);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const confirm_booking = async () => {
    const error = validateBeforeConfirm();
    if (error) return toast.error(error);

    if (!localStorage.getItem("token"))
      return toast.error("Please log in to confirm booking.");

    const payload = {
      user: {
        userId: Number(localStorage.getItem("userId")), // ✅ FIXED
        role: localStorage.getItem("role"),
      },

      bookingDetails: {
        nameOfBooker: bookingDetails.nameOfBooker,
        bookerEmail: bookingDetails.emailAddress, // ✅ FIXED KEY
        bookerPhone: bookingDetails.bookerPhone,
        passportNumber: bookingDetails.passportNumber,
        arrivalDateTime: bookingDetails.arrivalDateTime,
        departureDateTime: bookingDetails.departureDateTime,
        flightNumber: bookingDetails.flightNumber,
        departureAirport: bookingDetails.departureAirport,

        passengers: {
          adults: Number(bookingDetails.adults),
          children: Number(bookingDetails.children),
          babies: Number(bookingDetails.babies),
        },
      },

      tripDetails,

      routeDetails: {
        distance: routeDetails.distance,
        duration: routeDetails.duration,
        polyline:
          routeDetails.routeData?.routes?.[0]?.overview_polyline?.points,
        costPerKm: routeDetails.costPerKm,
        bookingPrice: routeDetails.bookingPrice,
      },

      resources: {
        vehicle: { vehicleId: resources.vehicle?.vehicleId ?? null },
        driver: { driverId: resources.driver?.driverId ?? null },
        guide: { guideId: resources.guide?.id ?? null },
      },

      metadata: {
        source: "CUSTOM_PACKAGE",
        packageId: 1,
      },
    };

    try {
      console.log("Booking Payload:", payload);
      await axios.post(`${API_URL}/saveBooking`, payload);
      toast.success("Booking successful!");
      setShowSuccessModal(true);
    } catch (err) {
      toast.error("Booking failed.");
      console.error(err);
    }
  };

  /* =============================
     RENDER
  ============================== */
  return (
    <>
      <div
        className="min-h-screen bg-slate-900/60 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="text-center p-10">
          <h1 className="font-bold text-gray-900 text-4xl">
            Make Your Dream Tour
          </h1>
        </div>

        {/* STEPPER */}
        <Box sx={{ width: "100%", px: 4, mb: 4 }}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* STEP CONTENT */}
        <div className="container mx-auto px-2">
          {activeStep === 0 && (
            <BookingDetails
              bookingDetails={bookingDetails}
              setBookingDetails={setBookingDetails}
            />
          )}

          {activeStep === 1 && (
            <RouteTrip
              tripDetails={tripDetails}
              setTripDetails={setTripDetails}
              routeDetails={routeDetails}
              setRouteDetails={setRouteDetails}
              resources={resources}
              setResources={setResources}
              submitTrip={submitTrip}
              passengerCount={passengerCount}
            />
          )}

          {activeStep === 2 && (
            <TripSummary
              bookingDetails={bookingDetails}
              tripDetails={tripDetails}
              routeDetails={routeDetails}
              resources={resources}
              confirmBooking={confirm_booking}
              setRouteDetails={setRouteDetails}
            />
          )}

          {/* CONTROLS */}
          <Box sx={{ display: "flex", pt: 2, pb: 6, alignItems: "center" }}>
            {/* Back Button */}
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                py: 1,
                fontWeight: 500,
                color: "grey.700",
                border: "1px solid",
                borderColor: "grey.300",
                "&:hover": {
                  backgroundColor: "grey.100",
                },
                "&.Mui-disabled": {
                  opacity: 0.5,
                },
              }}
            >
              Back
            </Button>

            <Box sx={{ flex: "1 1 auto" }} />

            {/* Next / Confirm Button */}
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={confirm_booking}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 4,
                  py: 1.2,
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #16a34a, #22c55e)",
                  boxShadow: "0 8px 20px rgba(34,197,94,0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #15803d, #16a34a)",
                  },
                }}
              >
                Confirm Booking
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleComplete}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 4,
                  py: 1.2,
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                  boxShadow: "0 8px 20px rgba(59,130,246,0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                  },
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </div>
      </div>

      <BookingSuccessfulModel
        open={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          window.location.href = "/dashboard";
        }}
      />
    </>
  );
}
