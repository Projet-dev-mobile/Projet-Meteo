import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Search from '../components/Search';
import MeteoInformations from '../components/MeteoInformations';

const SearchNavigation = createStackNavigator();

function RootStack() {
  return (
    <SearchNavigation.Navigator
      initialRouteName="ViewSearch"
    >
      <SearchNavigation.Screen
        name="ViewSearch"
        component={Search}
        options={{ title: 'Emplacement' }}
      />

      <SearchNavigation.Screen
        name="ViewMeteoInformations"
        component={MeteoInformations}
        options={{ title: 'Meteo' }}
      />
     
    </SearchNavigation.Navigator>
  );
}

export default RootStack;