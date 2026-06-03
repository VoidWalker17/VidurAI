# ॐ VidurAI

> *"You have a right to perform your prescribed duty, but you are not entitled to the fruits of action."*
> — Bhagavad Gita, 2:47

VidurAI is a Hindi voice chatbot that answers your questions through the wisdom of the Bhagavad Gita — powered by a local LLM and a real Gita verse database, running entirely on your machine.

---

## What is VidurAI?

Named after **Vidur** — the wisest minister in the Mahabharata, known for his dharmic and practical wisdom.

You speak or type a question in Hindi. VidurAI listens, finds the most relevant Bhagavad Gita verses, and responds with grounded wisdom — also in Hindi, spoken out loud.

---

## How it works
User speaks or types in Hindi
↓
Translate Hindi → English (deep-translator)
↓
Search Gita vector database for relevant verses (ChromaDB + sentence-transformers)
↓
Build prompt with real verses → Llama3.2:3b via Ollama
↓
Translate English reply → Hindi
↓
Display in chat UI + speak out loud (Web Speech API)

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | React |
| Backend | FastAPI (Python) |
| AI Model | Llama3.2:3b via Ollama (runs locally) |
| Vector Search | ChromaDB |
| Embeddings | sentence-transformers (all-MiniLM-L6-v2) |
| Translation | deep-translator |
| Voice Input | Web Speech API |
| Voice Output | Web Speech Synthesis API |

---

## Running Locally

### Prerequisites
- Python 3.8+
- Node.js 18+
- [Ollama](https://ollama.com) installed

### 1. Pull the model
```bash
ollama pull llama3.2:3b
```

### 2. Start the backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn deep-translator sentence-transformers chromadb requests
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

> Use Chrome for voice input and output support.

---

## Project Structure

VidurAI/
├── backend/
│   ├── main.py        # FastAPI server + RAG pipeline
│   ├── rag.py         # Vector search with ChromaDB
│   └── gita.json      # 69 Bhagavad Gita verses
├── frontend/
│   └── src/
│       └── App.js     # React chat UI + voice
└── README.md


---

## Roadmap

- [x] v1 — Hindi voice chat with Gita-based responses
- [x] v2 — RAG pipeline with real Gita verses as knowledge base
- [ ] v3 — Streaming TTS for real-time voice synthesis
- [ ] v4 — Full 700 verse Gita corpus

---

## Why this project?

Most AI assistants are generic. VidurAI is built around a specific philosophy — that ancient wisdom is still deeply relevant. The Bhagavad Gita has guided people through confusion, duty, and purpose for thousands of years. VidurAI makes that wisdom accessible in your own language, using your own hardware, with no data leaving your machine.

---

## License

MIT



