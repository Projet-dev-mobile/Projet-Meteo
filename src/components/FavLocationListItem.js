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

    useEffect(() => {
        // getLocationData();
        getCoords();
    }, []);

    useEffect(() => {
        if ((lat != null)&& (long != null))
          getPrevision();
      },[lat, long]);

    useEffect(() => {
        if (previsionData != null)
          parseData();
      },[previsionData]);
    
      const getCoords = async () => {
            try {
                current = await getGeocodingByCity(locationData);
                const lat = current.results[0]['geometry']['location']['lat'];
                setLatitude(lat);
                const long = current.results[0]['geometry']['location']['lng'];
                setLongitude(long);
                // const hour = current['hourly'].map(obj => ({'hour' : new Date(obj.dt*1000).toLocaleTimeString().substring(0,5), 'icon' : 'https://openweathermap.org/img/wn/' + obj.weather[0].icon + '@2x.png', 'temp' : parseInt(obj.temp, 10)}));
                // setHourly(hour);
                // console.log(data);
            }
            catch
            {}
        }
    
        const getPrevision = async () => {
            try {
                const prevision_ = await getPrevisionForSevenDaysCity(lat,long);
                setPrevisionData(prevision_);
                console.log(lat);
            }
            catch {

            }
        }

        const parseData = () => {
            const hourly_ = previsionData['hourly'].map(obj => ({'hour' : new Date(obj.dt*1000).toLocaleTimeString().substring(0,5), 'icon' : 'https://openweathermap.org/img/wn/' + obj.weather[0].icon + '@2x.png', 'temp' : parseInt(obj.temp, 10)}));
            setHourly(hourly_);
            console.log(hourly_);
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
         paddingLeft: 10
    },
    list:{
        height: 150,
    },
    viewName:{
        flex:1
    },
    viewPrevision: {
        flex:2
    }
});