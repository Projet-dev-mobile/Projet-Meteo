import React, { useState } from "react";
import {
  Alert,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  getGeocodingByCoords,
  getGeocodingByCityPostalAndCountry,
} from "../api/geocoding";
import DefaultButton from "../form/DefaultButton";
import SpecialText from "../form/SpecialText";

const Search = ({ navigation, favLocations }) => {
  const [cityValue, onChangeTextCity] = useState("");
  const [postalValue, onChangeTextPostal] = useState("");
  const [countryValue, onChangeTextCountry] = useState("");
  const [isError, setIsError] = useState(false);
  const [city, setCity] = useState(null);
  const [postal, setPostal] = useState(null);
  const [country, setCountry] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const requestGeocoding = async (latitude_, longitude_) => {
    setIsError(false);
    try {
      const geocondingSearchResult = await getGeocodingByCoords(
        latitude_,
        longitude_
      );
      saveLocationData(
        geocondingSearchResult.results[1],
        latitude_,
        longitude_
      );
    } catch (error) {
      setIsError(true);
    }
  };

  const amIaFavLocation = (city) => {
    if (favLocations.findIndex((i) => i === city) !== -1) {
      return true;
    }
    return false;
  };

  const saveLocationData = (locationInformations, latitude_, longitude_) => {
    setCity(locationInformations["address_components"][2]["long_name"]);
    const city_ = locationInformations["address_components"][2]["long_name"];
    console.log(city_);
    setPostal(locationInformations["address_components"][6]["long_name"]);
    setCountry(locationInformations["address_components"][5]["long_name"]);
    navigateToMeteoInformations(latitude_, longitude_, city_);
  };

  const navigateToMeteoInformations = (latitude_, longitude_, city_) => {
    const latitude = latitude_;
    const longitude = longitude_;
    const city = city_;
    if (latitude != null && longitude != null && city != null) {
      navigation.navigate("ViewMeteoInformations", {
        city,
        country,
        latitude,
        longitude,
      });
    }
  };

  const findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = position.coords;
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        requestGeocoding(position.coords.latitude, position.coords.longitude);
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const handleCity = (text) => {
    onChangeTextCity(text);
  };

  const handlePostal = (text) => {
    onChangeTextPostal(text);
  };

  const handleCountry = (text) => {
    onChangeTextCountry(text);
  };

  const getLocation = async () => {
    city_ = "";
    country_ = "";
    setIsError(false);
    try {
      const geocodingSearchResult = await getGeocodingByCityPostalAndCountry(
        cityValue,
        postalValue,
        countryValue
      );
      geocodingSearchResult.results[0]["address_components"].forEach(
        (element) => {
          switch (element["types"][0]) {
            case "locality": {
              setCity(element["long_name"]);
              city_ = element["long_name"];
              break;
            }
            case "country": {
              setCountry(element["long_name"]);
              country_ = element["long_name"];
              break;
            }
          }
        }
      );
      setLatitude(
        geocodingSearchResult.results[0]["geometry"]["location"]["lat"]
      );
      const city = city_;
      const country = country_;
      const latitude =
        geocodingSearchResult.results[0]["geometry"]["location"]["lat"];
      const longitude =
        geocodingSearchResult.results[0]["geometry"]["location"]["lng"];
      setLongitude(
        geocodingSearchResult.results[0]["geometry"]["location"]["lng"]
      );
      navigation.navigate("ViewMeteoInformations", {
        city,
        country,
        latitude,
        longitude,
      });
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.firstView}>
        <SpecialText style={styles.locateText} text="Emplacement" />
      </View>
      <View style={styles.secondView}>
        {/* <CityTextInput style={styles.city}/> */}
        <TextInput
          style={styles.form}
          onChangeText={handleCity}
          placeholder="Ville"
        />
        <View style={styles.rowView}>
          <View style={styles.pc}>
            <TextInput
              style={styles.form}
              onChangeText={handlePostal}
              placeholder="Code postal"
            />
          </View>
          <View style={styles.country}>
            <TextInput
              style={styles.form}
              onChangeText={handleCountry}
              placeholder="Pays"
            />
          </View>
        </View>
      </View>
      <View style={styles.thirdView}>
        <View style={styles.searchButton}>
          <DefaultButton
            children={() => (
              <SpecialText
                text="Rechercher"
                style={{
                  paddingLeft: 8,
                  fontSize: 15,
                  fontFamily: "Comfortaa",
                }}
              />
            )}
            appearance="outline"
            status="basic"
            iconName="search"
            style={styles.button}
            onPress={getLocation}
          />
        </View>
        <View style={styles.searchLocate}></View>
      </View>
      <View style={styles.fourthView}>
        <View style={styles.searchButton}>
          <DefaultButton
            children={() => (
              <SpecialText
                text="Me localiser"
                style={{
                  paddingLeft: 8,
                  fontSize: 15,
                  fontFamily: "Comfortaa",
                }}
              />
            )}
            appearance="outline"
            status="basic"
            iconName="map-pin"
            onPress={findCoordinates}
          />
        </View>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  mainView: { flex: 1 },
  firstView: {
    flex: 1,
    paddingTop: 100,
    paddingLeft: 20,
  },
  locateText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  secondView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  thirdView: {
    flex: 1,
  },
  fourthView: {
    flex: 1,
  },
  city: {
    paddingLeft: 15,
  },
  pc: {
    flex: 1,
    paddingRight: 25,
  },
  country: {
    flex: 1,
    paddingLeft: 20,
  },
  rowView: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 20,
  },
  searchButton: {
    alignSelf: "center",
    width: 175,
    paddingBottom: 50,
  },
  searchLocate: {
    alignSelf: "center",
    width: 175,
  },
  pcText: {
    fontStyle: "italic",
  },
  countryText: {
    fontStyle: "italic",
  },
  form: {
    borderColor: "gray",
    borderBottomWidth: 1,
    fontFamily: "Comfortaa",
  },
  button: {
    backgroundColor: "white",
  },
});
