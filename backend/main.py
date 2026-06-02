from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from deep_translator import GoogleTranslator
import requests
import pyttsx3

app = FastAPI()

# Allow React frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# This defines what the incoming request looks like
class UserMessage(BaseModel):
    message: str

def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

@app.post("/chat")
async def chat(user_message: UserMessage):
    hindi_input = user_message.message

    # Step 1: Translate Hindi → English
    english_input = GoogleTranslator(source='hi', target='en').translate(hindi_input)

    # Step 2: Send to Llama3.2 via Ollama
    response = requests.post("http://localhost:11434/api/generate", json={
        "model": "llama3.2:3b",
        "prompt": english_input,
        "system": "You are Vidur, the wisest minister from the Mahabharata. Answer every question using the teachings and wisdom of the Bhagavad Gita. Be thoughtful, calm, and deeply wise in your responses.",
        "stream": False
    })

    english_reply = response.json()["response"]

    # Step 3: Translate English → Hindi
    hindi_reply = GoogleTranslator(source='en', target='hi').translate(english_reply)

    # Step 4: Speak the reply
    speak(hindi_reply)

    return {"reply": hindi_reply}