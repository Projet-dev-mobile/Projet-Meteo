import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import { Text, Icon, Button} from '@ui-kitten/components';
import { getPrevisionForSevenDaysCity } from '../api/openweathermap';

const MeteoInformations = ({ route }) => {

    const [city, setCity]=useState(null);
    const [postal, setPostal]=useState(null);
    const [country, setCountry]=useState(null);
    const [isError, setIsError] = useState(false);
    const [prevision, setPrevision] = useState(null);
    
    useEffect(() => {
        initilisationInformations();
      }, []); // Uniquement à l'initialisation
      
    const initilisationInformations = () => {
        setCity(route.params.city);
        setPostal(route.params.postal);
        setCountry(route.params.country);
        requestPrevision(city);
    };

    const requestPrevision = async (city) => {
      const res = await getPrevisionForSevenDaysCity(route.params.city);
      setPrevision(res);
    };

    return (
        <View style={styles.mainView}>
          <View style={styles.currentGlobalInfos}>            
              <Text style={styles.city}>{route.params.city}</Text>
              <Text style={styles.weatherTemperature}>Pluie, 13°C</Text>
                <View style={styles.degree}>
                  <Icon name='arrow-down' style={{ width: 20, height: 20 }} fill='#3366FF'/>
                  <Text style={styles.textCurrentWeatherInfos}>10°C</Text>
                  <Icon name='arrow-up' style={{ width: 20, height: 20 }} fill='#3366FF'/>
                  <Text style={styles.textCurrentWeatherInfos}>19°C</Text>
                </View>
                <View style={styles.utils}>
                  <Icon name='cloud' style={{ width: 20, height: 20 }} fill='#3366FF'/>
                  <Text style={styles.textCurrentWeatherInfos}>31%</Text>
                  <Icon name='wind' style={{ width: 20, height: 20 }} fill='#3366FF'/>
                  <Text>6km/h</Text>
                  <Icon name='umbrella' style={{ width: 20, height: 20 }} fill='#3366FF'/>
                  <Text>35%</Text>
                </View>
          </View>

          <View style={styles.middle1}>
            <Text style={styles.title}></Text>
          </View>

          <View style={styles.middle2}>
            <Text style={styles.title}>Evolution 24h</Text>
          </View>

          <View style={styles.bottomView}>
            <Text style={styles.title}>Prévisions 7 jours</Text>
          </View>
        </View>
    );
}

export default MeteoInformations;

const styles = StyleSheet.create({
  mainView: { flex: 4 },
  currentGlobalInfos :{
      flex : 1,
      marginLeft : '5%',
      marginTop : '5%',
      marginBottom : '5%',
      marginRight : '5%',
      borderWidth: 1,
  },
  middle1 :{
    flex : 1,
    marginLeft : '5%',
    marginTop : '5%',
    marginBottom : '5%',
    marginRight : '5%',
    borderWidth: 1,
  },
  middle2 :{
    flex : 1,
    marginLeft : '5%',
    marginTop : '5%',
    marginBottom : '5%',
    marginRight : '5%',
    borderWidth: 1,
  },
  bottomView :{
    flex : 1,
    marginLeft : '5%',
    marginTop : '5%',
    marginBottom : '5%',
    marginRight : '5%',
    borderWidth: 1,
  },

  city: {
    fontWeight: 'bold',
    fontSize: 25,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  weatherTemperature: {
    fontSize: 20,
    fontWeight : 'bold',
  },

  currentWeatherInfos : {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row'
  },
  textCurrentWeatherInfos : {
    fontSize: 15,
    fontWeight : 'bold',
  },
  degree: {
    flexDirection: 'row',
  },
  utils:
  {
    flexDirection: 'row'
  }
});