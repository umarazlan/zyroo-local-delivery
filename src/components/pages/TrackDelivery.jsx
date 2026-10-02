import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { getDeliveries } from "../../services/deliveryService";
import { useAppContext } from "../../context/AppContext";

export default function TrackDeliveryPage() {
  const {
    activeDelivery,
    orders,
    selectActiveDelivery,
  } = useAppContext();

  // 1. Tracking steps
  const trackingSteps = [
    {
      status: "ASSIGNED",
      label: "Rider Assigned",
    },
    {
      status: "ACCEPTED",
      label: "Accepted",
    },
    {
      status: "PICKED UP",
      label: "Picked Up",
    },
    {
      status: "IN TRANSIT",
      label: "In Transit",
    },
    {
      status: "DELIVERED",
      label: "Delivered",
    },
  ];

  // 2. Current step
  const currentStepIndex = trackingSteps.findIndex(
    (step) => step.status === activeDelivery?.status
  );

  // 3. States
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searched, setSearched] = useState(false);
  const [directions, setDirections] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [shipment, setShipment] = useState(null);

  // 4. Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapContainerStyle = {
    width: "100%",
    height: "420px",
  };

  const pickupLocation = {
    lat: 34.1989,
    lng: 72.0401,
  };

  const riderLocation = {
    lat: 34.55,
    lng: 72.05,
  };

  const deliveryLocation = {
    lat: 34.7333,
    lng: 71.9333,
  };

  // 5. Fetch deliveries
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const data = await getDeliveries();

        console.log("Deliveries from Mockaroo:", data);

        setDeliveries(data);
      } catch (error) {
        console.error("Failed to fetch deliveries:", error);
      }
    };

    fetchDeliveries();
  }, []);

  // 6. Tracking search
  const handleTrackSubmit = (e) => {
    e.preventDefault();

    const searchedTrackingId =
      trackingNumber.trim().toUpperCase();

    const foundDelivery = deliveries.find(
      (delivery) =>
        delivery.trackingId?.trim().toUpperCase() ===
        searchedTrackingId
    );

    console.log("Found delivery:", foundDelivery);

    if (!foundDelivery) {
      setShipment(null);
      setSearched(false);
      alert("Tracking number not found");
      return;
    }

    setShipment(foundDelivery);
    setSearched(true);
    selectActiveDelivery(foundDelivery);
  };

const calculateRoute = () => {
  if (!window.google) {
    console.error("Google Maps is not loaded yet.");
    return;
  }

  const directionsService =
    new window.google.maps.DirectionsService();

  directionsService.route(
    {
      origin: pickupLocation,
      destination: deliveryLocation,
      waypoints: [
        {
          location: riderLocation,
          stopover: true,
        },
      ],
      travelMode: window.google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === "OK") {
        setDirections(result);
      } else {
        console.error(
          "Directions request failed:",
          status
        );
      }
    }
  );
};

  return (
    <div className="min-h-screen bg-indigo-50 py-6 px-3 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header & Search Bar */}
        <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-950 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full inline-block mb-3 backdrop-blur-sm">
              ⚡ Live GPS Telemetry
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
              Track Your Delivery
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
              Enter your tracking number or consignment reference below to pull
              real-time corridor telemetry, rider location, and estimated
              arrival windows.
            </p>

            <form
              onSubmit={handleTrackSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  📦
                </span>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter Tracking ID (e.g. TRK-9842-NW)"
                  className="w-full pl-10 pr-4 py-3 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-indigo-500 backdrop-blur-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-colors shadow-sm shrink-0"
              >
                Track Consignment
              </button>
            </form>
          </div>
        </div>

        {searched && shipment && activeDelivery &&  (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Live Status & Map Simulation */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                      Tracking Reference
                    </span>
                    <h2 className="text-xl font-black text-gray-900 mt-0.5">
                      {shipment.trackingId}
                    </h2>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] text-gray-400 uppercase font-bold">
                      Order Status
                    </span>

                    <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-bold">
                      🛵 {activeDelivery.status}
                    </span>
                  </div>
                </div>

                {/* Corridor Route Visualizer */}
                {/* <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 mb-6 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Origin Hub</span>
                      <span className="text-xs font-bold text-gray-900">{shipment.origin}</span>
                    </div>
                    <div className="bg-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                      ⚡ {shipment.speed}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Destination</span>
                      <span className="text-xs font-bold text-gray-900">{shipment.destination}</span>
                    </div>
                  </div>

                  <div className="relative h-6 w-full flex items-center mb-2">
                    <div className="absolute inset-x-0 h-1 bg-indigo-100 rounded-full"></div>
                    <div className="absolute left-1/3 size-3 rounded-full bg-indigo-600 ring-4 ring-indigo-50 animate-pulse"></div>
                  </div>

                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500">In Progress</span>
                    <span className="text-indigo-600">ETA: {shipment.eta}</span>
                  </div>
                </div> */}
                {/* Google Maps Tracking */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">
                        Live Route
                      </span>

                      <span className="text-sm font-bold text-gray-900">
                        {shipment.origin} → {shipment.destination}
                      </span>
                    </div>

                    <div className="bg-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      ⚡ {shipment.speed}
                    </div>
                  </div>

                  {!isLoaded ? (
                    <div className="h-[420px] rounded-2xl bg-gray-200 flex items-center justify-center">
                      <p className="text-sm text-gray-500">
                        Loading Google Maps...
                      </p>
                    </div>
                  ) : (
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={riderLocation}
                      zoom={9}
                      options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: true,
                      }}
                      onLoad={() => calculateRoute()}
                    >
                      {/* Pickup */}
                      <Marker
                        position={pickupLocation}
                        label="P"
                        title="Pickup - Mardan"
                      />

                      {/* Rider */}
                      <Marker
                        position={riderLocation}
                        label="R"
                        title="Rider - Chakdara"
                      />

                      {/* Delivery */}
                      <Marker
                        position={deliveryLocation}
                        label="D"
                        title="Delivery - Timergara"
                      />

                      {/* Route */}
                      {directions && (
                        <DirectionsRenderer
                          directions={directions}
                          options={{
                            suppressMarkers: true,
                            polylineOptions: {
                              strokeColor: "#4f46e5",
                              strokeWeight: 5,
                            },
                          }}
                        />
                      )}
                    </GoogleMap>
                  )}

                  <div className="flex justify-between mt-4 text-xs font-semibold">
                    <span className="text-gray-500">📍 Mardan</span>

                    <span className="text-indigo-600">🛵 Chakdara</span>

                    <span className="text-gray-500">📍 Timergara</span>
                  </div>

                  <div className="mt-3 text-right">
                    <span className="text-xs font-semibold text-indigo-600">
                      ETA: {shipment.eta}
                    </span>
                  </div>
                </div>

                {/*ETA*/}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                    <p className="text-[10px] uppercase font-bold text-indigo-400">
                      Current Status
                    </p>

                    <p className="text-sm font-black text-indigo-900 mt-1">
                      {activeDelivery.status}
                    </p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                    <p className="text-[10px] uppercase font-bold text-emerald-500">
                      Estimated Delivery
                    </p>

                    <p className="text-sm font-black text-emerald-900 mt-1">
                      {shipment.eta}
                    </p>
                  </div>
                </div>
                {/* Assigned Rider Contact Box */}
                {/* Rider Information */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400">
                        Assigned Rider
                      </p>

                      <h3 className="text-base font-black text-gray-900">
                        Rider Information
                      </h3>
                    </div>

                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold">
                      ● ON THE WAY
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Profile Picture */}
                    <img
                      src="https://i.pravatar.cc/150?img=12"
                      alt="Hamza Malik"
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                    />

                    {/* Rider Details */}
                    <div className="flex-1">
                      <p className="text-sm font-black text-gray-900">
                        {shipment.rider}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        🛵 {shipment.riderUnit}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        📞 {shipment.phone}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        🚦 Current Status:{" "}
                        <span className="font-bold text-emerald-600">
                          On the way
                        </span>
                      </p>
                    </div>

                    {/* Call Button */}
                    <button
                      onClick={() =>
                        alert(`Calling courier partner at ${shipment.phone}...`)
                      }
                      className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                    >
                      📞 Call Rider
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Progress Stepper */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-6">
                  Checkpoint History
                </h3>

                <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gray-100 pl-2">
                  {trackingSteps.map((step, index) => {
                    const completed = index <= currentStepIndex;
                    const current = index === currentStepIndex;

                    return (
                      <div
                        key={step.status}
                        className="relative flex items-center gap-4"
                      >
                        {/* Circle */}
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs z-10 ${
                            completed
                              ? "bg-green-600 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {index + 1}
                        </div>

                        {/* Label */}
                        <div>
                          <p
                            className={`text-sm font-semibold ${
                              current
                                ? "text-green-600"
                                : completed
                                  ? "text-gray-700"
                                  : "text-gray-400"
                            }`}
                          >
                            {step.label}
                          </p>

                          {current && (
                            <p className="text-xs text-gray-500">
                              Current delivery status
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 text-xs">
                <p className="font-bold text-emerald-900 mb-1">
                  🛡️ Fully Insured Dispatch
                </p>
                <p className="text-emerald-700 text-[11px] leading-relaxed">
                  This parcel is backed by Zyroo's 100% custody guarantee from
                  Mardan sorting terminals to the final doorstep.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
