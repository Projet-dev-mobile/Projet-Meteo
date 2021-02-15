import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import { getCurrentWeahterByCity } from '../api/openweathermap';

const MeteoInformations = ({ route }) => {

    const [city, setCity]=useState(null);
    const [postal, setPostal]=useState(null);
    const [country, setCountry]=useState(null);
    const [isError, setIsError] = useState(false);
    const [currentWeather, setCurrentWeather]= useState(null);

    
    useEffect(() => {
        initilisationInformations();
      }, []); // Uniquement à l'initialisation
      

    const initilisationInformations = () => {
        setCity(route.params.city);
        setPostal(route.params.postal);
        setCountry(route.params.country);

        //Recuperation de la meteo actuelle pour la ville passée en paramètre
        getCurrentWeather(city);
    }

    const getCurrentWeather = async (city) => {
        setIsError(false);
        try {
          const meteoSearchResult = await getCurrentWeahterByCity(city);
          setCurrentWeather(meteoSearchResult);
          console.log(currentWeather);
        } catch (error) {
          setIsError(true);
        }
    };

    return (
        console.log(route.params.city),
        <View>
            <Text>{route.params.city}</Text>
            <Text>{route.params.postal}</Text>
            <Text>{route.params.country}</Text>
            
        </View>
    );
}

export default MeteoInformations;