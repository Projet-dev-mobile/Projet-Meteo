const API_KEY = 'AIzaSyBvuh71P6SLjWiqJTrIUeLWws_TUJMDocg';

export async function getGeocodingByCoords(latitude,longitude) {
    try {
      const myHeaders = new Headers({ 'user-key': API_KEY });
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
      const response = await fetch(url, { headers: myHeaders });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(`Error with function getGeocodingByCoords ${error.message}`);
      throw error;
    }
  };