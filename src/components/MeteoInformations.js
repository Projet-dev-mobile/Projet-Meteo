import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import { Text, Icon, Button} from '@ui-kitten/components';
import { getPrevisionForSevenDaysCity } from '../api/openweathermap';
import { Line } from 'react-native-svg';
import { LineChart, Grid } from 'react-native-svg-charts'

const MeteoInformations = ({ route }) => {

    const [city, setCity]=useState(route.params.city);
    const [postal, setPostal]=useState(route.params.postal);
    const [country, setCountry]=useState(route.params.country);
    const [isError, setIsError] = useState(false);
    const [prevision, setPrevision] = useState(route.params.weather);
    
    useEffect(() => {
        initilisationInformations();
      }, []); // Uniquement à l'initialisation
      
    const initilisationInformations = () => {
        setCity(route.params.city);
        setPostal(route.params.postal);
        setCountry(route.params.country);
        setPrevision(route.params.weather);
    };

    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ];

    return (
        <View style={styles.mainView}>
          <View style={styles.currentGlobalInfos}>            
              <Text style={styles.city}>{route.params.city}</Text>
              <Text style={styles.weatherTemperature}>{prevision['current']['weather'][0]['description']}, {prevision['current']['temp']}°C</Text>
                <View style={styles.degree}>
                  <Icon name='arrow-down' style={{ width: 20, height: 20 }} fill='#3366FF'/>
                  <Text style={styles.textCurrentWeatherInfos}>{prevision['daily'][0]['temp']['min']}</Text>
                  <Icon name='arrow-up' style={{ width: 20, height: 20 }} fill='#3366FF'/>
                  <Text style={styles.textCurrentWeatherInfos}>{prevision['daily'][0]['temp']['max']}</Text>
                </View>
                <View style={styles.utils}>
                  <Icon name='cloud' style={{ width: 20, height: 20 }} fill='#3366FF'/>
                  <Text style={styles.textCurrentWeatherInfos}>{prevision['current']['clouds']}%</Text>
                  <Icon name='wind' style={{ width: 20, height: 20 }} fill='#3366FF'/>
                  <Text>{prevision['current']['wind_speed']}km/h</Text>
                  <Icon name='umbrella' style={{ width: 20, height: 20 }} fill='#3366FF'/>
                  <Text>{prevision['current']['humidity']}%</Text>
                </View>
          </View>

          <View style={styles.middle1}>
            <Text style={styles.title}>Précipitations</Text>
            <LineChart
                style={{ height: 120 }}
                data={data}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid />
            </LineChart>
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