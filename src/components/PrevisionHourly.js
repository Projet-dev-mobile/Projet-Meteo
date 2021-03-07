import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import { Icon } from '@ui-kitten/components';

const PrevisionHourly = ({ item }) =>
{
  return (
  <View style={styles.mainView}>
        <Text>{item.item.hour}</Text>
        <Image style={styles.image} source={{uri: item.item.icon}} />
        <Text>{item.item.temp}°C</Text>
  </View> );
};

export default PrevisionHourly;

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
    },
    firstView:{
        flex:1
    },
    secondView:{
        flex:1
    },
    thirdView:{
        flex: 2,
        flexDirection: 'row'
    },
    image: {
        width: 30,
        height: 30,
    }
});