// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

//USER DB
const userColorDB = [];

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

//helper function for the userCount
function sendUserCount() {
  wss.clients.forEach(function each(client) {
    if (client.readyState && WebSocket.OPEN) {
      userCnt = {clients : wss.clients.size}
      client.send(JSON.stringify(userCnt));
    }
  });
}

function colorAssign() {
  const colorArr = ["#FF0000","#FFA500","#00FF00","#0000FF"];
  let userN = wss.clients.size % 4;
  let content = {'color' : colorArr[userN]};
  return colorArr[userN];
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  console.log('Client connected');

  let userColor = colorAssign();

  //Store user-color association in database //I JUST LIKE TO COLLECT DATA!!!!
  let userUUID = uuidv4();
  userColorDB.push({'user' : userUUID , 'color': userColor})

  sendUserCount();

  ws.on('message', function incoming(data) {

    message = JSON.parse(data);
    let messageUUID = uuidv4();
    message.id = messageUUID;
    message.userId = userUUID; //Useful to debug/test that the same user keep the color
    message.color = userColor;
    console.log(message)

    switch(message.type) {
      case "postMessage":

        //send as it is to the sender first
        ws.send(JSON.stringify(message));
        //broadcast to ALL after changing the type
        wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState && WebSocket.OPEN) {
            message.type = "incomingMessage";
            client.send(JSON.stringify(message));
          }
        });
        break;



      case "postNotification":
        //send as it is to the sender first
        ws.send(JSON.stringify(message));
        //broadcast to ALL after changing the type
        wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState && WebSocket.OPEN) {
            message.type = "incomingNotification";
            client.send(JSON.stringify(message));
          }
        });
        break;

      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }

  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    sendUserCount();
  });
});
