import React, {useState, useEffect, useRef, Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBNrY8JJTJ4DN3nRhxWYabLNwrrkxnbABU';

// for web map api ==> fake key

const App = () => {
  const [initialRegion, setInitialRegion] = useState({});
  const [state, setState] = useState({
    pickupCoords: {
      latitude: 16.793074,
      longitude: 96.140377,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    dropCoords: {
      latitude: 16.779151,
      longitude: 96.14506,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });
  const {pickupCoords, dropCoords} = state;

  const driverLoc = {
    latitude: 16.788473,
    longitude: 96.141879,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Geolocation.getCurrentPosition(
  //   position => {
  //     const {
  //       latitude,
  //       longitude,
  //       altitude,
  //       accuracy,
  //       altitudeAccuracy,
  //       heading,
  //       speed,
  //     } = position.coords;
  //     const timestamp = position.timestamp;
  //     // Handle the successful retrieval of the current position
  //     console.log('Current Position:', {
  //       latitude,
  //       longitude,
  //       altitude,
  //       accuracy,
  //       altitudeAccuracy,
  //       heading,
  //       speed,
  //       timestamp,
  //     });
  //   },
  //   error => {
  //     // Handle errors
  //     console.error('Error:', error);
  //     if (error.code === error.PERMISSION_DENIED) {
  //       console.log('Location permission denied.');
  //     } else if (error.code === error.POSITION_UNAVAILABLE) {
  //       console.log('Location information is unavailable.');
  //     } else if (error.code === error.TIMEOUT) {
  //       console.log('Request timed out.');
  //     } else {
  //       console.log('An unknown error occurred.');
  //     }
  //   },
  //   {
  //     timeout: 20000, // Optional: specify a custom timeout in milliseconds
  //     maximumAge: 1000, // Optional: specify the maximum age of a cached position in milliseconds
  //     enableHighAccuracy: true, // Optional: specify whether high accuracy mode should be used
  //   },
  // );

  // useEffect(() => {
  //   //get permission
  //   Geolocation.requestAuthorization();

  //   // Get the device's current location
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude, latitudeDelta, longitudeDelta} =
  //         position.coords;
  //       console.log('coords=>', position.coords);
  //       // console.log('long=>', position.coords.latitude);
  //       setInitialRegion({
  //         latitude,
  //         longitude,
  //         // latitudeDelta,
  //         // longitudeDelta,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       });
  //     },
  //     error => console.error(error),
  //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  //   );
  // }, []);

  const mapRef = useRef();

  return (
    <View style={styles.container}>
      {/* <MapView style={styles.map} initialRegion={initialRegion}>
        <Marker
          pinColor="red"
          style={{width: 50, height: 50, margin: 20}}
          coordinate={{
            latitude: 37.785834,
            longitude: -122.406417,
          }}
        />
      </MapView> */}
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={dropCoords}
        ref={mapRef}>
        <Marker coordinate={pickupCoords} pinColor="green" />
        <Marker coordinate={driverLoc} pinColor="red" />
        <Marker coordinate={dropCoords} pinColor="purple" />
        <MapViewDirections
          origin={pickupCoords}
          destination={dropCoords}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="red"
          optimizeWaypoints={true}
          onReady={result => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 30,
                bottom: 300,
                left: 30,
                top: 100,
              },
            });
          }}
        />
      </MapView>
    </View>
  );
};
//16.80606° N, 96.12938° E
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
