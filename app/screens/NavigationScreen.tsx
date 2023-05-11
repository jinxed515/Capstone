import React, { FC, useState, useEffect } from "react"
import { TextStyle, ViewStyle, StyleSheet, View, Dimensions, Button, TextInput, KeyboardAvoidingView } from "react-native"
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

  const [source, onChangeSource] = React.useState('');
  const [destination, onChangeDestination] = React.useState('');

  return (
    <Screen preset="scroll" contentContainerStyle={$container} style={styles.container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="NavigationScreen.title" style={$title} />
      <Text tx="NavigationScreen.tagLine" style={$tagline} />
      <MapView style={styles.map}
          region={mapRegion}
      />
      <Text tx="NavigationScreen.sourceInput" style={$inputTitle} />
      <KeyboardAvoidingView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSource}
          value={source}
          placeholder="Enter Starting point"
        />
      <Text tx="NavigationScreen.destInput" style={$inputTitle} />
      <TextInput
        style={styles.input}
        onChangeText={onChangeDestination}
        value={destination}
        placeholder="Enter Ending point"
      />
      </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({  
  container: {
  },
  map: {
    height: '50%',
    width: '100%',
    marginBottom: spacing.large
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: spacing.small,
  }
});

const $container: ViewStyle = {
  flex: 1, 
  justifyContent: 'center',
  height:"100%",
  padding: spacing.large,
}

const $title: TextStyle = {
  marginBottom: spacing.small,
}

const $tagline: TextStyle = {
  marginBottom: spacing.large,
}

const $inputTitle: TextStyle = {
  marginVertical: "1%",  
}