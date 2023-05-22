import axios from 'axios';
import API_KEY from '../config';

export const getRouteCoordinates = async (origin, destination) => {
    try {
        const url = `https://api.tomtom.com/routing/1/calculateRoute/${encodeURIComponent(
        origin.lat + ',' + origin.lng
        )}:${encodeURIComponent(destination.lat + ',' + destination.lng)}/json?travelMode=pedestrian&key=${API_KEY}`;
        const response = await axios.get(url);
        return response.data.routes[0].legs[0].points;
    } catch (error) {
        console.error('Error getting route coordinates:', error);
        throw error;
    }
};

export const searchPlaces = async (query) => {
    try {
        const url = `https://api.tomtom.com/search/2/search/${encodeURIComponent(
        query
        )}.json?key=${API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error searching places:', error);
        throw error;
    }
};  

