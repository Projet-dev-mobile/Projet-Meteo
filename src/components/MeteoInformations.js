import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Icon } from "@ui-kitten/components";
import { getPrevisionForSevenDaysCity } from "../api/openweathermap";
import { LineChart } from "react-native-svg-charts";
import { connect } from "react-redux";
import DisplayError from "../components/DisplayError";
import PrevisionRender from "../components/PrevisionRender";
import PrevisionHourly from "../components/PrevisionHourly";
import SpecialText from "../form/SpecialText";
import DefaultButton from "../form/DefaultButton";

const MeteoInformations = ({ route, favLocations, dispatch, navigation }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState(route.params.city);
  const [country, setCountry] = useState(route.params.country);
  const [prevision, setPrevision] = useState(null);
  const [precipitation, setPrecipitation] = useState(null);
  const [sevenDays, setSevenDays] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    setCity(route.params.city);
    setCountry(route.params.country);
    setIsLoading(true);
    requestMeteo(route.params.latitude, route.params.longitude);
  }, []); // Uniquement à l'initialisation

  useEffect(() => {
    if (prevision != null) parsePrecipitation();
  }, [prevision]);

  const requestMeteo = async (latitude, longitude) => {
    try {
      const meteoSearchResult = await getPrevisionForSevenDaysCity(
        latitude,
        longitude
      );
      setPrevision(meteoSearchResult);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  const previousPage = async () => {
    navigation.goBack();
  };

  // On pourrait définir les actions dans un fichier à part
  const saveLocation = async () => {
    const action = { type: "SAVE_LOCATION", value: city };
    dispatch(action);
  };

  const unsaveLocation = async () => {
    const action = { type: "UNSAVE_LOCATION", value: city };
    dispatch(action);
  };

  const displaySaveLocation = () => {
    if (favLocations.findIndex((i) => i === city) !== -1) {
      // La localisation est sauvegardé
      return (
        <DefaultButton
          iconName="book"
          onPress={unsaveLocation}
          appearance="ghost"
        />
      );
    }
    // La localisation n'est pas sauvegardé
    return (
      <DefaultButton
        iconName="bookmark"
        appearance="ghost"
        onPress={saveLocation}
      />
    );
  };

  const parsePrecipitation = () => {
    const correctName =
      prevision["current"]["weather"][0]["description"]
        .charAt(0)
        .toUpperCase() +
      prevision["current"]["weather"][0]["description"].substring(1);
    setCityName(correctName);
    const precipitation = prevision["minutely"].map(
      (obj) => obj.precipitation * 50
    );
    setPrecipitation(precipitation);
    const timefull = prevision['minutely'].map(
      obj => ((new Date(obj.dt*1000).toLocaleTimeString().substring(0,5))));
    const time_ = [timefull[0],timefull[29], timefull[59]]
    setTime(time_);
    const days = [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ];
    const sevenDays = prevision["daily"].map((obj) => ({
      day: days[new Date(obj.dt * 1000).getDay()],
      icon: obj.weather[0].icon,
      humidity: obj.humidity,
      min: parseInt(obj.temp.min, 10),
      max: parseInt(obj.temp.max, 10),
    }));
    setSevenDays(sevenDays);
    var hourly_ = prevision["hourly"].map((obj) => ({
      hour: new Date(obj.dt * 1000).toLocaleTimeString().substring(0, 5),
      icon:
        "https://openweathermap.org/img/wn/" + obj.weather[0].icon + "@2x.png",
      temp: parseInt(obj.temp, 10),
    }));
    hourly_.length = 25;
    setHourly(hourly_);
  };

  return (
    <View style={styles.container}>
      {isError ? (
        <DisplayError message="Impossible de récupérer les données de la locatisation" />
      ) : isLoading ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={styles.mainView}>
          <View style={styles.currentGlobalInfos}>
            <View style={styles.headerButtons}>
              <View style={styles.previousPage}>
                <DefaultButton
                  appearance="ghost"
                  iconName="arrow-left"
                  onPress={previousPage}
                />
              </View>
              <View style={styles.favIcon}>{displaySaveLocation()}</View>
            </View>
            <View style={styles.allHeaderInfos}>
              <View style={styles.cityText}>
                <SpecialText style={styles.city} text={route.params.city} />
              </View>
              <View style={styles.descriptionText}>
                <SpecialText
                  style={styles.weatherTemperature}
                  text={
                    cityName +
                    ", " +
                    parseInt(prevision["current"]["temp"]) +
                    "°C"
                  }
                />
              </View>
              <View style={styles.icons}>
                <View style={styles.degree}>
                  <View style={styles.degreMin}>
                    <Icon
                      name="arrow-down"
                      style={styles.icon}
                      fill="#3366FF"
                    />
                    <SpecialText
                      style={styles.textCurrentWeatherInfos}
                      text={
                        parseInt(prevision["daily"][0]["temp"]["min"]) + "°C"
                      }
                    />
                  </View>
                  <View style={styles.degreMax}>
                    <Icon name="arrow-up" style={styles.icon} fill="#3366FF" />
                    <SpecialText
                      style={styles.textCurrentWeatherInfos}
                      text={
                        parseInt(prevision["daily"][0]["temp"]["max"]) + "°C"
                      }
                    />
                  </View>
                </View>
                <View style={styles.degree}>
                  <View style={styles.degreMin}>
                    <Icon
                      name="cloud"
                      style={{ height: 16, width: 16 }}
                      fill="#3366FF"
                    />
                    <SpecialText
                      style={styles.textCurrentWeatherInfos}
                      text={prevision["current"]["clouds"] + "%"}
                    />
                  </View>
                  <View style={styles.degreMin}>
                    <Icon name="wind" style={styles.icon} fill="#3366FF" />
                    <SpecialText
                      style={styles.textCurrentWeatherInfos}
                      text={
                        parseInt(prevision["current"]["wind_speed"]) + "km/h"
                      }
                    />
                  </View>
                  <View style={styles.degreMax}>
                    <Icon name="umbrella" style={styles.icon} fill="#3366FF" />
                    <SpecialText
                      style={styles.textCurrentWeatherInfos}
                      text={prevision["current"]["humidity"] + "%"}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.middle1}>
            <View style={styles.middle1Text}>
              <SpecialText style={styles.title} text={"Précipitations"} />
            </View>
            <View style={styles.middle1Chart}>
              <LineChart
                style={{ height: '100%' }}
                data={precipitation}
                yMax={100}
                yMin={0}
                svg={{ strokeWidth: 2, stroke: "rgb(54, 218, 250)" }}
                showGrid={false}
              ></LineChart>
            </View>
            <View style={styles.globalTime}>
              <View style={styles.time1}>
                <SpecialText style={styles.time} text={time[0]}/>
              </View>
              <View style={styles.time2}>
                <SpecialText style={styles.time} text={time[1]}/>
              </View>
              <View style={styles.time3}>
                <SpecialText style={styles.time} text={time[2]}/>
              </View>
            </View>
          </View>

          <View style={styles.middle2}>
            <View style={styles.middle2Text}>
              <SpecialText style={styles.title} text={"Evolution 24h"} />
            </View>
            <View style={styles.middle2List}>
              <FlatList
                horizontal={true}
                data={hourly}
                renderItem={(item) => <PrevisionHourly item={item} />}
              />
            </View>
          </View>

          <View style={styles.bottomView}>
            <View style={styles.bottomViewText}>
              <SpecialText style={styles.title} text={"Prévisions 7 jours"} />
            </View>
            <View style={styles.bottomViewList}>
              <FlatList
                data={sevenDays}
                renderItem={(item) => <PrevisionRender item={item} />}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    favLocations: state.favLocationsID,
  };
};

export default connect(mapStateToProps)(MeteoInformations);

const styles = StyleSheet.create({
  mainView: { flex: 4, backgroundColor: "rgb(220,220,220)", paddingTop: "12%" },
  container: {
    flex: 1,
  },
  headerButtons: {
    flexDirection: "row",
  },
  currentGlobalInfos: {
    flex: 1,
    backgroundColor: "rgb(210,210,210)",
    paddingBottom: 10,
  },
  allHeaderInfos: {
    marginLeft: "5%",
    flex: 1,
  },
  previousPage: {
    flex: 1,
    alignItems: "flex-start",
  },
  favIcon: {
    flex: 1,
    alignItems: "flex-end",
  },
  cityText: {
    flex: 1,
  },
  city: {
    fontFamily: "Comfortaa",
    fontSize: 30,
  },
  descriptionText: {
    paddingLeft: 2,
    flex: 1,
  },
  middle1: {
    flex: 1,
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: '2%'
  },
  iconView: {
    flexDirection: "row",
  },
  middle1Text: {
    flex: 1,
    paddingBottom: 8,
    paddingTop: 8,
  },
  middle1Chart: {
    flex:5,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
  },
  middle2: {
    flex: 1,
  },
  middle2Text: {
    flex: 1,
    marginLeft: "5%",
  },
  middle2List: {
    flex: 3,
    marginLeft: "5%",
    marginRight: "5%",
  },
  bottomView: {
    flex: 1,
    paddingTop: 10,
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "8%",
  },
  bottomViewText: {
    paddingBottom: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  time: {
    fontSize: 11,
  },
  hourly: {
    flexDirection: "row",
  },
  weatherTemperature: {
    fontSize: 20,
    fontWeight: "bold",
  },

  currentWeatherInfos: {
    position: "absolute",
    flexDirection: "row",
  },
  textCurrentWeatherInfos: {
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  icons: {
    flex: 1,
  },
  degree: {
    flexDirection: "row",
  },
  degreMin: {
    flexDirection: "row",
    paddingRight: 10,
  },
  degreMax: {
    flexDirection: "row",
  },
  utils: {
    flexDirection: "row",
  },
  icon: {
    height: 18,
    width: 18,
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerScroll: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  globalTime:{
    flex:1,
    flexDirection: "row",
  },
  time2:{
    paddingLeft: '38%'
  },
  time3:{
    paddingLeft:'40%',
    paddingRight:'10%'
  }
});
