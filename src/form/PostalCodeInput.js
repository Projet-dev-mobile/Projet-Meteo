import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const PostalCodeInput = () => {
  const [postalCodeValue, onChangeText] = React.useState('Code Postal');

  return (
    <TextInput
      style={styles.pc}
      onChangeText={text => onChangeText(text)}
      value={postalCodeValue}
    />
  );
}

export default PostalCodeInput;

const styles = StyleSheet.create({
    pc: {
         height: 40, 
         borderColor: 'gray', 
         borderBottomWidth: 1,
    },
  });