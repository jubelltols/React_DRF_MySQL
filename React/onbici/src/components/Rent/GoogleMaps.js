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

export default function GoogleMaps({stations, onlyMap}) {
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
            <Marker
              key={`${marker.latitude}-${marker.longitude}`}
              position={{ lat: Number(marker.latitude), lng: Number(marker.longitude) }}
              onClick={() => {setSelected(marker);}}
              icon={{
                path: "M406.6,62.4c-83.2-83.2-217.6-83.2-299.733,0c-83.2,83.2-83.2,216.533,0,299.733l149.333,150.4 L405.533,363.2C488.733,280,488.733,145.6,406.6,62.4z M256.2,360C175.133,360,109,293.867,109,212.8S175.133,65.6,256.2,65.6s147.2,66.133,147.2,147.2 S337.266,360,256.2,360z M325.533,140.267c-12.8-10.667-32-16-59.733-16h-62.933v177.067h39.467v-49.067h24.533 c26.667,0,45.867-5.333,58.667-14.933c12.8-10.667,19.2-26.667,19.2-48C344.733,166.933,338.333,150.933,325.533,140.267z M296.733,209.6c-4.267,5.333-13.867,7.467-26.667,7.467H243.4v-59.733h22.4c12.8,0,22.4,2.133,28.8,6.4	c6.4,4.267,9.6,11.733,9.6,21.333C304.2,196.8,301,204.267,296.733,209.6z",
                fillColor: '#3f51b5',
                fillOpacity: 100,
                anchor: new window.google.maps.Point(0,0),
                strokeWeight: 0,
                scale: 0.07
              }}
            />
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
                station={selected} onlyMap={onlyMap}
              />
            </InfoWindow>
          ) : null}
        </GoogleMap>
    </div>
  );
}

