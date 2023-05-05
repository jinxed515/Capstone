import React, { FC, useState, useEffect } from "react"
import { TextStyle, ViewStyle, StyleSheet, View, Dimensions, Button } from "react-native"
import { Card, Screen, Text, TextField } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { isRTL } from "../i18n"
import MapView from 'react-native-maps';

export const NavigationScreen: FC<DemoTabScreenProps<"Navigate">> = function NavigationScreen(
  _props,
) {
  const [mapRegion, setMapRegion] = useState({
    latitude: 12.9414292,
    longitude: 77.5665759,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <Screen preset="scroll" contentContainerStyle={$container} style={styles.overall}  safeAreaEdges={["top"]}>
      <Text preset="heading" tx="NavigationScreen.title" style={$title} />
      <Text tx="NavigationScreen.tagLine" style={$tagline} />
      <MapView style={styles.map}
          region={mapRegion}
        />

    
      <TextField label="Source Address" value="MG Road" placeholder="Text goes here" />
      <TextField label="Destination address" value="Home" placeholder="Text goes here" />
      
      

    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'red',
  },
  map: {
    width: '100%',
    height: '60%',
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



