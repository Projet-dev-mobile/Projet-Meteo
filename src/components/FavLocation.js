import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import FavLocationListItem from '../components/FavLocationListItem';

import { getGeocodingByCity } from '../api/geocoding.js';

const FavLocation = ({ route, navigation,  favLocations, dispatch }) => {

    const [locations, setLocations] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        console.log(favLocations);
        refreshFavLocations();
    }, [favLocations]); // A chaque fois que les restaurants favoris changent A FAIRE : METTRE FAVLOCATIONS DANS LES CROCHETS

    const refreshFavLocations = async () => {
        setIsRefreshing(true);
        setIsError(false);
        //favLocations=['Metz','Toulouse', 'Marseille'];
        let locations = [];
        try {
          for (const city of favLocations) {
            const geocodingSearchResult = await getGeocodingByCity(city);
            const lat = geocodingSearchResult.results[0]['geometry']['location']['lat'];
            const long = geocodingSearchResult.results[0]['geometry']['location']['lng'];
            //push la liste des localisations
            locations.push(city);
          };
          setLocations(locations);
          //set latitude, longitude
        } catch (error) {
          setIsError(true);
          setLocations([]);
        }
        setIsRefreshing(false);
    };

    const navigateToMeteoInformations = async(city) =>{
        try {
            const geocodingSearchResult = await getGeocodingByCity(city);
            const latitude = geocodingSearchResult.results[0]['geometry']['location']['lat'];
            const longitude = geocodingSearchResult.results[0]['geometry']['location']['lng'];
            const country = geocodingSearchResult.results[0]['address_components'][3]['long_name'];
            navigation.navigate("ViewMeteoInformations", { city, country, latitude, longitude});
        }catch{
            console.log('erreur call api');
        }
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={locations}
                renderItem={({ item, index }) => (
                    <FavLocationListItem
                        locationData={item}
                        onClick={navigateToMeteoInformations}
                    />
                )}
            />
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        favLocations: state.favLocationsID
    }
  }
  
  export default connect(mapStateToProps)(FavLocation);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 12,
      marginTop: 16,
    },
  });