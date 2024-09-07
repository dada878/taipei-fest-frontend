"use client";
import React, { useEffect } from 'react';
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  useMarkerRef
} from '@vis.gl/react-google-maps';

const MyComponent = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    navigator.geolocation.getCurrentPosition((position) => {
      map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
    // here you can interact with the imperative maps API
  }, [map]);

  return <></>;
};

const App = () => {
  const [markerRef, marker] = useMarkerRef();

  useEffect(() => {
    if (!marker) {
      return;
    }

    // do something with marker instance here
  }, [marker]);

  return (
    <APIProvider apiKey={'AIzaSyCmUGZjf9yHKCet_XW7SC-68zaAJgNfgAQ'}>
      <Map
        style={{ width: '100vw', height: '100vh' }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={18}
        gestureHandling={'greedy'}
        disableDefaultUI={true}>
      </Map>
      <Marker ref={markerRef} position={{ lat: 53.54992, lng: 10.00678 }} />
      <MyComponent />
    </APIProvider>
  );
};

export default App;