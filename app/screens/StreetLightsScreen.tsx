import React, { FC, useEffect } from "react"
import { TextStyle, ViewStyle, StyleSheet, Image } from "react-native"
import { Card, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import MapView, { Marker, Polyline } from 'react-native-maps';
import markers from "../data/streetlight_locations.json"

export const StreetLightsScreen: FC<DemoTabScreenProps<"StreetLights">> = function DStreetLightsScreen(
  _props,
) {
  const mapRegion = {
    latitude: 12.840711,
    longitude: 77.676369,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  };

  const mapMarkers = () => {

     
    fetch("https://api.thingspeak.com/channels/2182368/fields/1.json?api_key=63Z862MQUNXJHEDR&results=1")
      .then((response) => response.json())
      .then((info) => {
        console.log(info.feeds[0].field1);
        console.log("Added");
        if (info.feeds[0].field1 < 4095) markers.push({
          "longitude": 77.5655,
          "latitude": 12.9410
        });

      });

    fetch("https://api.thingspeak.com/channels/2182371/fields/1.json?api_key=5MS1IBYEGBZHRUD9&results=1")
      .then((response) => response.json())
      .then((info) => {
        console.log(info.feeds[0].field1);
        if (info.feeds[0].field1 < 4095) markers.push({
          "longitude": 77.653861,
          "latitude": 12.83975
        });
      });

   fetch("https://api.thingspeak.com/channels/2182363/fields/1.json?api_key=2OVS23NM20RXQG7G&results=1")
      .then((response) => response.json())
      .then((info) => {
        console.log(info.feeds[0].field1);
        if (info.feeds[0].field1 < 4095) markers.push({
          "longitude": 77.653861,
          "latitude": 12.83975
        });
      });

    return markers.map((marker, index) =>
      <Marker
        key={index}
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
        }}
      />
    )
  }

  useEffect(() => {
    
    fetch("https://api.thingspeak.com/channels/2182368/fields/1.json?api_key=63Z862MQUNXJHEDR&results=1")
      .then((response) => response.json())
      .then((info) => {
        console.log(info.feeds[0].field1);
        console.log("Added");
        if (info.feeds[0].field1 < 4095) markers.push({
          longitude: 77.5655,
          latitude: 12.9410
        });

      });

    fetch("https://api.thingspeak.com/channels/2182371/fields/1.json?api_key=5MS1IBYEGBZHRUD9&results=1")
      .then((response) => response.json())
      .then((info) => {
        console.log(info.feeds[0].field1);
        if (info.feeds[0].field1 < 4095) markers.push({
          longitude: 77.653861,
          latitude: 12.83975
        });
      });

    fetch("https://api.thingspeak.com/channels/2182363/fields/1.json?api_key=2OVS23NM20RXQG7G&results=1")
      .then((response) => response.json())
      .then((info) => {
        console.log(info.feeds[0].field1);
        if (info.feeds[0].field1 < 4095) markers.push({
          longitude: 77.653861,
          latitude: 12.83975
        });
      });
  }, [])


  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>

      <Text preset="bold" text="All Street Lights" style={$title} />
      <Text text="View all the streetlights in the city" style={$subtitle} />

      <MapView
        style={styles.map}
        region={mapRegion}
        showsUserLocation={true}
      >
        {mapMarkers()}
        {/* <Polyline
            coordinates={[
              
            ]}
            strokeColor="#0000FF"
            strokeWidth={6}
          /> */}
      </MapView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '88%',
  },
});

const $container: ViewStyle = {
  height: "100%",
  paddingTop: spacing.extraLarge + spacing.small,
  paddingHorizontal: spacing.large,
}

const $title: TextStyle = {
  fontSize: spacing.large,
}
const $tagline: TextStyle = {
  marginBottom: spacing.huge,
}

const $subtitle: TextStyle = {
  marginTop: spacing.tiny,
  marginBottom: spacing.medium
}
