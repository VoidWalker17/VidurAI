import { useState, useRef } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      const botMsg = { role: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error connecting to backend." },
      ]);
    }

    setLoading(false);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support voice input. Use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🕉️ VidurAI</h1>
      <p style={styles.subtitle}>भगवद गीता की wisdom, आपकी भाषा में</p>

      <div style={styles.chatBox}>
        {messages.length === 0 && (
          <p style={styles.placeholder}>कोई प्रश्न पूछें...</p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.role === "user" ? "#f0a500" : "#1e1e2e",
              color: msg.role === "user" ? "#000" : "#fff",
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div style={{ ...styles.message, backgroundColor: "#1e1e2e", color: "#aaa" }}>
            Vidur सोच रहे हैं...
          </div>
        )}
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="हिंदी में लिखें या बोलें..."
        />
        <button style={styles.micBtn} onClick={startListening}>
          {listening ? "🔴" : "🎤"}
        </button>
        <button style={styles.sendBtn} onClick={() => sendMessage(input)}>
          भेजें
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f0f1a",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    color: "#f0a500",
    fontSize: "2.5rem",
    margin: "0",
  },
  subtitle: {
    color: "#aaa",
    marginBottom: "20px",
  },
  chatBox: {
    width: "100%",
    maxWidth: "700px",
    flex: 1,
    backgroundColor: "#16213e",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minHeight: "400px",
    maxHeight: "60vh",
    overflowY: "auto",
  },
  placeholder: {
    color: "#555",
    textAlign: "center",
    marginTop: "150px",
  },
  message: {
    padding: "12px 16px",
    borderRadius: "10px",
    maxWidth: "80%",
    lineHeight: "1.6",
  },
  inputRow: {
    display: "flex",
    width: "100%",
    maxWidth: "700px",
    marginTop: "16px",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1e1e2e",
    color: "#fff",
    fontSize: "1rem",
  },
  micBtn: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1e1e2e",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
  sendBtn: {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#f0a500",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default App;