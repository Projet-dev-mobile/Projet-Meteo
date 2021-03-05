const API_KEY ='8fb1009bfe81c1193f9e4d38777b9b34';

export async function getCurrentWeahterByCity(city) {
    try {
      const myHeaders = new Headers({ 'user-key': API_KEY });
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url, { headers: myHeaders });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(`Error with function getMeteoByCity ${error.message}`);
      throw error;
    }
  };

  export async function getPrevisionForSevenDaysCity(city) {
    try {
      const myHeaders = new Headers({ 'user-key': API_KEY });
      const url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${API_KEY}`;
      const response = await fetch(url, { headers: myHeaders });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(`Error with function getMeteoByCity ${error.message}`);
      throw error;
    }
  };