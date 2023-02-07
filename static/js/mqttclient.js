const HOST = "mqtt.tekniikka.seamk.fi";
const PORT = 9001;
const CLIENTID = "webapp";
const TOPIC = "seamkiot/location";

const button = document.getElementById("mqtt-status");
button.className += " btn-danger";

client = new Paho.MQTT.Client(HOST, Number(PORT), CLIENTID);
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({onSuccess:onConnect});

function onConnect() {
    button.className = button.className.replace(" btn-danger", " btn-success");
    client.subscribe(TOPIC);
};

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        button.className = button.className.replace(" btn-success", " btn-danger");
        console.log("onConnectionLost: " + responseObject.errorMessage);
    }
};

function onMessageArrived(message) {
    let payload = JSON.parse(message.payloadString);
    setMarkerLocation(payload);
};