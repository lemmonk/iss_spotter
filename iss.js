/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = callback =>  {
  // use request to fetch IP address from JSON API
  request(`https://api.ipify.org?format=json`, (error, res) => {

     
    if (error) {
      return callback(error, null);
    }

    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${res.body}`;
      callback(Error(msg), null);
      return;
    }


    const data = JSON.parse(res.body);
    // console.log(data.ip);
    return callback(error,data.ip);
  });
};


const fetchCoordsByIP = callback =>  {
  // use request to fetch IP address from JSON API
  let ip = '66.183.29.157';
  request(`https://freegeoip.app/json/${ip}`, (error, res) => {

     
    if (error) {
      return callback(error, null);
    }

    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when attempting fetching coordinates from IP: ${ip}`;
      callback(Error(msg), null);
      return;
    }


    const data = JSON.parse(res.body);
    const coords = {
      latitude: data.latitude,
      longitude: data.longitude,
    };
    
    return callback(error,coords);
  });
};


const fetchISSFlyOverTimes = callback => {
  let coords = { latitude: 48.9333, longitude: -125.5167 };
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, res) => {

     
    if (error) {
      return callback(error, null);
    }

    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when attempting fetching ISS data from coordinates: lat: ${coords.latitude}, lng: ${coords.longitude}`;
      callback(Error(msg), null);
      return;
    }


    const data = JSON.parse(res.body);
   
    return callback(error,data.response);
  });
};



module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
};
