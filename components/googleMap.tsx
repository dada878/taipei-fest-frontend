"use client";
import DetailCard from "@/components/detail-card";
import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

import UserPosition from "./userPosition";
import Mark from "./mark";
import { useQuery } from "@tanstack/react-query";

const MyComponent = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (!navigator || !navigator.geolocation) {
      alert("Geolocation is not supported");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        map.setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        map.setZoom(18);
      });
    }
    // here you can interact with the imperative maps API
  }, [map]);

  return <></>;
};

export interface Comment {
  warpEventId: string;
  _id: string;
  userId: string;
  text: string;
  time: number;
  __v: number;
}

export interface Marker {
  lng: number;
  lat: number;
  title: string;
  time: number;
  description?: string;
  image: string;
  __v: number;
  _id: string;
  comments: Comment[];
  upvotes: number;
  downvotes: number;
  sharedCount: number;
}

const App = () => {
  const [userPosRef, userPos] = useAdvancedMarkerRef();
  useEffect(() => {
    if (!userPos) return;

    if (!navigator || !navigator.geolocation) {
      alert("Geolocation is not supported");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        userPos.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
  }, [userPos]);

  // const [markers, setMarkers] = useState<Marker[]>([]);
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(0);

  const {
    data: markers,
    isPending,
    isError,
    error,
  } = useQuery<Marker[]>({
    queryKey: ["markers"],
    queryFn: async () => {
      const result = await fetch(
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
      );
      return result.json();
    },
  });

  if (isError) return <div>Error: {error?.message}</div>;

  if (!navigator || !navigator.geolocation) {
    alert("Geolocation is not supported");
  }

  return (
    <>
      {markers && markers.length > 0 && (
        <DetailCard
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          marker={markers[selectedMarkerIndex]}
        />
      )}
      <p>
        {
          (navigator && navigator.geolocation) ? `Geolocation is supported ${navigator.toString()}` : "Geolocation is not supported!"
        }
      </p>
      <APIProvider apiKey={"AIzaSyBjFJKlcm_hwYdRGWMC7ih9DMYHZYO8hhI"}>
        <Map
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={{ lat: 25.03746, lng: 121.564558 }}
          defaultZoom={12}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={"470bd1b0506e5f98"}
        ></Map>
        {markers?.map((marker, index) => {
          return (
            <AdvancedMarker
              onClick={() => {
                setIsOpen(true);
                setSelectedMarkerIndex(index);
              }}
              key={index}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            >
              <Mark
                src={marker.image ?? "https://unsplash.it/640/425?random"}
              />
            </AdvancedMarker>
          );
        })}
        <AdvancedMarker ref={userPosRef}>
          <UserPosition />
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
