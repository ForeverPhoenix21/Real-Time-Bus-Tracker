mapboxgl.accessToken =
  "pk.eyJ1IjoiZGRpYXo4NiIsImEiOiJja3RrZ2Rqd3kxbGs0MzBudHBzZGE3ZjVsIn0.JvHu5nk1wC_ngPgBwFpV6A";

// Code to create a new map
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/ddiaz86/cktlph4ol05pe17mzxwx6e1ub",
  center: [-71.104081, 42.3655541],
  pitch: 40, // Map tilt
  bearing: -20,
  zoom: 12,
});

markers = [];
var locations;

// get bus data
async function run() {
  locations = await getBusLocations();
  setTimeout(run, 5000);
}

// Request bus data from MBTA
async function getBusLocations() {
  const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

run();

// Creates a marker for each bus
setTimeout(() => {
  for (let i = 0; i < locations.length; i++) {
    //Adding the styles for "marker" located in styles.css
    var el = document.createElement("div");
    el.className = "marker";
    markers.push(
      new mapboxgl.Marker(el).setLngLat([-71.092761, 42.357575]).addTo(map)
    );
  }
}, 2000);

// Updates the bus locations every 1 seconds
function move() {
  setTimeout(() => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setLngLat([
        locations[i].attributes.longitude,
        locations[i].attributes.latitude,
      ]);
    }
    move();
  }, 1000);
}
