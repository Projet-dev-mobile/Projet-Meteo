import { Assets } from '@react-navigation/stack';
import React ,{ Component, useState } from 'react';
import {Alert, View, TextInput, Button, StyleSheet, Text, FlatList, Keyboard } from 'react-native';
import { getGeocodingByCoords } from '../api/geocoding';
import { getCurrentWeahterByCity } from '../api/openweathermap';


const Search = ({navigation}) => {
   
    const [location, setLocation] = useState(null);
    const [city, setCity]=useState(null);
    const [postal, setPostal]=useState(null);
    const [country, setCountry ]=useState(null);
    const [currentWeather, setCurrentWeather]= useState(null);
    const [isError, setIsError] = useState(false);

    const requestGeocoding = async (latitude,longitude) => {
        setIsError(false);
        try {
            const geocondingSearchResult = await getGeocodingByCoords(latitude,longitude);
            navigateToMeteoInformations(geocondingSearchResult.results[1]);
        
        } catch (error) {
            setIsError(true);
        }
    };


    const navigateToMeteoInformations = (locationInformations) => {

        setCity(locationInformations["address_components"][2]["long_name"]);
        
        setPostal(locationInformations["address_components"][6]["long_name"]);
        
        setCountry(locationInformations["address_components"][5]["long_name"]);

        getCurrentWeather(city);
        //navigation.navigate("ViewMeteoInformations", { city,postal,country });
    };


    const getCurrentWeather = async (city) => {
        setIsError(false);
        if(currentWeather==null || currentWeather["cod"]=="404"){
            while(currentWeather==null || currentWeather["cod"]=="404"){
                try {
                    const meteoSearchResult = await getCurrentWeahterByCity(city);
                    setCurrentWeather(meteoSearchResult);
                } catch (error) {
                    setIsError(true);
                }
            }
        }
        navigation.navigate("ViewMeteoInformations", { city,postal,country,currentWeather });
    };

    const findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {

                const location =position.coords;

				requestGeocoding(position.coords.latitude, position.coords.longitude);
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};

    return (
        <View style={styles.mainView}>
            <View style={styles.topView}>
                <TextInput
                    placeholder='Partie de vinz'
                />
            </View>
        
            <View style={styles.topView}>
                <TextInput
                    placeholder='Partie de clecle'
                />
                <Button
                    title='Me localiser'
                    onPress={findCoordinates}
                />
                
            </View>
        </View>
        
    );
};

export default Search;

const styles = StyleSheet.create({
    mainView: { flex: 1 },
    topView :{
        flex : 1,
       
    },
    bottomView :{
        flex : 1,
        
    }
});