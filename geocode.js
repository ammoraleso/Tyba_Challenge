const axios = require('axios');

const geoCode = async (address) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYW1tb3JhbGVzbyIsImEiOiJjazkzN211MXUwMnBlM2VsMGd4Z2t1a3pqIn0.yQ9A-qdaskKNvF8uApW2DA`;
  const response = await axios.get(url);
  return {
    latitude: response.data.features[0].center[1],
    longitude: response.data.features[0].center[0],
    location: response.data.features[0].place_name,
  };
};

module.exports = geoCode;
