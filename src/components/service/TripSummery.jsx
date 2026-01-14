import { useEffect, useRef, useState } from "react";

export default function TripSummary({
  bookingDetails,
  tripDetails,
  routeDetails,
  setRouteDetails,
  resources,
  confirmBooking,
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  const [summary, setSummary] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  const guideCost = resources.guide ? 4500 : 0;

  /* =============================
     CALCULATE TOTAL COST
  ============================= */
  useEffect(() => {
    if (!summary) return;

    const mileage =
      (routeDetails.costPerKm || 0) * Number(summary.totalKm || 0);

    const total =
      (routeDetails.bookingPrice || 0) +
      mileage +
      guideCost;

    setRouteDetails((prev) => ({
      ...prev,
      totalCost: total,
    }));
  }, [summary, routeDetails.costPerKm, routeDetails.bookingPrice, guideCost]);

  /* =============================
     MAP + ROUTE LOGIC
  ============================= */
  useEffect(() => {
    const g = window.google;
    if (!g || !routeDetails.routeData) return;

    if (!mapInstance.current) {
      mapInstance.current = new g.maps.Map(mapRef.current, {
        zoom: 8,
        center: { lat: 7.8731, lng: 80.7718 },
      });
    }

    const route = routeDetails.routeData.routes[0];
    const legs = route.legs;

    let totalDist = 0;
    let totalDur = 0;

    const legsSummary = legs.map((leg) => {
      totalDist += leg.distance.value;
      totalDur += leg.duration.value;
      return {
        start: leg.start_address,
        end: leg.end_address,
        dist: leg.distance.text,
        time: leg.duration.text,
      };
    });

    const totalKm = (totalDist / 1000).toFixed(2);
    const hrs = Math.floor(totalDur / 3600);
    const mins = Math.floor((totalDur % 3600) / 60);

    const orderedStops = route.waypoint_order.map(
      (i) => tripDetails.destinations[i]
    );

    setSummary({
      legsSummary,
      totalKm,
      totalTimeText: `${hrs} hrs ${mins} mins`,
      orderedStops,
    });

    setRouteDetails((prev) => ({
      ...prev,
      distance: Number(totalKm),
      duration: Math.floor(totalDur / 60),
    }));

    /* -------- CLEAR OLD MAP ITEMS -------- */
    if (window.currentRouteLine) {
      window.currentRouteLine.setMap(null);
      window.currentRouteLine = null;
    }

    if (window.routeMarkers) {
      window.routeMarkers.forEach((m) => m.setMap(null));
    }
    window.routeMarkers = [];

    /* -------- DRAW POLYLINE -------- */
    const decoded = g.maps.geometry.encoding.decodePath(
      route.overview_polyline.points
    );

    window.currentRouteLine = new g.maps.Polyline({
      path: decoded,
      geodesic: true,
      strokeColor: "#007aff",
      strokeOpacity: 0.85,
      strokeWeight: 4,
    });

    window.currentRouteLine.setMap(mapInstance.current);

    const bounds = new g.maps.LatLngBounds();
    decoded.forEach((p) => bounds.extend(p));
    mapInstance.current.fitBounds(bounds);

    /* -------- MARKERS -------- */
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // START
    const startMarker = new g.maps.Marker({
      map: mapInstance.current,
      position: legs[0].start_location,
      label: labels[0],
      title: tripDetails.startLocation,
      icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    });
    window.routeMarkers.push(startMarker);

    // WAYPOINTS + END
    legs.forEach((leg, i) => {
      const isLast = i === legs.length - 1;

      const marker = new g.maps.Marker({
        map: mapInstance.current,
        position: leg.end_location,
        label: labels[i + 1],
        title: leg.end_address,
        icon: isLast
          ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
          : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      });

      window.routeMarkers.push(marker);
    });
  }, [routeDetails.routeData]);

  /* =============================
     RENDER
  ============================= */
  return (
    <div className="w-full bg-white/60 backdrop-blur-xl border shadow rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-center">Trip Summary</h1>
      <hr className="my-4" />

      <div className="space-y-3 text-lg">
        <Row label="Name" value={bookingDetails.nameOfBooker} />
        <Row label="Pickup" value={tripDetails.startLocation} />
        <Row label="Start Date" value={tripDetails.startDate} />
        <Row label="Drop" value={tripDetails.endLocation} />
        <Row label="End Date" value={tripDetails.endDate} />
        <Row label="Distance" value={`${summary?.totalKm || 0} km`} />
        <Row label="Duration" value={summary?.totalTimeText || "-"} />
        <Row label="Base Fare" value={routeDetails.bookingPrice} />
        <Row
          label="Mileage"
          value={(
            (routeDetails.costPerKm || 0) *
            Number(summary?.totalKm || 0)
          ).toFixed(2)}
        />
        <Row label="Guide" value={guideCost.toFixed(2)} />

        <hr />

        <Row
          label="Total"
          value={routeDetails.totalCost?.toFixed(2)}
          bold
        />
      </div>

      <h2 className="text-center text-xl font-medium mt-6">
        Route Preview
      </h2>

      <div ref={mapRef} className="w-full h-72 rounded-lg border my-4" />

      {/* ORDERED ROUTE TEXT */}
      {summary && (
        <div className="bg-white border p-5 rounded-xl shadow-sm text-sm space-y-3 mt-4">
          <div className="font-semibold text-green-700">
            Optimized Route Order
          </div>

          <p><b>A</b> — {tripDetails.startLocation}</p>

          {summary.orderedStops.map((stop, i) => (
            <p key={i}>
              <b>{String.fromCharCode(66 + i)}</b> — {stop}
            </p>
          ))}

          <p>
            <b>
              {String.fromCharCode(66 + summary.orderedStops.length)}
            </b>{" "}
            — {tripDetails.endLocation}
          </p>

          <button
            onClick={() => setOpenDetails(true)}
            className="w-full border border-green-600 text-green-700 py-2 rounded-lg hover:bg-green-50"
          >
            See Full Route Details
          </button>
        </div>
      )}

      <button
        className="bg-[#0F3B45] text-white w-full py-3 rounded-full mt-6"
        onClick={confirmBooking}
      >
        Confirm Booking
      </button>

      {/* FULL ROUTE DETAILS MODAL */}
      {openDetails && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white max-w-3xl w-full p-6 rounded-xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setOpenDetails(false)}
              className="absolute top-3 right-4 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              Full Route Details
            </h2>

            {summary.legsSummary.map((l, i) => (
              <div key={i} className="border p-4 rounded mb-3">
                <p className="font-semibold">
                  {l.start.split(",")[0]} → {l.end.split(",")[0]}
                </p>
                <p>Distance: {l.dist}</p>
                <p>Duration: {l.time}</p>
              </div>
            ))}

            <div className="bg-green-50 p-4 rounded-lg">
              <p><b>Total Distance:</b> {summary.totalKm} km</p>
              <p><b>Total Time:</b> {summary.totalTimeText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- HELPER ---------------- */

function Row({ label, value, bold }) {
  return (
    <div className={`grid grid-cols-2 ${bold ? "font-bold text-xl" : ""}`}>
      <span>{label} :</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
