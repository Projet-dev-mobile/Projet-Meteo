import React ,{ Component, useState } from 'react';
import {Alert, View, TextInput, Button, StyleSheet, Text, FlatList, Keyboard } from 'react-native';


const Search = () => {
   
    const [location, setLocation] = useState(null);

    const findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const location = JSON.stringify(position);

				setLocation( location );
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
                <Text>
                    Location: {location}
                </Text>
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