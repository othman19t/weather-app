const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//assign express
const app = express();
const port = process.env.PORT || 3000;

//configuring paths
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const publicPath = path.join(__dirname, "../public");

//assigning paths
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//static route
app.use(express.static(publicPath));

//home route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

//about route
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//help route
app.get("/help", (req, res) => {
  res.render("help", { title: "Help" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }

  geocode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      res.send({
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

// error route
app.get("/help/*", (req, res) => {
  res.render("404", { title: "Error: 404 article is not found!!" });
});

//404 route
app.get("*", (req, res) => {
  res.render("404", { title: "Error: 404 page is not found" });
});

//port listener
app.listen(port, () => {
  console.log(`server is up on port ${port}!!`);
});
