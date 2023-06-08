import React, { FC, useState, useEffect } from "react"
import { TextStyle, ViewStyle, StyleSheet, View, Dimensions, Button, TextInput, KeyboardAvoidingView, Platform } from "react-native"
import { Card, Screen, Text, TextField } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { isRTL } from "../i18n"
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import { getRouteCoordinate, getAlternativeRouteCoordinates } from "../GoogleAPI"
import { de } from "date-fns/locale"

export const NavigationScreen: FC<DemoTabScreenProps<"Navigate">> = function NavigationScreen(
  _props,
) {
  const [mapRegion, setMapRegion] = useState({
    latitude: 12.848060290069618, 
    latitudeDelta: 0.021698091960084653, 
    longitude: 77.66496514901519, 
    longitudeDelta: 0.02072509378194809
  });

  let source_coord = {latitude: 12.84871, longitude: 77.657882};
  let destination_coord = {latitude: 12.843911, longitude: 77.671369};

  const [route, setRoute] = React.useState([]);

  const [alternativeRoutes, setAlternativeRoute] = React.useState([]);
  const colors = ["#0000FF","#A2A0A0","#A2A0A0","#A2A0A0","#A2A0A0"];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const polyline = require('@mapbox/polyline');
        const origin = { lat: source_coord.latitude, lng: source_coord.longitude };
        const destination = { lat: destination_coord.latitude, lng: destination_coord.longitude }; 
        const routeCoordinates = await getRouteCoordinate(origin, destination);
        const decoded_routes = polyline.decode(routeCoordinates);
        const convertedCoordinates = decoded_routes.map(([latitude, longitude]) =>
          JSON.parse(`{"latitude": ${latitude}, "longitude": ${longitude}}`)
        );
        console.log(convertedCoordinates);
        setRoute(convertedCoordinates);
      } catch (error) {
        console.error('Error in fetching RouteCoordinates:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const polyline = require('@mapbox/polyline');
        const origin = { lat: source_coord.latitude, lng: source_coord.longitude };
        const destination = { lat: destination_coord.latitude, lng: destination_coord.longitude }; 
        const allRouteCoordinates = await getAlternativeRouteCoordinates(origin, destination);
        var decoded_routes = [];
        for (var i = 0; i < allRouteCoordinates.length; i++) {
          const decoded_route = polyline.decode(allRouteCoordinates[i]);
          decoded_routes.push(decoded_route);
          // console.log("route", i+1, ":", decoded_route);
        }
        const convertedCoordinates = decoded_routes.map(subArray => subArray.map(innerArray => ({
          latitude: innerArray[0],
          longitude: innerArray[1]
        })));
        setAlternativeRoute(convertedCoordinates);
        console.log(convertedCoordinates);
      } catch (error) {
        console.error('Error in fetching alternativeRouteCoordinates:', error);
      }
    };

    fetchData();
  }, []);

  const [source, setSource] = React.useState<string>('');
  const [destination, setDestination] = React.useState<string>('');

  const [marker, setMarker] = React.useState<boolean>(false);

  const handleSubmit = () => {
    if (source.length == 0) { 
      console.log("Source Address REQUIRED.") 
    } else if (destination.length == 0) { 
      console.log("Destination Address REQUIRED.") 
    } else {
      console.log("SOURCE      : ", source);
      console.log("DESTINATION : ", destination);
      setMarker(true);
    }
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$container} style={styles.container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="NavigationScreen.title" style={$title} />
      <Text tx="NavigationScreen.tagLine" style={$tagline} />
      {
        marker 
        ? 
        <MapView 
          style={styles.map} 
          region={mapRegion}
          onRegionChangeComplete={(region) => setMapRegion(region)}
        >
          <Marker coordinate={source_coord}>
            {/* <Callout> <View> <Text>{destination}</Text> </View> </Callout> */}
          </Marker>
          <Marker coordinate={destination_coord}>
            {/* <Callout> <View> <Text>{source}</Text> </View> </Callout> */}
          </Marker>
          {/* <Polyline
            coordinates={route}
            strokeColor="#0000FF"
            strokeWidth={6}
          /> */}
          {alternativeRoutes.map((route, index) => (
            <Polyline
              key={index}
              coordinates={route}
              strokeColor={colors[index]}
              strokeWidth={3}
            />
          ))}
        </MapView>
        :
        <MapView 
          style={styles.map} 
          region={mapRegion}
          onRegionChangeComplete={(region) => setMapRegion(region)}
        /> 
      }
      <KeyboardAvoidingView>
        <View>
          <Text tx="NavigationScreen.sourceInput" style={$inputTitle} />
          <TextInput
            style={styles.input}
            onChangeText={setSource}
            value={source}
            placeholder="Enter Starting point"
          />
        </View>
        <View>
          <Text tx="NavigationScreen.destInput" style={$inputTitle} />
          <TextInput
            style={styles.input}
            onChangeText={setDestination}
            value={destination}
            placeholder="Enter Ending point"
          />
        </View>
        <View>
          <Button
            onPress={handleSubmit}
            title="Get Directions"
            color="#f7c100"
            accessibilityLabel="Submit Source & Destination addresses"
          />
        </View>
        
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
    backgroundColor: "#ded9db",
    color: "#00204f",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: spacing.medium,
  },
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
  marginBottom: "1%",  
  fontWeight: "bold",
}
