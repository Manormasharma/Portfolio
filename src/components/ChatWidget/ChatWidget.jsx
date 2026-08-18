import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.scss';

const API_URL = process.env.REACT_APP_CHAT_API_URL || '/api/chat';

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Manorma's assistant. Ask me anything about her skills, experience, or background.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
    setError(null);

    // Only send user/assistant turns (skip the initial assistant greeting for the API call)
    const apiMessages = updatedMessages.filter((m, i) => !(i === 0 && m.role === 'assistant'));

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Request failed');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setError(err.message || 'Something went wrong — try again, or email me directly at manorma.sharma@20p95.com.');
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function retryLast() {
    setError(null);
    // Remove the last user message and re-send
    const lastUserIdx = [...messages].reverse().findIndex((m) => m.role === 'user');
    if (lastUserIdx === -1) return;
    const idx = messages.length - 1 - lastUserIdx;
    const retryText = messages[idx].content;
    setMessages((prev) => prev.slice(0, idx));
    setInput(retryText);
  }

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat with Manorma's assistant">
          <div className="chat-header">
            <span>Ask about Manorma</span>
            <button
              className="chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble chat-bubble--${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble chat-bubble--assistant chat-typing">
                <span /><span /><span />
              </div>
            )}
            {error && (
              <div className="chat-error">
                <p>{error}</p>
                <button onClick={retryLast}>Retry</button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-row">
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="Ask a question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              maxLength={1000}
              aria-label="Your message"
            />
            <button
              className="chat-send"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        className="chat-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Chat with Manorma\'s assistant'}
      >
        {open ? '×' : '💬'}
      </button>
    </div>
  );
}

export default ChatWidget;
