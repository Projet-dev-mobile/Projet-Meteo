import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { getGeocodingByCity } from '../api/geocoding.js';

const FavLocationListItem = ({onClick, navigation, locationData }) => {

    const[lat, setLatitude]= useState(null);
    const[long, setLongitude]= useState(null);
    const[country, setCountry]= useState(null);

    const onclick = async () => {
        console.log(locationData);
        try {
            const geocodingSearchResult = await getGeocodingByCity(locationData);
            const lat = geocodingSearchResult.results[0]['geometry']['location']['lat'];
            setLatitude(lat);
            const long = geocodingSearchResult.results[0]['geometry']['location']['lng'];
            setLongitude(long);
            const country = geocodingSearchResult.results[0]['address_components'][3]['long_name'];
            setCountry(country);
        }catch{
            console.log('erreur call api');
        }
        navigateToMeteoInformations(locationData, country, lat, long);
    }

    const navigateToMeteoInformations = (city, country, lat, long) =>{
        navigation.navigate("ViewMeteoInformations", { city, country, lat, long});
    }
    

    return(
        <TouchableOpacity style={styles.container}
        onPress={() => { onClick(locationData) }}>
            <View style={styles.location}>
                <Text style={styles.locationName}>
                    {locationData}
                </Text>
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
    },
    locationName:{
        fontWeight: 'bold',
        fontSize: 25,
        paddingVertical: 15,
        paddingHorizontal: 10
    }
});