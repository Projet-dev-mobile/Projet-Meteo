import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Button, Text, Icon } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { default as mapping } from './mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { FeatherIconsPack } from './feather-icons';
import { Provider } from 'react-redux';
import Store from './src/store/config';

export default function App() {
  
  return (
    <>
    <Provider store={Store}>
      <IconRegistry icons={ FeatherIconsPack} />
      <ApplicationProvider 
      {...eva} 
      theme={{ ...eva.light, ...theme }}
      customMapping={mapping}
      >
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20
  },
});

