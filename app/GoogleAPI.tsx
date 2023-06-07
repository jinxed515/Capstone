import axios from 'axios';
import GOOGLE_MAPS_API_KEY from '../config';

export const getRouteCoordinate = async (origin, destination) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
        origin.lat + ',' + origin.lng
        )}&destination=${encodeURIComponent(destination.lat + ',' + destination.lng)}&key=${GOOGLE_MAPS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.routes[0].overview_polyline.points;
    } catch (error) {
        console.error('Error getting route coordinates:', error);
        throw error;
    }
};
  