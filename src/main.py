from fastapi import FastAPI
from pydantic import BaseModel # Use to check the data type of the input

class chatRequest(BaseModel): # Define the data model for the request body
    message: str

app = FastAPI() # Initialize the FastAPI app

# Function to get a response from the bot based on the input message
def get_response_from_bot(message: str) -> str:
    # For simplicity, we will just return a fixed response based on the input message
    if "hello" in message.lower():
        return "Hello! How can I help you today?"
    elif "how are you" in message.lower():
        return "I'm a bot, so I don't have feelings, but I'm here to help you!"
    else:
        return "Sorry, I didn't understand that. Can you please rephrase?"

# Define the endpoint for the chat API: 
# 1) it will receive a POST request,
# 2) the request body will be validated against the chatRequest model, 
# 3) the function will return a response with the same message
@app.post("/chat")
def chat(request: chatRequest):
    response_message = get_response_from_bot(request.message) # Pass the message to the bot function and get the response
    return {"message": response_message} # Return the response as a JSON object