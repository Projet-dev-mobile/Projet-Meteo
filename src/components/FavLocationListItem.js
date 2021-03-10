import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Button} from '@ui-kitten/components';
import { getGeocodingByCity, getGeocodingByCoords } from '../api/geocoding.js';
import { getPrevisionForSevenDaysCity } from '../api/openweathermap.js';
import favLocations from '../store/reducers/favLocations.js';
import PrevisionHourly from '../components/PrevisionHourly';
import SpecialText from '../form/SpecialText.js';

const FavLocationListItem = ({onClick, navigation, locationData }) => {

    const[lat, setLatitude]= useState(null);
    const[long, setLongitude]= useState(null);
    const[country, setCountry]= useState(null);
    const[hourly, setHourly] = useState(null);
    const[previsionData, setPrevisionData] = useState(null);
    const[description, setDescription] = useState(null);
    const[currentTemp, setCurrentTemp] = useState(null);
    const[tempMin, setTempMin] = useState(null);
    const[tempMax, setTempMax] = useState(null);

    useEffect(() => {
        // getLocationData();
        getCoords(locationData);
    }, []);

    useEffect(() => {
        if (long != null)
          getPrevision(lat, long);
      },[ long]);

    useEffect(() => {
        if (previsionData != null)
          parseData();
      },[previsionData]);
    
      const getCoords = async (locationData) => {
            try {
                //console.log(locationData);
                current = await getGeocodingByCity(locationData);
                const lat = current.results[0]['geometry']['location']['lat'];
                setLatitude(lat);
                const long = current.results[0]['geometry']['location']['lng'];
                setLongitude(long);
                console.log(locationData);
                // const hour = current['hourly'].map(obj => ({'hour' : new Date(obj.dt*1000).toLocaleTimeString().substring(0,5), 'icon' : 'https://openweathermap.org/img/wn/' + obj.weather[0].icon + '@2x.png', 'temp' : parseInt(obj.temp, 10)}));
                // setHourly(hour);
                // console.log(data);
            }
            catch
            {
                "erreur call api coords"
            }
        }
    
        const getPrevision = async (lat, long) => {
            try {
                const prevision_ = await getPrevisionForSevenDaysCity(lat,long);
                setPrevisionData(prevision_);
                //console.log(lat);
            }
            catch {
                "erreur call api"
            }
        }

        const parseData = () => {
            console.log(previsionData)
            const hourly_ = previsionData['hourly'].map(obj => ({'hour' : new Date(obj.dt*1000).toLocaleTimeString().substring(0,5), 'icon' : 'https://openweathermap.org/img/wn/' + obj.weather[0].icon + '@2x.png', 'temp' : parseInt(obj.temp, 10)}));
            setHourly(hourly_);
            const correctName = previsionData['current']['weather'][0]['description'].charAt(0).toUpperCase() + previsionData['current']['weather'][0]['description'].substring(1);
            setDescription(correctName);
            const temp = parseInt(previsionData['current']['temp'])+ '°C';  
            setCurrentTemp(temp);
            const tempMin_ = parseInt(previsionData['daily'][0]['temp']['min']) + '°C';
            setTempMin(tempMin_);
            const tempMax_ = parseInt(previsionData['daily'][0]['temp']['max']) + '°C';
            setTempMax(tempMax_);
            //console.log(correctName);
        }

    const getLocationData = async () => {
        // console.log(locationData);
        try {
            // var list= [];
            //  favLocations.forEach((element, index) => {
            //     const currentPrevision = await getGeocodingByCity(element);
            //     list[index] =currentPrevision;
            // });
            // const geocodingSearchResult = await getGeocodingByCity(locationData);
            // const lat = geocodingSearchResult.results[0]['geometry']['location']['lat'];
            // setLatitude(lat);
            // const long = geocodingSearchResult.results[0]['geometry']['location']['lng'];
            // setLongitude(long);
            // const country = geocodingSearchResult.results[0]['address_components'][3]['long_name'];
            // setCountry(country);
            // const data = await getGeocodingByCoords(lat,long);
            // setPrevisionData(data);
            
        }catch{
            console.log('erreur call api');
        }
        // navigateToMeteoInformations(locationData, country, lat, long);
    }

    const navigateToMeteoInformations = (city, country, lat, long) =>{
        navigation.navigate("ViewMeteoInformations", { city, country, lat, long});
    }
    

    return(
        <TouchableOpacity style={styles.container}
        onPress={() => { onClick(locationData) }}>
            <View style={styles.location}>
                <View style={styles.viewName}>
                    <SpecialText text={locationData} style={styles.locationName}/>
                    <SpecialText text={description + ', ' + currentTemp } style={styles.description}/>
                </View>
                <View style={styles.degree}>
                    <View style={styles.degreMin}>
                      <Icon name='arrow-down' style={styles.icon} fill='#3366FF'/>
                      <SpecialText style={styles.textCurrentWeatherInfos} text={tempMin}/>
                    </View>
                    <View style={styles.degreMax}>
                      <Icon name='arrow-up' style={styles.icon} fill='#3366FF'/>
                      <SpecialText style={styles.textCurrentWeatherInfos} text={tempMax}/>          
                    </View>
                  </View>
                <View style={styles.viewPrevision}>
                    <FlatList
                        horizontal={true}
                        data={hourly}
                        renderItem={ ( item ) => <PrevisionHourly item={item}/> }
                        style={styles.list}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );

}

export default FavLocationListItem;

const styles = StyleSheet.create({
    container: {
      paddingVertical: 8,

    },
    location: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'rgb(210,210,210)',
    },
    locationName:{
        fontSize: 25,
         paddingTop: 15,
         paddingLeft: 15
    },
    list:{
        height: 150,
    },
    viewName:{
        flex:1,
        paddingBottom: 15
    },
    viewPrevision: {
        flex:2
    },
    description:{
        fontSize: 20,
        paddingLeft: 15
    },
    degree: {
        flexDirection: 'row',
      },
      degreMin: {
        flexDirection: 'row',
        paddingRight: 10
      },
      degreMax: {
        flexDirection: 'row',
      },
      icon:{

      },
      textCurrentWeatherInfos:{}
});