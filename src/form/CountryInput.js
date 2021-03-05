import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const CountryTextInput = () => {
  const [countryValue, onChangeText] = React.useState('Pays');

  return (
    <TextInput
      style={styles.country}
      onChangeText={text => onChangeText(text)}
      value={countryValue}
    />
  );
}

export default CountryTextInput;

const styles = StyleSheet.create({
    country: {
         height: 40, 
         borderColor: 'gray', 
         borderBottomWidth: 1,
    },
  });