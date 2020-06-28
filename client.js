"use strict";

// Get our hostname

var myHostname = "lateral-air.glitch.me";
if (!myHostname) {
  myHostname = "localhost";
}
log("Hostname: " + myHostname);

// WebSocket chat/signaling channel variables.

var connection = null;
var clientID = 0;
var served = 0;
var myUsername = null;
var targetUsername = null;      // To store username of other peer
var myPeerConnection = null;    // RTCPeerConnection
var sendChannel = null;    // RTCDataChannel
var receiveChannel = null;
var transceiver = null;         // RTCRtpTransceiver
var webcamStream = null;        // MediaStream from webcam

var requeston = 0;
if (location.hash!=""){requeston = 1;
console.log(requeston);}
// Output logging information to console.

function log(text) {
  var time = new Date();

  console.log("[" + time.toLocaleTimeString() + "] " + text);
}

//SIMPLE TING EnCrypT DeCRYpt

function enc (message, nonce, target){
  message = nacl.util.decodeBase64(message.slice(23,message.length));
 
nacl.box(message, nonce, target, privk)}

function denc (message, nonce){
nacl.box.open(message, nonce, nacl.util.decodeBase64(window.location.hash.substr(1)), privk)
}

// Output an error message to console.

function log_error(text) {
  var time = new Date();

  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}

// Send a JavaScript object by converting it to JSON and sending
// it as a message on the WebSocket connection.

function sendToServer(msg) {
  var msgJSON = JSON.stringify(msg);

  log("Sending '" + msg.type + "' message: " + msgJSON);
  connection.send(msgJSON);
}

// Called when the "id" message is received; this message is sent by the
// server to assign this login session a unique ID number; in response,
// this function sends a "username" message to set our username for this
// session.
function setUsername() {
  myUsername = document.getElementById("name").value;

  sendToServer({
    name: myUsername,
    date: Date.now(),
    id: clientID,
    type: "username"
  });
}

// Reconnect

function reconnect(){connect();}

// Open and configure the connection to the WebSocket server.

function connect() {
  var serverUrl;
  var scheme = "ws";

  // If this is an HTTPS connection, we have to use a secure WebSocket
  // connection too, so add another "s" to the scheme.

  if (document.location.protocol === "https:") {
    scheme += "s";
  }
  
  // Build the URL of the WebSocket server. For Glitch, it's the same
  // as the web server. In other instances, you may need to add
  // ":<port number>".
  
  serverUrl = "wss" + "://" + myHostname;

  log(`Connecting to server: ${serverUrl}`);
  connection = new WebSocket(serverUrl, "json");

  
   connection.onclose = function(evt) {
console.log(evt);
    console.log("closed & reopening");
if (served == 0){
     reconnect()}
  };

  connection.onerror = function(evt) {
    console.dir(evt);
  }

  connection.onmessage = function(evt) {
    var chatBox = document.querySelector(".chatbox");
    var text = "";
    var msg = JSON.parse(evt.data);
    log("Message received: ");
    console.dir(msg);
    var time = new Date(msg.date);
    var timeStr = time.toLocaleTimeString();

    switch(msg.type) {
      case "id":
        clientID = msg.id;
        setUsername();

        break;

      case "username":
        text = "<b>User <em>" + msg.name + "</em> signed in at " + timeStr + "</b><br>";
        break;

  case "SUCCESS":
if (requeston==1){        
tryAgain();}
        break;

      case "message":
if  (msg.text=="request") {serveanddance(msg.name, Date.now())
 text = "served " + msg.name + " at " + timeStr + "<br>"}
else {
        text = "(" + timeStr + ") <b>" + msg.name + "</b>: " + msg.text + "<br>";
if (requeston==1){ 
document.write("<iframe src=" + msg.text + "  width='100%' height='100%' frameBorder='0'>BROWSER NOT SUPPORTED</iframe>");
requeston = 0;
served = 1;}}
        break;

      case "rejectusername":
        myUsername = msg.name;
        text = "<b>Your username has been set to <em>" + myUsername +
          "</em> because the name you chose is in use.</b><br>";
        break;

      case "userlist":      // Received an updated user list
        handleUserlistMsg(msg);
        break;

      // Signaling messages: these messages are used to trade WebRTC
      // signaling information during negotiations leading up to a video
      // call.

      case "video-offer":  // Invitation and offer to chat
        handleVideoOfferMsg(msg);
        break;

      case "video-answer":  // Callee has answered our offer
        handleVideoAnswerMsg(msg);
        break;

      case "new-ice-candidate": // A new ICE candidate has been received
        handleNewICECandidateMsg(msg);
        break;

      case "hang-up": // The other peer has hung up the call
        handleHangUpMsg(msg);
        break;

      // Unknown message; output to console for debugging.

      default:
        log_error("Unknown message received:");
        log_error(msg);
    }

    // If there's text to insert into the chat buffer, do so now, then
    // scroll the chat panel so that the new text is visible.

    if (text.length) {
      chatBox.innerHTML += text;
      chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
    }
  };
}



// Handles a click on the Send button (or pressing return/enter) by
// building a "message" object and sending it to the server.
function handleSendButton() {
  var msg = {
    text: document.getElementById("text").value,
    target: document.getElementById("user").value,
    type: "message",
    id: clientID,  
    date: Date.now()
  };
  sendToServer(msg);
  document.getElementById("text").value = "";
}

//Function to request page
function tryAgain(){
if (location.hash!=""){
var msg = {
    text: "request",
    target: window.location.hash.substr(1),
    type: "message",
    id: clientID,  
    date: Date.now()
  };
  sendToServer(msg);
} return;}

//Function to serve page
function serveanddance(name,time){
var ttt = document.getElementById("output").innerHTML;
var msg = {
    text: ttt,
    target: name,
    type: "message",
    id: clientID,  
    date: time
  };
  sendToServer(msg);
}

//FunctiontoconvertdatatoBLOB

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

// Handler for keyboard events. This is used to intercept the return and
// enter keys so that we can call send() to transmit the entered text
// to the server.
function handleKey(evt) {
  if (evt.keyCode === 13 || evt.keyCode === 14) {
    if (!document.getElementById("send").disabled) {
      handleSendButton();
    }
  }
}

// Create the RTCPeerConnection which knows how to talk to our
// selected STUN/TURN server and then uses getUserMedia() to find
// our camera and microphone and add that stream to the connection for
// use in our video call. Then we configure event handlers to get
// needed notifications on the call.

