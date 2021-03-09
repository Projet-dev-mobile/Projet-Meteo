const API_KEY = 'AIzaSyBvuh71P6SLjWiqJTrIUeLWws_TUJMDocg';

export async function getGeocodingByCoords(latitude,longitude) {
    try {
      const myHeaders = new Headers({ 'user-key': API_KEY });
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
      console.log(url);
      const response = await fetch(url, { headers: myHeaders });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(`Error with function getGeocodingByCoords ${error.message}`);
      throw error;
    }
};

export async function getGeocodingByCity(city) {
  try {
    const myHeaders = new Headers({ 'user-key': API_KEY });
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${API_KEY}`;
    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getGeocodingByCity ${error.message}`);
    throw error;
  }
};  

export async function getGeocodingByCityPostalAndCountry(city, postal, country) {
  try {
    const myHeaders = new Headers({ 'user-key': API_KEY });
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${postal},+${country}&key=${API_KEY}`;
    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getGeocodingByCityPostalAndCountry ${error.message}`);
    throw error;
  }
};  
