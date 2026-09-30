const chatForm = document.getElementById("chatForm") //finds form from index.html
const messageInput = document.getElementById('messageInput'); // finds inputBox ID
const chatEndOverlay = document.getElementById('chatEndOverlay'); // finds chatEndOverlay ID
const newChatBtn = document.getElementById('newChatBtn'); // gets new chat btn ID  

const socket = io();
socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Diconnected:", socket.id);
  alert("Socket disonnected");
});

// Listening to ai response from server
socket.on("ai_response", (data) => {
  console.log("ai_response from server:", data);
  addAIResponse(data);
});


chatForm.addEventListener('submit', function (event) { //listen form submission
  event.preventDefault(); // prevents browsers default form submission process

  const userMessage = messageInput.value; // gets userMsg

  if (userMessage.trim() === '') { // removes empty spaces
    return;
  }

  // Adding user message to list
  addUserMessage(messageInput.value);

  // clearing the user input box
  resetInput()

});

// Start New Chat button when clicked
newChatBtn.addEventListener('click', startNewChat);

function startNewChat() {
  chatEndOverlay.style.display = 'none';   // Remove blurred overlay
  newChatBtn.style.display = 'none';  // Hide Start New Chat button
  document.getElementById('chatMessages').innerHTML = '';  // Clear old messages
  messageInput.disabled = false;    // Enable input
  messageInput.placeholder = 'Type your message...';  // Reset placeholder
  chatForm.style.cursor = 'default';  // Reset cursor
}

function showChatEnded() {     // after typing BYE, chat ends, overlay appears
  chatEndOverlay.style.display = 'flex';
  messageInput.disabled = true;
  newChatBtn.style.display = 'block';
}

function resetInput() {
  messageInput.value = ''; // empties inputMsg
}

function addUserMessage(userInput) {
  // If user says bye, don't send it to Gemini
  if (userInput.trim().toLowerCase() === 'bye') {
    showChatEnded();
  } else {
    socket.emit("user_message", userInput);   // Sending data to server to generate ai response
    messageInput.disabled = true;   // blocking the user input temporarily
    messageInput.placeholder = "Generating AI response...";  // creates temporary placeholder
    chatForm.style.cursor = "not-allowed"; // blocks cursor style
  }

  // adding user input to chatMessages
  const chatListContainer = document.getElementById("chatMessages")
  const message = document.createElement('div'); // Create new message
  message.classList.add('message', 'user-message');
  message.textContent = userInput;
  chatListContainer.appendChild(message);
}

function addAIResponse(aiReponse = "This is dummy ai generated response mimic") {
  const chatListContainer = document.getElementById("chatMessages")
  const message = document.createElement('div'); // Create new message
  message.classList.add('message', 'ai-message');
  message.textContent = aiReponse;
  chatListContainer.appendChild(message);

  messageInput.disabled = false;
  messageInput.placeholder = "Type your message...";
  chatForm.style.cursor = "default";
}