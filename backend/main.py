from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from deep_translator import GoogleTranslator
import requests
from rag import load_gita, find_relevant_verses

app = FastAPI()

# Load Gita verses into vector DB on startup
@app.on_event("startup")
async def startup_event():
    print("Loading Bhagavad Gita into memory...")
    load_gita()
    print("Gita loaded. VidurAI is ready.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserMessage(BaseModel):
    message: str

@app.post("/chat")
async def chat(user_message: UserMessage):
    hindi_input = user_message.message

    # Step 1: Translate Hindi → English
    english_input = GoogleTranslator(source='hi', target='en').translate(hindi_input)

    # Step 2: Find relevant Gita verses using RAG
    relevant_verses = find_relevant_verses(english_input, n=3)
    
    # Build context from real verses
    verse_context = ""
    for v in relevant_verses:
        verse_context += f"Chapter {v['chapter']}, Verse {v['verse']}: {v['text']}\n\n"

    # Step 3: Build prompt with real verses
    prompt = f"""The user asks: "{english_input}"

Here are the most relevant verses from the Bhagavad Gita:

{verse_context}

Using ONLY these verses as your source, answer the user's question as Vidur — the wisest minister from the Mahabharata. Be warm, wise, and concise. Reference the verses naturally in your answer."""

    # Step 4: Send to Llama3.2 via Ollama
    response = requests.post("http://localhost:11434/api/generate", json={
        "model": "llama3.2:3b",
        "prompt": prompt,
        "stream": False
    })

    english_reply = response.json()["response"]

    # Step 5: Translate English → Hindi
    hindi_reply = GoogleTranslator(source='en', target='hi').translate(english_reply)

    return {"reply": hindi_reply}