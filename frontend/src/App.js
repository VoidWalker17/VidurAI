import { useState, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Cinzel:wght@400;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #0d0a06;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .app {
    min-height: 100vh;
    width: 100%;
    max-width: 720px;
    background: #0d0a06;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 16px;
    position: relative;
    overflow: hidden;
  }

  .mandala-bg {
    position: fixed;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 400px;
    opacity: 0.04;
    pointer-events: none;
  }

  .header {
    text-align: center;
    margin-bottom: 24px;
    position: relative;
    z-index: 1;
  }

  .om-symbol {
    font-size: 36px;
    color: #c8922a;
    display: block;
    margin-bottom: 4px;
  }

  .title {
    font-family: 'Cinzel', serif;
    font-size: 30px;
    font-weight: 600;
    color: #e8b84b;
    letter-spacing: 5px;
  }

  .subtitle {
    font-size: 12px;
    color: #8a6a3a;
    letter-spacing: 2px;
    margin-top: 6px;
    font-family: sans-serif;
  }

  .divider {
    width: 200px;
    height: 1px;
    background: linear-gradient(to right, transparent, #c8922a, transparent);
    margin: 12px auto 0;
  }

  .chat-box {
    width: 100%;
    background: #120e08;
    border: 0.5px solid #3a2a10;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: 420px;
    max-height: 58vh;
    overflow-y: auto;
    position: relative;
    z-index: 1;
  }

  .corner {
    position: absolute;
    width: 16px;
    height: 16px;
    border-color: #c8922a;
    border-style: solid;
    opacity: 0.5;
  }
  .corner.tl { top: 8px; left: 8px; border-width: 1px 0 0 1px; }
  .corner.tr { top: 8px; right: 8px; border-width: 1px 1px 0 0; }
  .corner.bl { bottom: 8px; left: 8px; border-width: 0 0 1px 1px; }
  .corner.br { bottom: 8px; right: 8px; border-width: 0 1px 1px 0; }

  .placeholder {
    color: #3a2a10;
    text-align: center;
    margin-top: 140px;
    font-family: 'Cinzel', serif;
    font-size: 13px;
    letter-spacing: 2px;
  }

  .msg-user {
    align-self: flex-end;
    background: #2a1e08;
    border: 0.5px solid #c8922a44;
    border-radius: 10px 0 0 10px;
    padding: 10px 14px;
    max-width: 72%;
    color: #f5d98a;
    font-size: 15px;
    font-family: 'Tiro Devanagari Hindi', serif;
    line-height: 1.6;
  }

  .msg-bot {
    align-self: flex-start;
    background: #1e1508;
    border: 0.5px solid #3a2a10;
    border-left: 2px solid #c8922a;
    border-radius: 0 10px 10px 0;
    padding: 12px 16px;
    max-width: 82%;
    color: #e8d5a0;
    font-size: 15px;
    line-height: 1.8;
    font-family: 'Tiro Devanagari Hindi', serif;
  }

  .speaker {
    font-size: 11px;
    color: #c8922a;
    margin-bottom: 6px;
    letter-spacing: 1px;
    font-family: 'Cinzel', serif;
  }

  .thinking {
    align-self: flex-start;
    color: #5a4a2a;
    font-size: 13px;
    font-family: 'Cinzel', serif;
    letter-spacing: 1px;
    padding-left: 8px;
  }

  .input-area {
    width: 100%;
    margin-top: 16px;
    display: flex;
    gap: 8px;
    position: relative;
    z-index: 1;
  }

  .input-wrap {
    flex: 1;
    background: #120e08;
    border: 0.5px solid #3a2a10;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 0 14px;
  }

  .input-wrap input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #e8d5a0;
    font-size: 14px;
    padding: 13px 0;
    font-family: sans-serif;
  }

  .input-wrap input::placeholder { color: #3a2a10; }

  .mic-btn {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: #120e08;
    border: 0.5px solid #3a2a10;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 20px;
    flex-shrink: 0;
    transition: border-color 0.2s;
  }

  .mic-btn.listening {
    border-color: #c8922a;
    background: #1e1508;
  }

  .send-btn {
    height: 46px;
    padding: 0 22px;
    background: #c8922a;
    border: none;
    border-radius: 10px;
    color: #0d0a06;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    font-family: sans-serif;
    letter-spacing: 1px;
    flex-shrink: 0;
  }

  .send-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .status-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    z-index: 1;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4caf50;
  }

  .dot.speaking { background: #c8922a; }

  .status-text {
    font-size: 10px;
    color: #5a4a2a;
    letter-spacing: 1.5px;
    font-family: sans-serif;
  }
`;

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async (text) => {
  if (!text.trim() || loading) return;
  setMessages((prev) => [...prev, { role: "user", text }]);
  setInput("");
  setLoading(true);
  setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

  try {
    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await response.json();
    const fullReply = data.reply;

    // Add empty bot message first
    setMessages((prev) => [...prev, { role: "bot", text: "" }]);
    setLoading(false);

    // Typewriter effect — reveal one character at a time
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "bot", text: fullReply.slice(0, i) };
        return updated;
      });
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      if (i >= fullReply.length) {
        clearInterval(interval);
        const cleanText = fullReply
          .replace(/भगवद गीता.*?\d+:\d+/g, "")
          .replace(/Bhagavad Gita.*?\d+:\d+/gi, "")
          .replace(/\d+:\d+/g, "")
          .trim();
        speak(cleanText);
      }
    }, 30);

  } catch {
    setMessages((prev) => [...prev, { role: "bot", text: "Backend से connection नहीं हो पाया।" }]);
    setLoading(false);
  }

  setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
};

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Use Chrome for voice input."); return; }
    const recognition = new SR();
    recognition.lang = "hi-IN";
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <svg className="mandala-bg" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="#c8922a" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="70" stroke="#c8922a" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" stroke="#c8922a" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="30" stroke="#c8922a" strokeWidth="0.5" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="#c8922a" strokeWidth="0.5" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="#c8922a" strokeWidth="0.5" />
          <line x1="27" y1="27" x2="173" y2="173" stroke="#c8922a" strokeWidth="0.5" />
          <line x1="173" y1="27" x2="27" y2="173" stroke="#c8922a" strokeWidth="0.5" />
        </svg>

        <div className="header">
          <span className="om-symbol">ॐ</span>
          <div className="title">VIDUR AI</div>
          <div className="subtitle">Wisdom of the Bhagavad Gita · In your language</div>
          <div className="divider"></div>
        </div>

        <div className="chat-box">
          <div className="corner tl"></div>
          <div className="corner tr"></div>
          <div className="corner bl"></div>
          <div className="corner br"></div>

          {messages.length === 0 && (
            <div className="placeholder">ASK YOUR QUESTION</div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "msg-user" : "msg-bot"}>
              {msg.role === "bot" && <div className="speaker">— Vidur</div>}
              {msg.text}
            </div>
          ))}

          {loading && <div className="thinking">Vidur is thinking...</div>}
          <div ref={chatEndRef} />
        </div>

        <div className="input-area">
          <div className="input-wrap">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Type or speak your question..."
            />
          </div>
          <div className={`mic-btn ${listening ? "listening" : ""}`} onClick={startListening}>
            {listening ? "🔴" : "🎤"}
          </div>
          <button className="send-btn" onClick={() => sendMessage(input)} disabled={loading}>
            SEND
          </button>
        </div>

        <div className="status-bar">
          <div className={`dot ${speaking ? "speaking" : ""}`}></div>
          <span className="status-text">
            {speaking ? "VIDUR IS SPEAKING" : listening ? "LISTENING..." : "VIDUR IS LISTENING"}
          </span>
        </div>
      </div>
    </>
  );
}