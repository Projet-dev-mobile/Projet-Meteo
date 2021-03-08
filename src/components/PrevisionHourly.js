import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import { Icon } from '@ui-kitten/components';

const PrevisionHourly = ({ item }) =>
{
  return (
  <View style={styles.mainView}>
        
            <View style={styles.firstView}>
                <Text>{item.item.hour}</Text>
            </View>
            <View style={styles.secondView}>
                <Image style={styles.image} source={{uri: item.item.icon}} />
            </View>
            <View style={styles.thirdView}>
                <Text>{item.item.temp}°C</Text>
            </View>
        
  </View> );
};

export default PrevisionHourly;

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        paddingLeft: 15,
    },
    firstView:{
        flex: 1,
        alignItems: 'center',
    },
    secondView:{
        flex: 1,
        alignItems: 'center'
    },
    thirdView: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
        width: 30,
        height: 30,
    }
});