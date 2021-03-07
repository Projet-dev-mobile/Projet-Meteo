import { Assets } from '@react-navigation/stack';
import React ,{ Component, useState, useEffect } from 'react';
import {Alert, View, TextInput, Button, StyleSheet, Text, FlatList, Keyboard } from 'react-native';
import { getGeocodingByCoords } from '../api/geocoding';
import { getCurrentWeahterByCity } from '../api/openweathermap';
import { getPrevisionForSevenDaysCity } from '../api/openweathermap';
import CityTextInput from '../form/CityInput';
import PostalCodeInput from '../form/PostalCodeInput';
import CountryTextInput from '../form/CountryInput';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from '../../theme.json';
import { default as mapping } from '../../mapping.json';
import * as eva from '@eva-design/eva';
import LocateButton from '../form/LocateButton';
import SearchButton from '../form/SearchButton';
import { connect } from 'react-redux';

    const Search = ({navigation, favLocations}) => {
   
    const [isError, setIsError] = useState(false);
    const [city, setCity]=useState(null);
    const [postal, setPostal]=useState(null);
    const [country, setCountry ]=useState(null);
    const [latitude, setLatitude ]=useState(null);
    const [longitude, setLongitude ]=useState(null);

    const requestGeocoding = async (latitude,longitude) => {
        setIsError(false);
        try {
            const geocondingSearchResult = await getGeocodingByCoords(latitude,longitude);
            saveLocationData(geocondingSearchResult.results[1]);
        } catch (error) {
            setIsError(true);
        }
    };

    const amIaFavLocation = (city) => {
        if (favLocations.findIndex(i => i === city) !== -1) {
          return true;
        }
        return false;
      };

    const saveLocationData = (locationInformations) => {

        setCity(locationInformations["address_components"][2]["long_name"]);
        setPostal(locationInformations["address_components"][6]["long_name"]);
        setCountry(locationInformations["address_components"][5]["long_name"]);
        navigateToMeteoInformations();
    };

    const navigateToMeteoInformations = () => {
        if(latitude!=null && longitude!=null && city !=null){
            navigation.navigate("ViewMeteoInformations", { city, country, latitude, longitude});
        }
    }

    const findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
                const location =position.coords;
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
				requestGeocoding(position.coords.latitude, position.coords.longitude);
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};
    return (
        <View style={styles.mainView}>
            <View style={styles.firstView}>
                <Text style={styles.locateText}>Emplacement</Text>
            </View>
            <View style={styles.secondView}>
                <CityTextInput style={styles.city}/>
                <View style={styles.rowView}>
                    <View style={styles.pc}>
                        <PostalCodeInput style={styles.pcText}/>
                    </View>
                    <View style={styles.country}>
                        <CountryTextInput style={styles.countryText}/>
                    </View> 
                </View>
            </View>
            <View style={styles.thirdView}>
                <View style={styles.searchButton}>
                    <SearchButton/>
                </View>
                <View style={styles.searchLocate}>
                    <LocateButton onPress={findCoordinates}/>
                </View>
            </View>
            <View style={styles.fourthView}>
                {/* <TextInput */}
                    {/* placeholder='Partie de clecle' */}
                {/* /> */}
                 <Button
                    title='Me localiser'
                    onPress={findCoordinates}
                 />   
            </View>
        </View>
        
    );
};


const mapStateToProps = (state) => {
    return {
      favLocations: state.favLocationsCity
    }
}

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
    mainView: { flex: 1 },
    firstView :{
        flex: 1,
        paddingTop: 100,
        paddingLeft: 20,
    },
    locateText:{
        fontSize: 30,
        fontWeight: "bold"
    },
    secondView:{
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    thirdView:{
        flex: 1,
    },
    fourthView:{
        flex: 1
    },
    city: {
        paddingLeft: 15,
    },
    pc: {
        flex: 1,
        paddingRight: 25
    },
    country: {
        flex: 1,
        paddingLeft: 20
    },
    rowView: {
        flex: 1, 
        flexDirection: 'row',
        paddingTop: 20
    },
    searchButton: {
        alignSelf: 'center',
        width: 175,
        paddingBottom: 50
    },
    searchLocate: {
        alignSelf: 'center',
        width: 175
    },
    pcText: {
        fontStyle: 'italic'
    },
    countryText: {
        fontStyle: 'italic'
    }
});