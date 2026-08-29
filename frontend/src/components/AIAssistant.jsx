import React, { useState, useEffect } from 'react';
import { Bot, Send, X, Loader2, History, Landmark, FileText, Shield, Search, User, Calendar, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

function AIAssistant({ onClose, uploadedFile }) {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: '👋 Hello! I am your **Land Document AI Assistant**. I can help you with:\n\n📄 **Document Analysis** – Extract buyer, seller, survey number\n🔍 **Ownership History** – Trace previous owners\n📋 **EC Verification** – Verify Encumbrance Certificate\n🏛️ **Title Chain** – Root to current owner\n\nUpload a document and ask me anything!' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    if (uploadedFile) {
      setFileData(uploadedFile);
      analyzeDocument(uploadedFile);
    }
  }, [uploadedFile]);

  const analyzeDocument = (file) => {
    setMessages(prev => [...prev, {
      type: 'bot',
      text: `📄 **Document Analysis Complete!**\n\nI found the following details:\n\n👤 **Buyer:** ${file.buyer || 'Ramesh Kumar'}\n👤 **Seller:** ${file.seller || 'Suresh Reddy'}\n📋 **Survey No.:** ${file.survey || '123/45'}\n📅 **Date:** ${file.date || '15-08-2023'}\n📐 **Area:** ${file.area || '2.5 acres'}\n\n🔍 **Ownership History:**\n━━━━━━━━━━━━━━━━━━━━\n➜ **1985** – S. Govindaraj (Root of Title)\n➜ **1995** – M. Srinivasan (Transfer)\n➜ **2010** – K. Rajesh (Part Sale)\n➜ **2023** – Ramesh Kumar (Current Owner)\n\n✅ **EC Verification:** Verified. No encumbrances found.\n📊 **Confidence Score:** 94%`
    }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { type: 'user', text: input }]);
    setLoading(true);

    // Simulate AI response based on keywords
    setTimeout(() => {
      const userInput = input.toLowerCase();
      let response = '';

      if (userInput.includes('owner') || userInput.includes('who') || userInput.includes('history')) {
        response = `🔍 **Ownership History Traced!**\n\n**Root of Title:** S. Govindaraj (1985)\n⬇️ Transfer to: M. Srinivasan (1995)\n⬇️ Part Sale to: K. Rajesh (2010)\n⬇️ Transfer to: Ramesh Kumar (2023)\n\n**Current Owner:** Ramesh Kumar\n**Title Status:** Clear (No encumbrances)\n**Confidence:** 94%`;
      } else if (userInput.includes('verify') || userInput.includes('ec') || userInput.includes('encumbrance')) {
        response = `📋 **EC Verification Complete!**\n\n**EC Number:** EC/2023/00567\n**Period:** 1985 – 2023\n**Transactions Found:** 4\n\n✅ **Verification Status:** Verified\n⚠️ **Flag:** No fraud detected\n📊 **Confidence Score:** 98%`;
      } else if (userInput.includes('survey') || userInput.includes('area') || userInput.includes('land')) {
        response = `📐 **Land Details Extracted!**\n\n**Survey Number:** 123/45\n**Village:** Valluvar Nagar\n**Taluk:** Madurai\n**District:** Madurai\n**Area:** 2.5 Acres (10,890 sq.ft)\n\n**Boundaries:**\n⬆️ North: Sivaganga Road\n⬇️ South: Mariamman Kovil\n⬅️ East: Government School\n➡️ West: Nallathambi Land`;
      } else {
        response = `🔍 **Analysis Complete!**\n\nI've scanned the document and found:\n\n📌 **Document Type:** Sale Deed\n📅 **Registration Date:** 15-08-2023\n📋 **Registration No.:** Reg/2023/0045\n\n**Parties Involved:**\n👤 Seller: Suresh Reddy (Aadhaar Verified)\n👤 Buyer: Ramesh Kumar\n\n**Property Details:**\n📍 Survey No.: 123/45\n📐 Area: 2.5 Acres\n\n✅ **Verification Status:** Verified\n📊 **Confidence:** 94%\n\n💡 **Recommendation:** Title is clear. Proceed with registration.`;
      }

      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      setLoading(false);
    }, 2000);

    setInput('');
  };

  const quickSuggestions = [
    { icon: <History className="w-3 h-3" />, text: 'Who is the current owner?' },
    { icon: <Shield className="w-3 h-3" />, text: 'Verify EC' },
    { icon: <Search className="w-3 h-3" />, text: 'Show ownership history' },
    { icon: <MapPin className="w-3 h-3" />, text: 'Land details' },
  ];

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700 z-50 overflow-hidden fade-in max-h-[90vh] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-white">
          <div className="p-1 bg-white/20 rounded-lg">
            <Bot className="w-5 h-5" />
          </div>
          <span className="font-semibold">AI Assistant</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Beta</span>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* File Upload Status */}
      {fileData && (
        <div className="bg-green-500/10 border-b border-green-500/20 p-2 text-center">
          <span className="text-xs text-green-400">📄 Document uploaded: {fileData.name || 'deed.pdf'}</span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900/50 min-h-[300px] max-h-80">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 ${msg.type === 'user' ? 'justify-end' : ''} fade-in`}
          >
            {msg.type === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs flex-shrink-0 shadow-lg">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`max-w-[85%] p-3 rounded-xl whitespace-pre-wrap text-sm ${
                msg.type === 'bot'
                  ? 'bg-gray-800 border border-gray-700 text-gray-200 shadow-lg'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Analyzing document...</span>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      <div className="p-2 bg-gray-800/50 flex gap-2 overflow-x-auto border-t border-gray-700">
        {quickSuggestions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInput(item.text);
              setTimeout(handleSend, 100);
            }}
            className="flex items-center gap-1 text-xs bg-gray-700 px-3 py-1.5 rounded-full border border-gray-600 hover:border-purple-400 hover:text-purple-400 transition-all whitespace-nowrap text-gray-300"
          >
            {item.icon}
            {item.text}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 flex gap-2 bg-gray-800/50">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about ownership history..."
          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 text-sm"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default AIAssistant;
