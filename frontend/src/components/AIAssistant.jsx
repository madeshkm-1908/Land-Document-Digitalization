import React, { useState } from 'react';
import { Bot, Send, X, Loader2, History, Landmark } from 'lucide-react';

function AIAssistant({ onClose }) {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I am your Land Document AI Assistant. Ask me about ownership history, document verification, or property details!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { type: 'user', text: input }]);
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "The property ownership chain shows 3 previous owners. The root of title dates back to 1985.",
        "I found that this document is verified. The survey number matches the EC records.",
        "There is a part-sale detected. The property was partially transferred in 2010.",
        "The current owner is Ramesh Kumar. The title is clear with no encumbrances.",
        "I've traced the ownership lineage. There were 2 previous transactions since 1995."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { type: 'bot', text: randomResponse }]);
      setLoading(false);
    }, 1500);

    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-white">
          <Bot className="w-5 h-5" />
          <span className="font-semibold">AI Assistant</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Beta</span>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 ${msg.type === 'user' ? 'justify-end' : ''}`}
          >
            {msg.type === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-xl ${
                msg.type === 'bot'
                  ? 'bg-white border border-gray-200 text-gray-800'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Analyzing...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 flex gap-2 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about ownership history..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Suggestions */}
      <div className="p-2 bg-gray-50 flex gap-2 overflow-x-auto">
        <button className="text-xs bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:border-purple-400 hover:text-purple-600 whitespace-nowrap">
          <History className="w-3 h-3 inline mr-1" /> Ownership History
        </button>
        <button className="text-xs bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:border-purple-400 hover:text-purple-600 whitespace-nowrap">
          <Landmark className="w-3 h-3 inline mr-1" /> Verify Title
        </button>
        <button className="text-xs bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:border-purple-400 hover:text-purple-600 whitespace-nowrap">
          🔍 Search EC
        </button>
      </div>
    </div>
  );
}

export default AIAssistant;
