import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import { Icon } from '@ui-kitten/components';
import SpecialText from '../form/SpecialText';

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
        <SpecialText style={styles.daytext} text={item.item.day}/>
    </View>
    <View style={styles.secondView}>
        <Image style={styles.image} source={{uri: icon}} />
    </View>
    <View style={styles.thirdView}>
        <View style={styles.infos}>
            <Icon name='umbrella' style={{ width: 25, height: 25 }} fill='#3366FF'/>
            <SpecialText style={styles.text} text={item.item.humidity + '%'}/>
        </View>
        <View style={styles.infos}>
            <Icon name='arrow-down' style={{ width: 25, height: 25 }} fill='#3366FF'/>
            <SpecialText style={styles.text} text={item.item.min + '°C'}/>
        </View>
        <View style={styles.infos}>
            <Icon name='arrow-up' style={{ width: 25, height: 25 }} fill='#3366FF'/>
            <SpecialText style={styles.text} text={item.item.max + '°C'}/>
        </View>
    </View>
  </View> );
};

export default Prevision;

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        flexDirection: 'row',
        height: 60,
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    firstView:{
        flex:3,
        justifyContent: 'center'
    },
    secondView:{
        flex: 2,
        justifyContent: 'center'
    },
    thirdView:{
        flex: 2,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    infos: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 3
    },
    image: {
        width: 45,
        height: 45,
    },
    daytext:{
        fontSize: 17
    },
    text:{
        fontSize: 12
    }
});