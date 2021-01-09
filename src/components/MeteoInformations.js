import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, Image } from 'react-native';

const MeteoInformations = ({ route }) => {

    const [meteoInformations, setMeteoInformations]=useState(null);

    
    useEffect(() => {
        initilisationInformations();
      }, []); // Uniquement à l'initialisation
      

    const initilisationInformations = () => {
        //setMeteoInformations(route.params.locationInformations);
    }

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