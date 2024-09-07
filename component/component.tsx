"use client";
import React from 'react';
import {createRoot} from 'react-dom/client';
import {APIProvider, Map} from '@vis.gl/react-google-maps';

function App() {
  const position = {lat: 53.54992, lng: 10.00678};

  return (
    // <APIProvider apiKey={'AIzaSyCmUGZjf9yHKCet_XW7SC-68zaAJgNfgAQ'}>
    //   {/* <Map defaultCenter={position} defaultZoom={10} mapId='470bd1b0506e5f98'> */}
    //   <Map defaultCenter={position} defaultZoom={10} mapId='470bd1b0506e5f98'>
    //     <AdvancedMarker position={position} /> 
    //  </Map>
    // </APIProvider>
    <APIProvider apiKey={'AIzaSyCmUGZjf9yHKCet_XW7SC-68zaAJgNfgAQ'}>
    <Map
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat: 22.54992, lng: 0}}
      defaultZoom={3}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  </APIProvider>
  );
}

export default App;