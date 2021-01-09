const API_KEY ='8fb1009bfe81c1193f9e4d38777b9b34';

export async function getMeteoByCityAndStateCode(city,state_code) {
    try {
      const myHeaders = new Headers({ 'user-key': API_KEY });
      const url = `api.openweathermap.org/data/2.5/weather?q=${city},${state_code}&appid=${API_key}`;
      const response = await fetch(url, { headers: myHeaders });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(`Error with function getMeteoByCity ${error.message}`);
      throw error;
    }
  };