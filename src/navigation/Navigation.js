import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@ui-kitten/components";
import Search from "../components/Search";
import MeteoInformations from "../components/MeteoInformations";
import FavLocation from "../components/FavLocation";
import SpecialText from "../form/SpecialText";
import Assets from "../definitions/Assets";

const SearchNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();
const FavNavigation = createStackNavigator();

function searchStackScreens() {
  return (
    <SearchNavigation.Navigator initialRouteName="ViewSearch">
      <SearchNavigation.Screen
        name="ViewSearch"
        component={Search}
        options={{
          title: "Emplacement",
          headerTitle: false,
          headerShown: false,
        }}
      />

      <SearchNavigation.Screen
        name="ViewMeteoInformations"
        component={MeteoInformations}
        options={{ title: "Meteo", headerTitle: false, headerShown: false }}
      />
    </SearchNavigation.Navigator>
  );
}

function favStackScreens() {
  return (
    <FavNavigation.Navigator initialRouteName="ViewFav">
      <FavNavigation.Screen
        name="ViewFav"
        component={FavLocation}
        options={{ title: "Favoris", headerShown: false }}
      />
      <FavNavigation.Screen
        name="ViewMeteoInformations"
        component={MeteoInformations}
        options={{ title: "Meteo", headerShown: false }}
      />
    </FavNavigation.Navigator>
  );
}

function RootStack() {
  return (
    <TabNavigation.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: "rgb(225,225,225)",
        },
      }}
    >
      <TabNavigation.Screen
        name="Recherche"
        component={searchStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="search"
                style={{ height: 30, width: 30, color: "black" }}
              />
            );
          },
          tabBarLabel: () => {
            return (
              <SpecialText
                text="Rechercher"
                style={{ fontSize: 10, paddingLeft: 12, fontColor: "black" }}
              />
            );
          },
        })}
      />
      <TabNavigation.Screen
        name="Mes lieux"
        component={favStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="star"
                style={{ height: 30, width: 30, color: "black" }}
              />
            );
          },
          tabBarLabel: () => {
            return (
              <SpecialText
                text="Mes lieux"
                style={{ fontSize: 10, paddingLeft: 5, fontColor: "black" }}
              />
            );
          },
        })}
      />
    </TabNavigation.Navigator>
  );
}

export default RootStack;
