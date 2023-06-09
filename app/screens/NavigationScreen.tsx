import React, { FC, useState, useEffect } from "react"
import { TextStyle, ViewStyle, StyleSheet, View, Dimensions, Button, TextInput, KeyboardAvoidingView, Platform } from "react-native"
import { Card, Screen, Text, TextField } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import { getRouteCoordinate, getAlternativeRouteCoordinates, fetchPlaceDetails } from "../GoogleAPI"
import { isCoordinateSafe, routeRating, safetyRatingRoutes } from "app/SafetyScore"
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


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
        // console.log(convertedCoordinates);
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
        const sortOrder = safetyRatingRoutes(convertedCoordinates);
        convertedCoordinates.sort((a, b) => {
          const indexA = sortOrder[convertedCoordinates.indexOf(a)];
          const indexB = sortOrder[convertedCoordinates.indexOf(b)];
          return indexB - indexA;
        });
        setAlternativeRoute(convertedCoordinates);      // SAFEST route in the front
        // console.log(convertedCoordinates);
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
        <View style = {styles.searchContainer}>
          <Text preset="bold" tx="NavigationScreen.sourceInput" style={$inputTitle} />
          <GooglePlacesAutocomplete
            styles = {{textInput: styles.input}}
            placeholder='Enter Starting point'
            onPress={(data, details = null) => {
              console.log("place id (SOURCE):", data.place_id);
              // console.log(fetchPlaceDetails(data.place_id));
            }}
            query={{
              key: 'AIzaSyCvZ7sW6G28tDmOE4RX7h9-PGnI5M7WkFY',
              language: 'en',
            }}
          />

          <Text preset="bold" tx="NavigationScreen.destInput" style={$inputTitle} />
          <GooglePlacesAutocomplete
            styles = {{textInput: styles.input}}
            placeholder='Enter Ending point'
            onPress={(data, details = null) => {
              console.log("place id (DESTINATION):", data.place_id);
              // console.log(fetchPlaceDetails(data.place_id));
            }}
            query={{
              key: 'AIzaSyCvZ7sW6G28tDmOE4RX7h9-PGnI5M7WkFY',
              language: 'en',
            }}
          />
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
    paddingTop: spacing.large + spacing.extraLarge,
    paddingHorizontal: spacing.large,
    // marginBottom: spacing.large + spacing.extraLarge
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
  searchContainer: {
    position: "absolute",
    width: "100%",
    shadowColor: "transparent",
    elevation: 4,
    padding: 8,
    marginTop: spacing.small
  },
});

const $container: ViewStyle = {
  flex: 1, 
  // justifyContent: 'center',
  height:"100%",
  paddingTop: spacing.large,
  paddingHorizontal: spacing.large,
}

const $title: TextStyle = {
  // marginBottom: spacing.small,
  fontSize: spacing.large + spacing.tiny
}

const $tagline: TextStyle = {
  fontSize: 14,
  marginBottom: spacing.large,
}

const $inputTitle: TextStyle = {
  marginBottom: "1%",  
  // fontWeight: "bold",
}
