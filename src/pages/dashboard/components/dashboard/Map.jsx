/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import L from "leaflet";
import mapIcon from "../../../../assets/images/mapicon.svg";

// Define the custom icon
const customIcon = new L.Icon({
  iconUrl: mapIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// A component to adjust the map's bounds based on the markers' positions
const SetMapBounds = ({ buildings }) => {
  const map = useMap();

  if (buildings?.length > 0) {
    const bounds = L.latLngBounds(
      buildings.map((building) => [building?.latitude, building?.longitude])
    );
    map.fitBounds(bounds);
  }

  return null;
};

const Map = () => {
  // Fetch buildings without pagination

  return (
    <MapContainer
      center={[3, 15]} // Initial center, will be overridden by SetMapBounds
      zoom={9}
      style={{ height: "430px", width: "100%", borderRadius: "15px" }}
      attributionControl={false}
      className="grayscale-map"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* {data?.buildings?.length > 0 && (
        <SetMapBounds buildings={data.buildings} />
      )} */}

      {/* {data?.buildings?.map((building) => (
          <Marker
            key={building._id}
            position={[building?.latitude||34.345234, building?.longitude||24.453456]}
            icon={customIcon}
          >
            <Popup>
              <div className="w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-md p-6 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-[#A449EB] dark:text-white mb-4">
                  Building Info
                </h2>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span className="font-bold">Name:</span>
                    <span className="text-[#A449EB] font-[600]">{building.buildingname}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span className="font-bold">Address:</span>
                    <span className="text-[#A449EB] font-[600]">{building.buildingLocation}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span className="font-bold">Floors:</span>
                    <span className="text-[#A449EB] font-[600]">{building.totalFloors}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span className="font-bold">Restrooms:</span>
                    <span className="text-[#A449EB] font-[600]">{building.totalRestrooms}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span className="font-bold">Type:</span>
                    <span className="text-[#A449EB] font-[600]">{building.buildingType}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span className="font-bold">Contact Info:</span>
                    <span className="text-[#A449EB] font-[600]">{building.contactNumber}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Link
                    to={`/home/buildings/${building._id}`}
                    className="bg-[#A449EB] text-white rounded-md"
                    style={{ padding: "15px 90px", color: "white" }}
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))} */}
    </MapContainer>
  );
};

export default Map;
