import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import { Text, Icon, Button} from '@ui-kitten/components';
import { getPrevisionForSevenDaysCity } from '../api/openweathermap';
import { Line, parse } from 'react-native-svg';
import { LineChart, Grid } from 'react-native-svg-charts';
import { connect } from 'react-redux';
import DisplayError from '../components/DisplayError';

const MeteoInformations = ({ route ,favLocations, dispatch }) => {

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity]=useState(route.params.city);
  const [country, setCountry]=useState(route.params.country);
  const [prevision, setPrevision] = useState(null);
  const [precipitation, setPrecipitation] = useState(null);
  const [time, setTime] = useState(null);

    useEffect(() => {
      setCity(route.params.city);
      setCountry(route.params.country);
      setIsLoading(true);
      requestMeteo(route.params.latitude, route.params.longitude);
    }, []); // Uniquement à l'initialisation
    
    useEffect(() => {
      if (prevision != null)
        parsePrecipitation();
    },[prevision]);
    const requestMeteo = async(latitude, longitude) => {
      try {
        const meteoSearchResult = await getPrevisionForSevenDaysCity(latitude, longitude);
        setPrevision(meteoSearchResult);
        console.log(prevision);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };

    // On pourrait définir les actions dans un fichier à part
    const saveLocation = async () => {
      const action = { type: 'SAVE_LOCATION', value : city };
      dispatch(action);
    }

    const unsaveLocation = async () => {
      const action = { type: 'UNSAVE_LOCATION', value: city };
      dispatch(action);
    }

    const displaySaveLocation = () => {
      if (favLocations.findIndex(i => i === city) !== -1) {
        // Le restaurant est sauvegardé
        return (
          <Button
            title='Retirer des favoris'
            color={Colors.mainGreen}
            onPress={unsaveLocation}
          />
        );
      }
      // Le restaurant n'est pas sauvegardé
      return (
        <Button
          title='Ajouter aux favoris'
          color={Colors.mainGreen}
          onPress={saveLocation}
        />
      );
    }
    
    const parsePrecipitation = () => {
      
      // console.log(prevision);
      // console.log(data);
       const precipitation = prevision['minutely'].map(obj => (obj.precipitation));
       setPrecipitation(precipitation);
       console.log(precipitation);
       const time = prevision['minutely'].map(obj => (obj.dt));
       setTime(time);
       console.log(time);
    }

    return (
      <View style={styles.container}>
      {isError ?
        (<DisplayError message='Impossible de récupérer les données du restaurants' />) :
        (isLoading ?
          (<View style={styles.containerLoading}>
            <ActivityIndicator size="large" color="black"/>
          </View>) :
          (
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
                data={precipitation}
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
          )
        )}
    </View>
    );
}

const mapStateToProps = (state) => {
  return {
    favLocations: state.favLocationsCIty
  }
}

export default connect(mapStateToProps)(MeteoInformations);

const styles = StyleSheet.create({
  mainView: { flex: 4 },
  container: {
    flex: 1,
  },
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
    paddingLeft: 10,
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
  },

  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerScroll: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});