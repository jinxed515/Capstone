import React, { FC, useEffect, useState } from "react"
import { TextStyle, ViewStyle, StyleSheet, Image } from "react-native"
import { Card, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import MapView, { Marker, Polyline } from 'react-native-maps';
import markers from "../data/streetlight_locations.json"

export const StreetLightsScreen: FC<DemoTabScreenProps<"StreetLights">> = function DStreetLightsScreen(  _props,) {
  
  //Fix the region of the map
  const mapRegion = {
    latitude: 12.840711,
    longitude: 77.676369,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  };
  
  //The markers to be rendered on the Actual Display
  const [newMarkers, setNewMarkers] = useState([]);


  //Fetch illumination and add additional markers if neccessary
  const mapMarkers = () => {
    var updatedMarkers = markers;
    console.log("Fetch started");

    fetch("https://api.thingspeak.com/channels/2182368/fields/1.json?api_key=63Z862MQUNXJHEDR&results=1")
      .then((response) => response.json())
      .then((info) => {

        // console.log(newMarkers);        
        // updatedMarkers.push({
        //       "longitude": 77.5653756,
        //         "latitude": 12.9407198
        //   });
        // setNewMarkers(updatedMarkers);
        // console.log(markers);
        var value = parseInt(info.feeds[0].field1);
        console.log("Fetch result :"+ (value + 0) );
        
        if (value < 4095) {
          updatedMarkers = [
            ...markers,
            {
              longitude: 77.5653756,
              latitude: 12.9407198,
            },
          ];
          console.log("--------------------------------------------------------------------------")
          
        }

        setNewMarkers(updatedMarkers);
        console.log(updatedMarkers.length);
        // console.log(value + 0);
      })
      .catch((error) => {
        console.log('Error fetching markers:');
      });
  }

  useEffect(() => {
    mapMarkers();
  }, []);

  
  useEffect(() => {
    const timer = setInterval(mapMarkers, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>

      <Text preset="bold" text="All Street Lights" style={$title} />
      <Text text="View all the streetlights in the city" style={$subtitle} />

      <MapView
        key={newMarkers.length}
        style={styles.map}
        region={mapRegion}
        showsUserLocation={true}
      >
        {
          newMarkers.map((marker, index) =>
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              image={require('../../assets/icons/customMarker.png')}
            />
          )
        }
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
  backgroundColor: "#ffffff",
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
