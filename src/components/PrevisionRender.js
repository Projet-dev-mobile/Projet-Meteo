import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import { Icon } from '@ui-kitten/components';

const Prevision = ({ item }) =>
{
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        requestIcon(item.item.icon);
    }, []);

    const requestIcon = (id) => {
        const icon = 'https://openweathermap.org/img/wn/' + id + '@2x.png';
        setIcon(icon);
    };

  return (
  <View style={styles.mainView}>
    <View style={styles.firstView}>
        <Text>{item.item.day}</Text>
    </View>
    <View style={styles.secondView}>
        <Image style={styles.image} source={{uri: icon}} />
    </View>
    <View style={styles.thirdView}>
        <Icon name='umbrella' style={{ width: 20, height: 20 }} fill='#3366FF'/>
        <Text> {item.item.humidity}</Text>

        <Icon name='arrow-down' style={{ width: 20, height: 20 }} fill='#3366FF'/>
        <Text>{item.item.min}</Text>

        <Icon name='arrow-up' style={{ width: 20, height: 20 }} fill='#3366FF'/>
        <Text>{item.item.max}</Text>
    </View>
  </View> );
};

export default Prevision;

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        flexDirection: 'row'
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