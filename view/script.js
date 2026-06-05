const inputMessage = document.getElementById("inputMessage"); // Get the input field for the message
const sendButton = document.getElementById("sendButton"); // Get the send button
const chatContainer = document.getElementById("chatContainer"); // Get the container where chat messages will be displayed

// Function to create a chat message element
function appendMessage(text, sender) {
    const messageElement = document.createElement("div"); // Create a new div element for the message
    messageElement.classList.add("message", sender); // Add a class for styling

    const textBubble = document.createElement("span"); // Create a span for the text bubble
    textBubble.classList.add("text-bubble"); // Add a class for styling the text bubble
    textBubble.textContent = text; // Set the text content of the bubble to the message

    messageElement.appendChild(textBubble); // Append the text bubble to the message element
    chatContainer.appendChild(messageElement); // Append the message element to the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom of the chat container
}