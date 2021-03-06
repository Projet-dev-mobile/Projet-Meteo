const API_KEY ='252612108adb37704544e291a81bb62f';

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

  export async function getPrevisionForSevenDaysCity(latitude, longitude) {
    try {
      const myHeaders = new Headers({ 'user-key': API_KEY });
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=fr&exclude=&units=metric&appid=${API_KEY}`;
      console.log(url);
      const response = await fetch(url, { headers: myHeaders });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(`Error with function getMeteoByCity ${error.message}`);
      throw error;
    }
  };