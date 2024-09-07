"use client";
import React, { useEffect, useRef } from 'react';
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  useMarkerRef,
  AdvancedMarker,
  useAdvancedMarkerRef,
  Pin
} from '@vis.gl/react-google-maps';

import UserPosition from './userPosition';

const MyComponent = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    navigator.geolocation.getCurrentPosition((position) => {
      map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
      map.setZoom(18)
    });
    // here you can interact with the imperative maps API
  }, [map]);

  return <></>;
};

const App = () => {
  const [userPosRef, userPos] = useAdvancedMarkerRef()
  useEffect(() => {
    if (!userPos) return

    navigator.geolocation.getCurrentPosition((position) => {
      userPos.position = { lat: position.coords.latitude, lng: position.coords.longitude }
    });
  }, [userPos])

  return (
    <APIProvider apiKey={'AIzaSyCmUGZjf9yHKCet_XW7SC-68zaAJgNfgAQ'}>
      <Map
        style={{ width: '100vw', height: '100vh' }}
        defaultCenter={{ lat: 25.03746, lng: 121.564558 }}
        defaultZoom={12}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={'470bd1b0506e5f98'}
      >
      </Map>
      {/* <Marker ref={markerRef} position={{ lat: 53.54992, lng: 10.00678 }} /> */}

      {/* red default marker */}
      <AdvancedMarker position={{ lat: 25.02310855716257, lng: 121.53516859015363 }}>
        <h1>hello world</h1>
      </AdvancedMarker>

      <AdvancedMarker ref={userPosRef} position={{ lat: 25.02310855716257, lng: 121.53516859015363 }}>
        {/* <UserPosition /> */}
        <h1>。</h1>
      </AdvancedMarker>



      {/* customized green marker */}
      {/* <AdvancedMarker position={{ lat: 29.5, lng: -81.2 }}>
        <Pin
          background={'#0f9d58'}
          borderColor={'#006425'}
          glyphColor={'#60d98f'}
        />
      </AdvancedMarker> */}

      {/* fully customized marker */}
      {/* <AdvancedMarker position={{ lat: 29.5, lng: -81.2 }}> */}
      {/* <img src={'https://cdn.discordapp.com/attachments/1270644363461918763/1281816819564417075/image.png?ex=66dd1870&is=66dbc6f0&hm=a6723bbe582a0e8b09c08bf798a2551367d307e660b02dbdb5732d3386be06c6&'} width={32} height={32} /> */}
      {/* </AdvancedMarker> */}
      <MyComponent />
    </APIProvider>
  );
};

export default App;


// documents
// 建立 marker
// https://developers.google.com/maps/documentation/javascript/geolocation?hl=zh-tw
// https://medium.com/@paul87224/library-%E5%AE%A2%E8%A3%BD%E5%8C%96-google-%E5%9C%B0%E5%9C%96%E5%85%A7%E5%AE%B9%E5%85%83%E4%BB%B6-13b9127cf8ef

// advanced-marker
// https://visgl.github.io/react-google-maps/docs/api-reference/components/advanced-marker