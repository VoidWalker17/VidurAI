# 🕉️ VidurAI

A Hindi voice chatbot that answers your questions through the wisdom of the Bhagavad Gita — powered by a local LLM running entirely on your machine.

---

## 💡 What is VidurAI?

VidurAI is named after **Vidur** — the wisest minister in the Mahabharata, known for his dharmic and practical wisdom.

You speak or type a question in Hindi. VidurAI listens, thinks, and responds with Gita-based wisdom — also in Hindi.

---

## 🔄 How it works
User speaks/types in Hindi
↓
Translate Hindi → English (deep-translator)
↓
Llama3.2:3b via Ollama (Gita-based system prompt)
↓
Translate English → Hindi
↓
Spoken out loud (pyttsx3) + displayed in chat UI

---

## 🛠️ Tech Stack

| Layer | Tool |
|---|---|
| Frontend | React |
| Backend | FastAPI (Python) |
| AI Model | Llama3.2:3b via Ollama |
| Translation | deep-translator |
| Text to Speech | pyttsx3 |
| Voice Input | Web Speech API |

---

## 🚀 Running Locally

### Prerequisites
- Python 3.8+
- Node.js 18+
- [Ollama](https://ollama.com) installed
- Llama3.2:3b model pulled

### 1. Pull the model
```bash
ollama pull llama3.2:3b
```

### 2. Start the backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn deep-translator pyttsx3 requests
uvicorn main:app --reload
```

### 3. Start the frontend
```bash
cd frontend
npm install
npm start
```

### 4. Open in browser
http://localhost:3000

---

## 🗺️ Roadmap

- [x] v1 — Text + voice chat with Gita-based responses
- [ ] v2 — RAG implementation with actual Bhagavad Gita verses as knowledge base

---

## 🙏 Why this project?

Most AI assistants are generic. VidurAI is built around a specific philosophy — that ancient wisdom is still deeply relevant. The Bhagavad Gita has guided people through confusion, duty, and purpose for thousands of years. VidurAI tries to make that wisdom accessible in your own language.