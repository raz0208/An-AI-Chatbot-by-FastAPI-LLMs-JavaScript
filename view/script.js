const inputMessage = document.getElementById("inputMessage"); // Get the input field for the message
const sendButton = document.getElementById("sendBtn"); // Get the send button
const chatbox = document.getElementById("chatbox"); // Get the container where chat messages will be displayed

// Function to create a chat message element
function appendMessage(text, sender) {
    const messageElement = document.createElement("div"); // Create a new div element for the message
    messageElement.classList.add("message", sender); // Add a class for styling

    const textBubble = document.createElement("span"); // Create a span for the text bubble
    textBubble.classList.add("text-bubble"); // Add a class for styling the text bubble
    textBubble.textContent = text; // Set the text content of the bubble to the message

    if (sender === "bot") {
        const botIcon = document.createElement("img"); // Create an img element for the bot icon
        botIcon.src = "logo.png"; // Set the source of the bot icon
        botIcon.alt = "RavinTech Bot Icon"; // Set the alt text for the bot icon
        botIcon.classList.add("bot-icon"); // Add a class for styling the bot icon
        messageElement.appendChild(botIcon); // Append the bot icon to the message element
    }

    messageElement.appendChild(textBubble); // Append the text bubble to the message element
    chatbox.appendChild(messageElement); // Append the message element to the chat container
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom of the chat container
}

// Create send message function
async function sendMessage() {
    const message = inputMessage.value.trim(); // Get the message from the input field and trim whitespace
    
    if (!message) return; // If the message is empty, do nothing
    appendMessage(message, "user"); // Append the user's message to the chat
    inputMessage.value = ''; // Clear the input field
    sendButton.disabled = true; // Disable the send button while waiting for a response


    // Use try-catch block to handle errors when sending the message and receiving a response 
    try {
        const response = await fetch("http://127.0.0.1:8000/chat", { // Send a POST request to the /chat endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Set the content type to JSON
            },
            body: JSON.stringify({ message }) // Send the message as a JSON object in the request body
        });

        if (!response.ok) { // If the response is not OK, throw an error
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // Parse the response as JSON
        appendMessage(data.message, "bot"); // Append the bot's response to the chat
    } catch (error) {
        console.error("Error sending message:", error); // Log any errors to the console
        appendMessage("Sorry, something went wrong. Please try again.", "bot"); // Append an error message to the chat
    } finally {
        sendButton.disabled = false; // Re-enable the send button after the response is received or an error occurs
        inputMessage.focus(); // Focus the input field for the next message
    }

}

// Event listener for the send button
sendButton.addEventListener("click", sendMessage);

// Event listener for pressing Enter key in the input field
inputMessage.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default action of the Enter key
        sendMessage(); // Call the sendMessage function
    }
})