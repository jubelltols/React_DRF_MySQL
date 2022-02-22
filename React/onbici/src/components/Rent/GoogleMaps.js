import React, { useState } from "react"
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"

import StationsCard from './StationsCard'

const mapContainerStyle = {
  height: "90vh",
  width: "100vW",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  mapId: "61736a0744acbfe4",
};
const center = {
  lat: 38.816217131687004, 
  lng: -0.6080898148670366
};

export default function GoogleMaps({stations}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_APIKEY,
  });
  const [selected, setSelected] = useState(null)
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
  }, [])

  if (loadError) return "Error"
  if (!isLoaded) return "Loading..."

  return (
    <div>
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={14.8}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {stations.map((marker) => (
            marker.status === "active" 
            ? <Marker
              key={`${marker.latitude}-${marker.longitude}`}
              position={{ lat: Number(marker.latitude), lng: Number(marker.longitude) }}
              onClick={() => {setSelected(marker);}}
              icon={{
                url: `https://nationalsafetysigns.com.au/wp-content/uploads/2019/09/RD519-Bicycle-Parking-sign.png`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 50),
              }}
            />
            : ""
          ))}
          {selected ? (
            <InfoWindow 
              options={{backgoundColour:10}}
              position={{ lat: Number(selected.latitude), lng: Number(selected.longitude) }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <StationsCard
                station={selected}
              />
            </InfoWindow>
          ) : null}
        </GoogleMap>
    </div>
  );
}

