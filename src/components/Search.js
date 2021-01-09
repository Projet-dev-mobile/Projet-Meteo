import React ,{ Component, useState } from 'react';
import {Alert, View, TextInput, Button, StyleSheet, Text, FlatList, Keyboard } from 'react-native';
import { getGeocodingByCoords } from '../api/geocoding';


const Search = () => {
   
    const [location, setLocation] = useState(null);
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


    const navigateToMeteoInformations = (meteoInformations) => {
        navigation.navigate("ViewMeteoInformations", { meteoInformations });
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