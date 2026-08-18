import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profile from '../../data/profile.json';
import './ChatbotSlot.scss';

const API_URL = process.env.REACT_APP_CHATBOT_API_URL;

const WELCOME_MESSAGE = {
  role: 'assistant',
  text: `Hi! I'm ${profile.name}'s AI assistant. Ask me about her skills, experience, or projects.`,
};

export default function ChatbotSlot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;

    const nextMessages = [...messages, { role: 'user', text }];
    setMessages(nextMessages);
    setInput('');

    if (!API_URL) {
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          text: "The chatbot isn't configured yet — set REACT_APP_CHATBOT_API_URL to your Cloudflare Worker endpoint once a provider (Claude, Gemini, Ollama, or AnythingLLM) is set up.",
        },
      ]);
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: nextMessages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });
      const data = await response.json();
      setMessages([...nextMessages, { role: 'assistant', text: data.reply || "Sorry, I couldn't generate a response." }]);
    } catch (err) {
      setMessages([...nextMessages, { role: 'assistant', text: "Something went wrong reaching the chatbot. Please try again later." }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chatbot-slot">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="chatbot-panel-header">
              <span>Ask about {profile.name}</span>
              <button type="button" aria-label="Close chat" onClick={() => setIsOpen(false)}>&times;</button>
            </div>
            <div className="chatbot-panel-body" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`chatbot-message chatbot-message-${m.role}`}>
                  {m.text}
                </div>
              ))}
              {isSending && <div className="chatbot-message chatbot-message-assistant">Thinking…</div>}
            </div>
            <form className="chatbot-panel-input" onSubmit={sendMessage}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                aria-label="Chat message"
              />
              <button type="submit" disabled={isSending || !input.trim()}>Send</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        className="chatbot-fab"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? '×' : '💬'}
      </motion.button>
    </div>
  );
}
