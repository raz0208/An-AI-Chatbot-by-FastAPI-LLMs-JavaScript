from fastapi import FastAPI
from pydantic import BaseModel # Use to check the data type of the input
from groq import Groq # Import the Groq library to interact with the LLMs
from dotenv import load_dotenv # Load environment variables from a .env file
import os
from fastapi.middleware.cors import CORSMiddleware # Import CORS middleware to handle cross-origin requests

load_dotenv() # Load the environment variables from the .env file

# Initialize the Groq client with the API key from the environment variable
client = Groq(
        api_key = os.environ.get("GQOQ_API_KEY")
    )

# Define the data model for the request body of the chat endpoint
class chatRequest(BaseModel): 
    message: str

# Initialize the FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
    allow_credentials=True,
)

# Function to get a response from the bot based on the input message
async def get_response_from_bot(message: str) -> str:
    # Use the Groq client to create a response based on the input message and the specified model
    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": message,
            }
        ],
        model="llama-3.3-70b-versatile",
        stream=False,
    )
    # Return the content of the response message
    return response.choices[0].message.content 

# Define the endpoint for the chat API: 
# 1) it will receive a POST request,
# 2) the request body will be validated against the chatRequest model, 
# 3) the function will return a response with the same message
@app.post("/chat")
async def chat(request: chatRequest):
    response_message = await get_response_from_bot(request.message) # Pass the message to the bot function and get the response
    return {"message": response_message} # Return the response as a JSON object