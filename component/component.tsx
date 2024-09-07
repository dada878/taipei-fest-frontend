"use client";
import React from 'react';

import {APIProvider, Map} from '@vis.gl/react-google-maps';
// import ControlPanel from './control-panel';

const API_KEY ='AIzaSyCmUGZjf9yHKCet_XW7SC-68zaAJgNfgAQ'

const App = () => {return <>
  <APIProvider apiKey={API_KEY}>
    <Map
      defaultZoom={3}
      defaultCenter={{lat: 22.54992, lng: 0}}
      gestureHandling={'greedy'}
      />
  </APIProvider>
      </>}
export default App;

