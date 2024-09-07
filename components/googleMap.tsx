"use client";
import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  AdvancedMarker,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

import UserPosition from './userPosition';
import Mark from './mark';

const MyComponent = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    navigator.geolocation.getCurrentPosition((position) => {
      map.setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      map.setZoom(18);
    });
    // here you can interact with the imperative maps API
  }, [map]);

  return <></>;
};

interface Marker {
  lng: number;
  lat: number;
  title: string;
  time: number;
  description?: string;
  image?: string;
  __v: number;
  _id: string;
}

const App = () => {
  const [userPosRef, userPos] = useAdvancedMarkerRef();
  useEffect(() => {
    if (!userPos) return;

    navigator.geolocation.getCurrentPosition((position) => {
      userPos.position = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }, [userPos]);

  const [markers, setMarkers] = useState<Marker[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let canceled = false;
    fetch(
      "https://taipei.codingbear.mcloudtw.com/api/warp_event/getByCategory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: "#global",
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (canceled) return;
        setMarkers(
          data.map((marker: Marker) => {
            return {
              lng: marker.lng,
              lat: marker.lat,
              title: marker.title,
            };
          })
        );
      });
    return () => {
      canceled = true;
    };
  }, []);

  console.log("map rerenders");

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        click me!
        {count}
      </button>
      <APIProvider apiKey={"AIzaSyCmUGZjf9yHKCet_XW7SC-68zaAJgNfgAQ"}>
        <Map
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={{ lat: 25.03746, lng: 121.564558 }}
          defaultZoom={12}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={"470bd1b0506e5f98"}
        ></Map>

        {/* red default marker */}
        {markers.map((marker, index) => {
          console.log("marker", marker);
          return (
            <AdvancedMarker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
            >
              {/* <h1 className='text-5xl'>{marker.title}</h1> */}
              <p className="text-5xl">{JSON.stringify(markers)}</p>
              <div className="size-5 bg-red-700"></div>
            </AdvancedMarker>
          );
        })}

        {markers.map((marker, index) => {
          return (
            <AdvancedMarker
              key={index}
              position={{
                lat: marker.lng,
                lng: marker.lat
              }}
            >
              <h1 className="text-5xl">{marker.title}</h1>
            </AdvancedMarker>
          );
        })}

        <AdvancedMarker
          ref={userPosRef}
          position={{ lat: 25.02310855716257, lng: 121.53516859015363 }}
        >
          <h1>。</h1>
        </AdvancedMarker>
        <MyComponent />
      </APIProvider>
    </>
  );
};

export default App;

// documents
// 建立 marker
// https://developers.google.com/maps/documentation/javascript/geolocation?hl=zh-tw
// https://medium.com/@paul87224/library-%E5%AE%A2%E8%A3%BD%E5%8C%96-google-%E5%9C%B0%E5%9C%96%E5%85%A7%E5%AE%B9%E5%85%83%E4%BB%B6-13b9127cf8ef

// advanced-marker
// https://visgl.github.io/react-google-maps/docs/api-reference/components/advanced-marker
