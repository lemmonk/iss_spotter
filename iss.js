
const request = require('request');

const fetchMyIP = callback => {
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
    return callback(error, data.ip);
  });
};






const fetchCoordsByIP = (ip, callback) => {
  // use request to fetch IP address from JSON API
  // ip = '66.183.29.157';
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

    return callback(error, coords);
  });
};


const fetchISSFlyOverTimes = (coords, callback) => {
  // let coords = { latitude: 48.9333, longitude: -125.5167 };
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

    return callback(error, data.response);
  });
};

const nextISSTimesForMyLocation = callback => {

  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    // console.log('It worked! Returned IP:', ip);

    return fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }

      // console.log('It worked! Returned Coords:', data);

      return fetchISSFlyOverTimes(data, (error, data) => {
        if (error) {
          console.log("It didn't work!", error);
          return;
        }

       
        const final = [];
        for (const d in data) {
          
          let t = data[d].risetime * 1000;
          let dateTime = new Date(t).toUTCString();
          let str = `Next pass at ${dateTime} (Pacific Daylight Time) for ${data[d].duration} seconds!`;
          final.push(str);
        }

        const e = final.join('\n');
       
        return callback(error, e);
      });
    });
  });


};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
