import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import Search from '../components/Search';
import MeteoInformations from '../components/MeteoInformations';
import FavLocation from '../components/FavLocation';

import Assets from '../definitions/Assets';

const SearchNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();
const FavNavigation = createStackNavigator();

function searchStackScreens() {
  return (
    <SearchNavigation.Navigator
      initialRouteName="ViewSearch"
    >
      <SearchNavigation.Screen
        name="ViewSearch"
        component={Search}
        options={{ title: 'Emplacement', headerTitle: false, headerShown: false }}
      />

      <SearchNavigation.Screen
        name="ViewMeteoInformations"
        component={MeteoInformations}
        options={{ title: 'Meteo' }}
      />
     
    </SearchNavigation.Navigator>
  );
}

function favStackScreens() {
  return (
    <FavNavigation.Navigator
      initialRouteName="ViewFav"
    >
      <FavNavigation.Screen
        name="ViewFav"
        component={FavLocation}
        options={{ title: 'Favoris' }}
      />
      <FavNavigation.Screen
        name="ViewMeteoInformations"
        component={MeteoInformations}
        options={{ title: 'Meteo' }}
      />
    </FavNavigation.Navigator>
  )
};


function RootStack() {
  return (
    <TabNavigation.Navigator
      tabBarOptions={{
        
      }}>
      <TabNavigation.Screen
        name="Recherche"
        component={searchStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return <Image source={Assets.icons.search} style={{ tintColor: color }} />;
          }
        })}
      />
      <TabNavigation.Screen
        name="Mes lieux"
        component={favStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return <Image source={Assets.icons.globe} style={{ tintColor: color }} />;
          }
        })}
      />
    </TabNavigation.Navigator>
  );
}

export default RootStack;