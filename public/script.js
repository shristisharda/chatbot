const chatForm = document.getElementById("chatForm") //finds form from index.html
const messageInput = document.getElementById('messageInput'); // finds inputBox

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

function resetInput() {
  messageInput.value = ''; // empties inputMsg
}

function addUserMessage(userInput) {
  // Sending data to server to generate ai response
  socket.emit("user_message", userInput);

  // blocking the user input temporarily
  messageInput.disabled = true;

  // adding user input to chatlist
  const chatListContainer = document.getElementById("chatList")
  const message = document.createElement('div'); // Create new message
  message.classList.add('message', 'user-message');
  message.textContent = userInput;
  chatListContainer.appendChild(message);
}

function addAIResponse(aiReponse = "This is dummy ai generated response mimic") {
  const chatListContainer = document.getElementById("chatList")
  const message = document.createElement('div'); // Create new message
  message.classList.add('message', 'ai-message');
  message.textContent = aiReponse;
  chatListContainer.appendChild(message);

  messageInput.disabled = false;
}