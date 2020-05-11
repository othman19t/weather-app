const request = require("postman-request"); // npm i postman-request
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=232f2ce0d22f29b4ea1e3dbf6a71e41d&query=${latitude},${longitude}&units=f`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather serves", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions} it is currently ${body.current.temperature} Fahrenheit in ${body.location.country},  ${body.location.region}, ${body.location.name},it feels like ${body.current.feelslike} and there is a ${body.current.precip}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
