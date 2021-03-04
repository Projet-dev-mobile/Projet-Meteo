import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, Image } from 'react-native';

const MeteoInformations = ({ route }) => {

    const [city, setCity]=useState(null);
    const [postal, setPostal]=useState(null);
    const [country, setCountry]=useState(null);
    const [isError, setIsError] = useState(false);

    
    useEffect(() => {
        initilisationInformations();
      }, []); // Uniquement à l'initialisation
      

    const initilisationInformations = () => {
        setCity(route.params.city);
        setPostal(route.params.postal);
        setCountry(route.params.country);
    };

    return (
        <View style={styles.mainView}>
          <View style={styles.currentGlobalInfos}>
            <Text style={styles.city}>{route.params.city}</Text>
          </View>

          <View style={styles.middle1}>
            <Text style={styles.title}>Précipitations</Text>
          </View>

          <View style={styles.middle2}>
            <Text style={styles.title}>Evolution 24h</Text>
          </View>

          <View style={styles.bottomView}>
            <Text style={styles.title}>Prévisions 7 jours</Text>
          </View>
        </View>
    );
}

export default MeteoInformations;

const styles = StyleSheet.create({
  mainView: { flex: 4 },
  currentGlobalInfos :{
      flex : 1,
      marginLeft : '5%',
      marginTop : '5%',
      marginBottom : '5%',
      marginRight : '5%',
      borderWidth: 1,
  },
  middle1 :{
    flex : 1,
    marginLeft : '5%',
    marginTop : '5%',
    marginBottom : '5%',
    marginRight : '5%',
    borderWidth: 1,
  },
  middle2 :{
    flex : 1,
    marginLeft : '5%',
    marginTop : '5%',
    marginBottom : '5%',
    marginRight : '5%',
    borderWidth: 1,
  },
  bottomView :{
    flex : 1,
    marginLeft : '5%',
    marginTop : '5%',
    marginBottom : '5%',
    marginRight : '5%',
    borderWidth: 1,
  },

  city: {
    fontWeight: 'bold',
    fontSize: 25,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
  }
});