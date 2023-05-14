import React, {FC, useState, useEffect} from "react"
import { TextStyle, ViewStyle, StyleSheet, View, Dimensions, Button  } from "react-native"
import { Card, ListItem, Screen, Text, TextField } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import MapView, { Marker } from 'react-native-maps';
import markers from "../data/streetlight_locations.json"

export const StreetLightsScreen: FC<DemoTabScreenProps<"StreetLights">> = function DStreetLightsScreen(
    _props,
  ) {
    const mapRegion= {
      latitude: 12.840711,
      longitude: 77.676369,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009,
    };

    const mapMarkers = () => (
      markers.map((marker, index) =>
        <Marker
          key={index}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
        />
      )
    )

    return (
      <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
        <Text preset="heading" tx="NavigationScreen.title" style={$title} />
        <MapView 
            style={styles.map} 
            region={mapRegion} 
            showsUserLocation={true}
          >
          { mapMarkers() }
        </MapView>
      </Screen>
    )
  }
  
  const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: '90%',
    },
  });
  
  const $container: ViewStyle = {
    height:"100%",
    paddingTop: spacing.large + spacing.extraLarge,
    paddingHorizontal: spacing.large,
  }
  
  const $title: TextStyle = {
    marginBottom: spacing.small,
  }
  const $tagline: TextStyle = {
    marginBottom: spacing.huge,
  }