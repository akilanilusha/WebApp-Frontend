import { useEffect, useRef, useState } from "react";

export default function TripSummary({
  name,
  startLocation,
  endLocation,
  startDate,
  endDate,
  waypoints,
  routeData,
  cost_per_km,
  booking_price,
  guid_cost = 4500.0,
  confirmBooking,
  setDistance,
  setDuration,
  totalCost,
  setTotalCost,
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [summary, setSummary] = useState(null);

  // NEW (ONLY ADDITION)
  const [openDetails, setOpenDetails] = useState(false);

  const millageCharge = (cost_per_km || 0) * (summary?.totalKm || 0);
  totalCost = (booking_price || 0) + millageCharge + (guid_cost || 0);
  setTotalCost(totalCost);

  useEffect(() => {
    const g = window.google;
    if (!g) return;

    if (!mapInstance.current) {
      mapInstance.current = new g.maps.Map(mapRef.current, {
        zoom: 8,
        center: { lat: 7.8731, lng: 80.7718 },
      });
    }

    if (!routeData || !routeData.routes) {
      if (window.currentRouteLine) {
        window.currentRouteLine.setMap(null);
        window.currentRouteLine = null;
      }

      if (window.routeMarkers) {
        window.routeMarkers.forEach((m) => m.setMap(null));
      }
      window.routeMarkers = [];

      mapInstance.current.setZoom(8);
      mapInstance.current.setCenter({ lat: 7.8731, lng: 80.7718 });
      return;
    }

    const route = routeData.routes[0];
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
    const totalTimeText = `${hrs} hrs ${mins} mins`;
    const totalDurationMinutes = Math.floor(totalDur / 60);

    const orderedStops = route.waypoint_order.map((i) => waypoints[i]);

    setSummary({
      legsSummary,
      totalKm,
      totalTimeText,
      orderedStops,
    });

    setDistance(Number(totalKm));
    setDuration(totalDurationMinutes);

    const decoded = g.maps.geometry.encoding.decodePath(
      route.overview_polyline.points
    );

    if (window.currentRouteLine) {
      window.currentRouteLine.setMap(null);
    }

    window.currentRouteLine = new g.maps.Polyline({
      path: decoded,
      geodesic: true,
      strokeColor: "#007aff",
      strokeOpacity: 0.8,
      strokeWeight: 4,
    });

    window.currentRouteLine.setMap(mapInstance.current);

    const bounds = new g.maps.LatLngBounds();
    decoded.forEach((p) => bounds.extend(p));
    mapInstance.current.fitBounds(bounds);

    if (!window.routeMarkers) window.routeMarkers = [];
    window.routeMarkers.forEach((m) => m.setMap(null));
    window.routeMarkers = [];

    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const startMarker = new g.maps.Marker({
      map: mapInstance.current,
      position: legs[0].start_location,
      label: labels[0],
      title: startLocation,
      icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    });
    window.routeMarkers.push(startMarker);

    legs.forEach((leg, i) => {
      const isEnd = i === legs.length - 1;

      const marker = new g.maps.Marker({
        map: mapInstance.current,
        position: leg.end_location,
        label: labels[i + 1],
        title: leg.end_address,
        icon: isEnd
          ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
          : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      });

      window.routeMarkers.push(marker);
    });
  }, [routeData]);

  return (
    <div className="w-full bg-white/60 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-10">
      <h1 className="text-2xl font-bold text-center">Trip Summary</h1>
      <hr className="my-3" />

      <div className="w-full max-w-xl mt-6 space-y-4 text-lg p-4">
        <div className="grid grid-cols-2">
          <span>Name :</span>
          <span>{name}</span>
        </div>
        <div className="grid grid-cols-2">
          <span>Pickup :</span>
          <span>{startLocation}</span>
        </div>
        <div className="grid grid-cols-2">
          <span>Start Date :</span>
          <span>{startDate}</span>
        </div>
        <div className="grid grid-cols-2">
          <span>Drop :</span>
          <span>{endLocation}</span>
        </div>
        <div className="grid grid-cols-2">
          <span>End Date :</span>
          <span>{endDate}</span>
        </div>
        <div className="grid grid-cols-2">
          <span>Distance :</span>
          <span>{summary?.totalKm} Km</span>
        </div>
        <div className="grid grid-cols-2">
          <span>Duration :</span>
          <span>{summary?.totalTimeText}</span>
        </div>
        <div className="grid grid-cols-2">
          <span>Base Fare :</span>
          <span>{booking_price?.toFixed(2)}</span>
        </div>
        <div className="grid grid-cols-2">
          <span>Mileage :</span>
          <span>{millageCharge.toFixed(2)}</span>
        </div>
        <div className="grid grid-cols-2">
          <span>Guide :</span>
          <span>{guid_cost.toFixed(2)}</span>
        </div>

        <hr />

        <div className="grid grid-cols-2 font-bold text-xl">
          <span>Total :</span>
          <span className="text-right">{totalCost.toFixed(2)}</span>
        </div>
      </div>

      <h2 className="text-center text-xl font-medium mt-6">Route Preview</h2>
      <div ref={mapRef} className="w-full h-72 rounded-lg border my-4" />

      {/* 🔹 EXISTING SUMMARY UI (UNCHANGED) */}
      {summary && (
        <div className="bg-white border p-5 rounded-xl shadow-sm text-sm space-y-5">
          <div className="text-green-700 font-semibold">Optimized Route</div>

          <div>
            <p>A — {startLocation}</p>
            {summary.orderedStops.map((s, i) => (
              <p key={i}>
                {String.fromCharCode(66 + i)} — {s}
              </p>
            ))}
            <p>
              {String.fromCharCode(66 + summary.orderedStops.length)} —{" "}
              {endLocation}
            </p>
          </div>

          <button
            onClick={() => setOpenDetails(true)}
            className="w-full border border-green-600 text-green-700 py-2 rounded-lg hover:bg-green-50"
          >
            See Full Route Details
          </button>
        </div>
      )}

      <button
        className="bg-[#0F3B45] text-white w-full py-2 rounded-full mt-6"
        onClick={confirmBooking}
      >
        Confirm Booking
      </button>

      {/*  MODAL (ONLY ADDITION) */}
      {openDetails && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl p-6 relative">
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
              <div key={i} className="border rounded p-4 mb-3">
                <p className="font-semibold">
                  {l.start.split(",")[0]} → {l.end.split(",")[0]}
                </p>
                <p>Distance: {l.dist}</p>
                <p>Duration: {l.time}</p>
              </div>
            ))}

            <div className="bg-green-50 p-4 rounded-lg">
              <p>
                <b>Total Distance:</b> {summary.totalKm} km
              </p>
              <p>
                <b>Total Time:</b> {summary.totalTimeText}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
