// Center location of the Frami A building.
const homeLat = 62.788825;
const homeLon = 22.822326;
// Latitude and longitude bounds of the SVG images.
const boundsFloor1 = [[62.7882787, 22.8203362], [62.7893180, 22.8242007]];
const boundsFloor2 = [[62.7882919, 22.8203583], [62.7893164, 22.8241678]];
// SVG image size.
const svgWidth = 1469;
const svgHeight = 864;

const map = L.map(
    "map",
    {
        center: [homeLat, homeLon],
        crs: L.CRS.EPSG3857,
        minZoom: 15,
        maxZoom: 23,
        zoom: 18,
        zoomControl: true,
        preferCanvas: false
    }
);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker = L.marker([0, 0], {});


function gotoHome() {
    let location = L.latLng(homeLat, homeLon);
    let zoomLevel = 19;
    map.setView(location, zoomLevel);
};


function setMarkerLocation(payload) {
    let lat = payload.lat;
    let lon = payload.lon;
    let location = L.latLng(lat, lon);
    marker.setLatLng(location).addTo(map);
    showLocation(lat, lon);
    if (payload.floor != currentfloor) {
        currentfloor = payload.floor;
        showFloorplan(currentfloor);
    }
};


function showLocation(lat, lon) {
    const button = document.getElementById("location");
    const icon = '<i class="fa-solid fa-location-pin"></i>';
    button.innerHTML = `${icon} ${lat.toFixed(9)}°, ${lon.toFixed(9)}°`;
};


function showFloorplan(floorNumber) {
    const btnFloor1 = document.getElementById("floor1");
    const btnFloor2 = document.getElementById("floor2");
    btnFloor1.className = btnFloor1.className.replace(" active", "");
    btnFloor2.className = btnFloor2.className.replace(" active", "");
    if (floorNumber == 1) {
        btnFloor1.className += " active";
    } else if (floorNumber == 2) {
        btnFloor2.className += " active";
    }

    let bounds;
    if (floorNumber == 1) {
        bounds = boundsFloor1;
    } else if (floorNumber == 2) {
        bounds = boundsFloor2;
    }

    const svgElement = document.getElementById("framiA");
    svgElement.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
    svgElement.src = `/static/img/framiA${floorNumber}.svg`;
    let image = L.svgOverlay(svgElement, bounds, {});
    image.addTo(map);
    marker.addTo(map);
};

currentfloor = 1;
showFloorplan(currentfloor);
