import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '../constants/googleMapKey';
import AddressPickup from '../components/AddressPickup';
import CustomBtn from '../components/CustomBtn';

const ChooseLocation = ({navigation}) => {
  const onDone = () => {
    navigation.goBack();
  };

  const fetchAddressCoords = ({lat, lng}) => {
    console.log('run===>', lat);
    console.log('run===>', lng);
  };

  const fetchDestinationCoords = ({lat, lng}) => {
    console.log('run===>', lng);
    console.log('run===>', lat);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: '#fff', flex: 1, padding: 24}}>
        <AddressPickup
          placeholderText={'Enter Pickup Location'}
          fetchAddress={fetchAddressCoords}
        />
        <AddressPickup
          placeholderText={'Enter Destination Location'}
          fetchAddress={fetchDestinationCoords}
        />
        <CustomBtn title={'Done'} onPress={onDone} btnStyle={{marginTop: 24}} />
      </ScrollView>
    </View>
  );
};

export default ChooseLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
