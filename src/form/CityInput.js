import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const CityTextInput = () => {
  const [cityValue, onChangeText] = React.useState('Ville');

  return (
    <TextInput
      style={styles.city}
      onChangeText={text => onChangeText(text)}
      value={cityValue}
    />
  );
}

export default CityTextInput;

const styles = StyleSheet.create({
    city: {
         borderColor: 'gray', 
         borderBottomWidth: 1,

    },
  });