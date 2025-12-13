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
  guid_cost=4500.00,
  confirmBooking,
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [summary, setSummary] = useState(null);
  const millageCharge = (cost_per_km || 0) * (summary?.totalKm || 0);
  const totalCost = (booking_price || 0) + millageCharge + (guid_cost || 0);

  useEffect(() => {
    const g = window.google;
    if (!g) return;

    // Initialize map ONE TIME
    if (!mapInstance.current) {
      mapInstance.current = new g.maps.Map(mapRef.current, {
        zoom: 8,
        center: { lat: 7.8731, lng: 80.7718 },
      });
    }

    // ==== SHOW DEFAULT MAP WHEN NO ROUTE ====
    if (!routeData || !routeData.routes) {
      // Clear polyline
      if (window.currentRouteLine) {
        window.currentRouteLine.setMap(null);
        window.currentRouteLine = null;
      }

      // Clear markers
      if (window.routeMarkers) {
        window.routeMarkers.forEach((m) => m.setMap(null));
      }
      window.routeMarkers = [];

      // Reset map
      mapInstance.current.setZoom(8);
      mapInstance.current.setCenter({ lat: 7.8731, lng: 80.7718 });

      return;
    }

    // ===== Route exists: Draw summary and route =====
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

    const orderedStops = route.waypoint_order.map((i) => waypoints[i]);

    setSummary({
      legsSummary,
      totalKm,
      totalTimeText: `${hrs} hrs ${mins} mins`,
      orderedStops,
    });

    // ===== Draw polyline =====
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

    // Fit map bounds
    const bounds = new g.maps.LatLngBounds();
    decoded.forEach((p) => bounds.extend(p));
    mapInstance.current.fitBounds(bounds);

    // Clear old markers
    if (!window.routeMarkers) window.routeMarkers = [];
    window.routeMarkers.forEach((m) => m.setMap(null));
    window.routeMarkers = [];

    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // START Marker
    const startMarker = new g.maps.Marker({
      map: mapInstance.current,
      position: legs[0].start_location,
      label: labels[0],
      title: startLocation,
      icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    });
    window.routeMarkers.push(startMarker);

    // WAYPOINT + END markers
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
    <div
      className="w-full bg-white/60 
  backdrop-blur-xl
  border border-white/20 
  shadow-lg 
  rounded-2xl  p-10"
    >
      <h1 className="text-2xl font-bold text-center">Trip Summary</h1>
      <hr className="my-3" />
      <div className="w-full max-w-xl mt-6 space-y-4 text-lg p-4">
        <div className="grid grid-cols-2">
          <span className="font-light">Name :</span>
          <span>{name || ""}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-light">Pickup Location :</span>
          <span>{startLocation || ""}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-light">Start Date :</span>
          <span>{startDate || ""}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-light">Drop Location :</span>
          <span>{endLocation || ""}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-light">End Date :</span>
          <span>{endDate || ""}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-light">Distance :</span>
          <span>{summary?.totalKm ? summary.totalKm + " Km" : ""}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-light">Time Duration :</span>
          <span>{summary?.totalTimeText || ""}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-light">Base Fare :</span>
          <span className="text-right">{(booking_price || 0).toFixed(2)}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-light">Mileage Charge :</span>
          <span className="text-right">
            {(millageCharge).toFixed(2)}
          </span>
        </div>

        <div className="grid grid-cols-2">
          <span className="font-light">Guide Cost :</span>
          <span className="text-right">{(guid_cost || 0).toFixed(2) || 0.00}</span>
        </div>

        <hr />

        {/* Total Section */}
        <div className="pt-6 grid grid-cols-2 items-center">
          <span className="font-bold text-xl">Total Cost:</span>

          <div className="w-full">
            <div className=" text-right font-semibold">{(totalCost).toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-center font-medium text-xl">Route Preview</h1>

        {/* MAP */}
        <div ref={mapRef} className="w-full h-72 rounded-lg border my-4" />

        {/* {summary && (
          <div className="bg-gray-100 p-4 rounded-lg text-sm">
            <p className="font-semibold text-green-700">
              ✔ Optimized Route Order:
            </p>

            <div className="ml-4 mt-1">
              <p>A — {startLocation}</p>
              {summary.orderedStops.map((stop, i) => (
                <p key={i}>
                  {String.fromCharCode(66 + i)} — {stop}
                </p>
              ))}
              <p>
                {String.fromCharCode(66 + summary.orderedStops.length)} —{" "}
                {endLocation}
              </p>
            </div>

            <hr className="my-3" />

            <p className="font-semibold">📍 Route Details:</p>
            {summary.legsSummary.map((l, i) => (
              <div key={i} className="ml-3 mb-3">
                <p>
                  {String.fromCharCode(65 + i)} → {String.fromCharCode(66 + i)}
                </p>
                <p>Distance: {l.dist}</p>
                <p>Duration: {l.time}</p>
              </div>
            ))}

            <p>
              <b>Total Distance:</b> {summary.totalKm} km
            </p>
            <p>
              <b>Total Time:</b> {summary.totalTimeText}
            </p>
          </div>
        )} */}
      </div>
      <div className="flex justify-cente ">
        <button className="bg-[#0F3B45] text-white w-full py-2 rounded-full flex items-center gap-2 hover:bg-[#0c2e36] justify-center mt-4" onClick={confirmBooking}>
          Confirm & Pay
        </button>
      </div>
    </div>
  );
}
