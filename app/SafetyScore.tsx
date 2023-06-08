import { computeDestinationPoint, getDistance } from 'geolib';
import data from "../app/data/streetlight_locations.json";

export const deltaCoordinates = (lat, lon, distance) => {
    // Calculate the coordinates of points in four directions
    const northPoint = computeDestinationPoint({ latitude: lat, longitude: lon }, distance, 0);
    const southPoint = computeDestinationPoint({ latitude: lat, longitude: lon }, distance, 180);
    const eastPoint = computeDestinationPoint({ latitude: lat, longitude: lon }, distance, 90);
    const westPoint = computeDestinationPoint({ latitude: lat, longitude: lon }, distance, 270);

    // Print the coordinates
    console.log('North Point:', northPoint.latitude, northPoint.longitude);
    console.log('South Point:', southPoint.latitude, southPoint.longitude);
    console.log('East Point:', eastPoint.latitude, eastPoint.longitude);
    console.log('West Point:', westPoint.latitude, westPoint.longitude);
}

export const distanceCoordinates = (point1, point2) => {
    return getDistance(point1, point2);
}

export const isCoordinateSafe = (coordinate) => {
    return data.some(item => {
        return distanceCoordinates(coordinate, item) < 20;
    });
}

export const routeRating = (route) => {
    return route.filter(isCoordinateSafe).length;
}

export const safetyRatingRoutes = (routes) => {
    const length = routes.length;
    let result = Array(length).fill(0);

    for(var i = 0; i < length; i++) {
        result[i] = routeRating(routes[i]);
    }

    console.log(result);
    return result;
}