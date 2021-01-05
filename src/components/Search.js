import React from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';

const Search = () => {

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