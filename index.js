// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     // console.log("It didn't work!" , error);
//     return;
//   }

//   // console.log('It worked! Returned IP:' , ip);
// });

//66.183.29.157

// fetchCoordsByIP((error, data) => {
//   if (error) {
//      console.log("It didn't work!" , error);
//     return;
//   }

//    console.log('It worked! Returned Coords:' , data);
// });


fetchISSFlyOverTimes( (error, data) =>  {
  if (error) {
     console.log("It didn't work!" , error);
    return;
  }

   console.log('It worked! Local ISS Data:' , data);
});