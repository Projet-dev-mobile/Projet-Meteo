import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Search from '../components/Search';

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
     
    </SearchNavigation.Navigator>
  );
}

export default RootStack;