import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profile from '../../data/profile.json';
import Icon from '../Icon/Icon';
import { OPEN_CHAT_EVENT } from '../../lib/site';
import './ChatbotSlot.scss';

// Cloudflare Worker endpoint (worker.js) — set in .env.production for builds,
// or .env.development.local to point at `npm run dev:api` locally.
const API_URL = process.env.REACT_APP_CHAT_API_URL;

// Limits enforced by worker.js / api/chat.js
const MAX_TURNS = 20;
const MAX_CHARS = 1000;

// The backend expects [{ role, content }] starting with a user turn, so the
// local-only welcome message is dropped and old turns are trimmed.
function toApiMessages(messages) {
  const turns = messages
    .filter((m) => !m.local)
    .map((m) => ({ role: m.role, content: m.text.slice(0, MAX_CHARS) }))
    .slice(-(MAX_TURNS - 1));
  while (turns.length && turns[0].role !== 'user') turns.shift();
  return turns;
}

const WELCOME_MESSAGE = {
  role: 'assistant',
  local: true,
  text: `Hi! I'm ${profile.name}'s AI assistant. Ask me about her skills, experience, or projects.`,
};

export default function ChatbotSlot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const onOpen = () => setIsOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, []);

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

    const fallback = `Sorry, I couldn't answer that right now. You can reach ${profile.name.split(' ')[0]} directly at ${profile.contactEmail}.`;

    if (!API_URL) {
      setMessages([...nextMessages, { role: 'assistant', local: true, text: fallback }]);
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: toApiMessages(nextMessages) }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.reply) throw new Error(data.error || `HTTP ${response.status}`);
      setMessages([...nextMessages, { role: 'assistant', text: data.reply }]);
    } catch (err) {
      setMessages([...nextMessages, { role: 'assistant', local: true, text: fallback }]);
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
              <span className="chatbot-title">
                <Icon name="sparkles" size={16} /> Ask about {profile.name.split(' ')[0]}
              </span>
              <button type="button" aria-label="Close chat" onClick={() => setIsOpen(false)}>
                <Icon name="close" size={16} />
              </button>
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
                maxLength={MAX_CHARS}
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
        <Icon name={isOpen ? 'close' : 'sparkles'} size={22} />
      </motion.button>
    </div>
  );
}
