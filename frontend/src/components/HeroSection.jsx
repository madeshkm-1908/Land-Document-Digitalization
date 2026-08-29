import React, { useState } from 'react';
import { Upload, FileText, GitBranch, Shield, Bot, Landmark, ArrowRight } from 'lucide-react';
import AIAssistant from './AIAssistant';
import UploadSection from './UploadSection';

function HeroSection({ onUpload }) {
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 opacity-10 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl">
              <Landmark className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">LandDoc AI</h1>
              <p className="text-xs text-gray-500">Intelligent Land Record System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAI(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all"
            >
              <Bot className="w-5 h-5" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-xl shadow-sm">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="hidden sm:inline">Secure</span>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full text-sm text-purple-700 font-medium mb-4">
            🚀 AI-Powered Land Document Intelligence
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Extract. Verify. <span className="gradient-text">Trace.</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload scanned land documents to extract metadata, verify ownership, and trace the complete title chain from root to current owner.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 card-hover">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-2">
              <Upload className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Upload</h3>
            <p className="text-xs text-gray-500">Scanned deeds & documents</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 card-hover">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Extract</h3>
            <p className="text-xs text-gray-500">Metadata via OCR + NLP</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 card-hover">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-2">
              <GitBranch className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Trace</h3>
            <p className="text-xs text-gray-500">Ownership chain graph</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 card-hover">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mb-2">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Verify</h3>
            <p className="text-xs text-gray-500">EC & fraud detection</p>
          </div>
        </div>

        {/* Upload Section */}
        <UploadSection onUpload={onUpload} />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-2xl font-bold text-purple-600">1,284</p>
            <p className="text-xs text-gray-500">Documents Processed</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-2xl font-bold text-indigo-600">856</p>
            <p className="text-xs text-gray-500">Ownership Chains</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-2xl font-bold text-green-600">97%</p>
            <p className="text-xs text-gray-500">Verification Accuracy</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-2xl font-bold text-pink-600">12</p>
            <p className="text-xs text-gray-500">Fraud Alerts</p>
          </div>
        </div>

        {/* AI Assistant Modal */}
        {showAI && <AIAssistant onClose={() => setShowAI(false)} />}
      </div>
    </div>
  );
}

export default HeroSection;
