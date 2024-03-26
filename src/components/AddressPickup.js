import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '../constants/googleMapKey';

const AddressPickup = ({placeholderText, fetchAddress}) => {

  const onPressAddress = (data, details) => {
    console.log(data);
    console.log(details);
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    fetchAddress(lat,lng);
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placeholderText}
        styles={{
          textInput: styles.textInputStyle,
          textInputContainer: styles.inputContainerStyle,
        }}
        onPress={onPressAddress}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
      />
    </View>
  );
};

export default AddressPickup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
  },
  textInputStyle: {
    height: 48,
    color: '#000',
    fontSize: 16,
    backgroundColor: '#f3f3f3',
    margin: 20,
    borderRadius: 12,
  },
});
