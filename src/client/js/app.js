const btn = document.getElementById("submit-btn");
const dateIn = document.getElementById("date-input");

const weatherKey = "76b1684b51784139ab1401e82eba4a83";
const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?`;
const pixabayKey = "17291093-72b75dc5b12a6e0b7ec9ed85f";

(() => {
  const today = new Date();
  const dd = String(today.getDate()+15).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const minDate = new Date().toISOString().substr(0, 10);
  const maxDate = yyyy + '-' + mm + '-' + dd;
  dateIn.setAttribute('max', maxDate)
  dateIn.setAttribute('min', minDate)
})()


btn.addEventListener("click", hitIt) 

function hitIt (e) {
  e.preventDefault();
  let city = document.getElementById("city").value;
  let travelDate = dateIn.value;

  Client.checkInput(city);

  getCity(city)
    .then((cityData) => {
      const cityLat = cityData.geonames[0].lat;
      const cityLong = cityData.geonames[0].lng;
      const weatherData = getWeather(cityLat, cityLong, travelDate);
      return weatherData;
    })
    .then((weatherData) => {
      const newData = postData("http://localhost:8080/add", { tempMax: weatherData.max_temp, tempMin:weatherData.min_temp, weatherIcon:weatherData.weather.icon, location: city });      
      return newData
    })
    .then((newData) => {
      changeContent(newData);
    })
}



const getCity = async (city) => {
  const respone = await fetch(`http://api.geonames.org/searchJSON?q=${city}&maxRows=3&username=abdalrhman_samy`);
  try {
    const cityData = await respone.json();
    return cityData;
  } catch (error) {
    console.log(error);
  }
};

const getWeather = async (cityLat, cityLong, date) => {
  const req = await fetch(`${weatherURL}&lat=${cityLat}&lon=${cityLong}&key=${weatherKey}`);
  try {
    const weatherData = await req.json();    
    for (let i=0; i<16; i++){
      if (weatherData.data[i].datetime === date){     
        console.log(weatherData.data[i]);
           
          return weatherData.data[i]
          }
        }
  } catch (error) {
    console.log("error", error);
  }
};

const postData = async (url = '', data = {}) => {
  const postRequest = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  });
  try {
      const newData = await postRequest.json();
      return newData;
  }
  catch (error) {
      console.log('Error', error);
  }
}

async function changeContent (allData) {
  const request = await fetch(`https://pixabay.com/api/?key=${pixabayKey}&q=${allData.location}+city&image_type=photo`);
  
  try {
    const image = await request.json();  
    document.getElementById('pic').style.display = 'block'
    document.getElementById('pic').setAttribute('src', image.hits[0].webformatURL)
    document.getElementById('weather-icon').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${allData.icon}.png`)
    document.getElementById('weather-icon').style.display = 'block'    
    document.getElementById('temp-max').innerHTML = `Highest temperature is: ${allData.tempMax}C`
    document.getElementById('temp-min').innerHTML = `Lowest temperature is: ${allData.tempMin}C`
    document.getElementById('op-div').scrollIntoView({behavior: "smooth"})  

  } catch (error) {
    console.log("error", error);
  }
}
export {hitIt, changeContent}