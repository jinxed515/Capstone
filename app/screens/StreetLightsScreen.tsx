import React, {FC} from "react"
import { TextStyle, ViewStyle, StyleSheet, Image } from "react-native"
import { Card, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import MapView, { Marker, Polyline } from 'react-native-maps';
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
        
        <Text preset="heading" text="All Street Lights" style={$title} />
        <Text preset="subheading" text="View all the streetlights in the city" style={$subtitle} />
        
        
        <MapView 
            style={styles.map} 
            region={mapRegion} 
            showsUserLocation={true}
          >
          { mapMarkers() }
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
      height: '90%',
      
    },
  });
  
  const $container: ViewStyle = {
    height:"100%",
    paddingTop: spacing.large + spacing.extraLarge,
    paddingHorizontal: spacing.large,
  }
  
  const $title: TextStyle = {
    // hello
  }
  const $tagline: TextStyle = {
    marginBottom: spacing.huge,
  }

  const $subtitle: TextStyle = {
    marginBottom:spacing.medium
  }
