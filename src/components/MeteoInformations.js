import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, ScrollView, Image, Text, ListView } from 'react-native';
import { Icon, Button} from '@ui-kitten/components';
import { getPrevisionForSevenDaysCity } from '../api/openweathermap';
import { Line, parse } from 'react-native-svg';
import { LineChart, Grid } from 'react-native-svg-charts';
import { connect } from 'react-redux';
import DisplayError from '../components/DisplayError';
import PrevisionRender from '../components/PrevisionRender';
import PrevisionHourly from '../components/PrevisionHourly';

const MeteoInformations = ({ route ,favLocations, dispatch }) => {

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity]=useState(route.params.city);
  const [country, setCountry]=useState(route.params.country);
  const [prevision, setPrevision] = useState(null);
  const [precipitation, setPrecipitation] = useState(null);
  const [time, setTime] = useState(null);
  const [sevenDays, setSevenDays] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [cityName, setCityName] = useState(null);

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
      var cityName = prevision['current']['weather'][0]['description'];
      // var name = cityName[0];
      // cityName[0] = name.toUpperCase();
      setCityName(cityName);
      const precipitation = prevision['minutely'].map(obj => (obj.precipitation));
      setPrecipitation(precipitation);
      const time = prevision['minutely'].map(obj => ((new Date(obj.dt*1000).toLocaleTimeString().substring(0,5))));
      setTime(time);
      const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
      const sevenDays = prevision['daily'].map(obj =>({'day' : days[new Date(obj.dt*1000).getDay()], 'icon' : obj.weather[0].icon, 'humidity' : obj.humidity, 'min' : parseInt(obj.temp.min,10), 'max' : parseInt(obj.temp.max,10)}));
      setSevenDays(sevenDays);
      const hourly = prevision['hourly'].map(obj => ({'hour' : new Date(obj.dt*1000).toLocaleTimeString().substring(0,5), 'icon' : 'https://openweathermap.org/img/wn/' + obj.weather[0].icon + '@2x.png', 'temp' : parseInt(obj.temp, 10)}));
      setHourly(hourly);
      };

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
              <View style={styles.cityText}>            
                <Text style={styles.city}>{route.params.city}</Text>
              </View>
              <View style={styles.descriptionText}>  
                  <Text style={styles.weatherTemperature}>{prevision['current']['weather'][0]['description']}, {parseInt(prevision['current']['temp'])}°C</Text>
              </View>
              <View style={styles.degree}>
                <Icon name='arrow-down' style={{ width: 20, height: 20 }} fill='#3366FF'/>
                <Text style={styles.textCurrentWeatherInfos}>{parseInt(prevision['daily'][0]['temp']['min'])}</Text>
                <Icon name='arrow-up' style={{ width: 20, height: 20 }} fill='#3366FF'/>
                <Text style={styles.textCurrentWeatherInfos}>{parseInt(prevision['daily'][0]['temp']['max'])}</Text>
              </View>
              <View style={styles.utils}>
                <Icon name='cloud' style={{ width: 20, height: 20 }} fill='#3366FF'/>
                <Text style={styles.textCurrentWeatherInfos}>{prevision['current']['clouds']}%</Text>
                <Icon name='wind' style={{ width: 20, height: 20 }} fill='#3366FF'/>
                <Text>{parseInt(prevision['current']['wind_speed'])}km/h</Text>
                <Icon name='umbrella' style={{ width: 20, height: 20 }} fill='#3366FF'/>
                <Text>{prevision['current']['humidity']}%</Text>
              </View>
          </View>

          <View style={styles.middle1}>
            <View style={styles.middle1Text}>
              <Text style={styles.title}>Précipitations</Text>
            </View>
            <View style={styles.middle1Chart}>
              <LineChart
                  style={{ height: 100 }}
                  data={precipitation}
                  yMax={100}
                  yMin={0}
                  svg={{ strokeWidth:2, stroke: 'rgb(54, 218, 250)' }}
                  showGrid={false}
              >
              </LineChart>
            </View>
          </View>

          <View style={styles.middle2}>
            <View style={styles.middle2Text}>
              <Text style={styles.title}>Evolution 24h</Text>
            </View>
            <View style={styles.middle2List}>
              <FlatList
                horizontal={true}
                data={hourly}
                renderItem={ ( item ) => <PrevisionHourly item={item}/> }
                />
            </View>
          </View>

          <View style={styles.bottomView}>
            <View style={styles.bottomViewText}>
              <Text style={styles.title}>Prévisions 7 jours</Text>
            </View>
            <View style={styles.bottomViewList}>
              <FlatList
                data={sevenDays}
                renderItem={ ( item ) => <PrevisionRender item={item}/> }
                />
            </View>
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
  mainView: { flex: 4,         
  backgroundColor : 'rgb(220,220,220)',},
  container: {
    flex: 1,
  },
  currentGlobalInfos :{
      flex : 1,
      backgroundColor : 'rgb(190,190,190)',
  },
  cityText: {
    paddingTop: 15,
  },
  middle1 :{
    flex : 1,
    marginLeft : '5%',
    marginRight : '5%',
  },
  middle1Text :{
    paddingBottom: 8,
    paddingTop: 8
  },
  middle1Chart: {
    borderLeftWidth:1,
    borderBottomWidth: 1
  },
  middle2 :{
    flex : 1,
  },
  middle2Text:{
    flex: 1,
    marginLeft : '5%'
  },
  middle2List:{
    flex: 3,
    marginLeft : '8%',
    marginRight : '8%',
  },
  bottomView :{
    flex : 1,
    paddingTop: 10,
    marginLeft : '5%',
    marginRight : '5%',
    marginBottom: '8%'
  },
  bottomViewText:{
    paddingBottom: 8
  },
  bottomViewList: {

  },
  city: {
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 25,
    fontFamily: 'Comfortaa'
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  hourly:{
    flexDirection: 'row',
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
