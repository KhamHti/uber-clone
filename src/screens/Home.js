import React, {useState, useEffect, useRef, Component} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import {GOOGLE_MAPS_APIKEY} from '../constants/googleMapKey';
import imagePath from '../constants/imagePath';

// for web map api ==> fake key

const Home = ({navigation}) => {
  Geolocation.getCurrentPosition(info => {
    console.log(info.coords.latitude);
  });
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

  const mapRef = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          style={StyleSheet.absoluteFill}
          initialRegion={dropCoords}
          ref={mapRef}>
          <Marker coordinate={pickupCoords} image={imagePath.isCurLoc} />
          <Marker coordinate={driverLoc} />
          <Marker
            coordinate={dropCoords}
            pinColor="purple"
            image={imagePath.isGreenMarker}
          />
          {/* <Marker coordinate={dropCoords} pinColor="purple" /> */}
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
      <View style={styles.bottomCard}>
        <Text>Where are you going...?</Text>
        <TouchableOpacity
          style={styles.inputStyle}
          onPress={() => {
            navigation.navigate('ChooseLocation');
          }}>
          <Text>Choose Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  bottomCard: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  inputStyle: {
    backgroundColor: '#fff',
    height: 48,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});
