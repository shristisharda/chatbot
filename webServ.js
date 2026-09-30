import express from 'express'; // getting express
import bodyParser from 'body-parser'; //bodyParser hepls understand incoming json
import {
  createServer
} from "node:http"
import {
  askGemini
} from './gemini.js';
import {
  Server
} from 'socket.io';

const app = express(); // creates express app

//  Create an HTTP server instance using the Express app

const server = createServer(app)

// Attach Socket.IO to the HTTP server with CORS configured

const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this to match your client's URL in production
    methods: ["GET", "POST", "PUT", "UPDATE", "DELETE"]
  }
});

// 4. Handle real-time WebSocket events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listening for a custom event from the client
  socket.on('user_message', async (userInput) => {
    console.log('user_message received:', userInput);

    const AiResponse = await askGemini(userInput);

    // Broadcast the message back to all connected clients
    io.emit('ai_response', AiResponse);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});


app.use(bodyParser.json());

app.use(express.static('public')); // public folder files can be used by browser now

app.get('/chat', (req, res) => { // browser sends req to /chat
  console.log("process.cwd()", process.cwd())

  res.sendFile(process.cwd() + '/views/chat.html');

});

server.listen(3000, () => { // server starts
  console.log('Server runnningg at http://localhost:3000');
});