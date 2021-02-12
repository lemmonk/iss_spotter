
const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = (data) => {

  const final = [];
  for (const d in data) {
    
    let t = data[d].risetime * 1000;
    let dateTime = new Date(t).toUTCString();
    let str = `Next pass at ${dateTime} (Pacific Daylight Time) for ${data[d].duration} seconds!`;
    final.push(str);
  }

  return final.join('\n');
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    console.log(printPassTimes(passTimes));
  }).catch((error) => {
    console.log("It didn't work: ", error.message);
  });

