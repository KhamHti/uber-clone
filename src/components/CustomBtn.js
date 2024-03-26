import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CustomBtn = ({onPress, title, btnStyle}) => {
  return (
    <TouchableOpacity
      style={{...styles.btnStyle, ...btnStyle}}
      onPress={onPress}>
      <Text style={{color: '#030303'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  btnStyle: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 12
  },
});
