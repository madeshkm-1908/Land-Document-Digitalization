import React, { useState } from 'react';
import { Upload, FileText, GitBranch, Shield, Bot, Landmark, ArrowRight, Building2, MapPin, Calendar, User, CheckCircle, TrendingUp, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import AIAssistant from './AIAssistant';
import UploadSection from './UploadSection';

function HeroSection({ onUpload }) {
  const [showAI, setShowAI] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUpload = (data) => {
    setUploadedFile(data);
    onUpload(data);
    setShowAI(true);
    toast.success('📄 Document uploaded! AI Assistant is analyzing...');
  };

  return (
    <div className="min-h-screen gradient-bg-hero relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 25 + 15 + 's',
              animationDelay: Math.random() * 15 + 's',
              background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.08)`
            }}
          />
        ))}
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-6 fade-in">
        {/* Header */}
        <header className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg">
              <Landmark className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">LandDoc <span className="text-yellow-400">AI</span></h1>
              <p className="text-xs text-gray-400">Intelligent Land Record System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAI(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Bot className="w-5 h-5" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="hidden sm:inline">Secure</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="hidden sm:inline">Gov. Grade</span>
            </div>
          </div>
        </header>

        {/* Hero Title */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 backdrop-blur-sm rounded-full text-sm text-purple-300 font-medium mb-4 border border-purple-500/20">
            🚀 AI-Powered Land Document Intelligence
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Extract. <span className="gradient-text">Verify.</span> <span className="text-yellow-400">Trace.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Upload scanned land documents to extract metadata, verify ownership, and trace the complete title chain from root to current owner.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="gradient-card rounded-xl p-4 card-hover">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-2 border border-purple-500/20">
              <Upload className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white text-sm">Upload</h3>
            <p className="text-xs text-gray-400">Scanned deeds & documents</p>
          </div>
          <div className="gradient-card rounded-xl p-4 card-hover">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-2 border border-blue-500/20">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white text-sm">Extract</h3>
            <p className="text-xs text-gray-400">Metadata via OCR + NLP</p>
          </div>
          <div className="gradient-card rounded-xl p-4 card-hover">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-2 border border-green-500/20">
              <GitBranch className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="font-semibold text-white text-sm">Trace</h3>
            <p className="text-xs text-gray-400">Ownership chain graph</p>
          </div>
          <div className="gradient-card rounded-xl p-4 card-hover">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center mb-2 border border-red-500/20">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="font-semibold text-white text-sm">Verify</h3>
            <p className="text-xs text-gray-400">EC & fraud detection</p>
          </div>
        </div>

        {/* Upload Section */}
        <UploadSection onUpload={handleUpload} />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="gradient-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">1,284</p>
            <p className="text-xs text-gray-400">Documents Processed</p>
          </div>
          <div className="gradient-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-indigo-400">856</p>
            <p className="text-xs text-gray-400">Ownership Chains</p>
          </div>
          <div className="gradient-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-400">97%</p>
            <p className="text-xs text-gray-400">Verification Accuracy</p>
          </div>
          <div className="gradient-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-pink-400">12</p>
            <p className="text-xs text-gray-400">Fraud Alerts</p>
          </div>
        </div>

        {/* AI Assistant Modal */}
        {showAI && <AIAssistant onClose={() => setShowAI(false)} uploadedFile={uploadedFile} />}
      </div>
    </div>
  );
}

export default HeroSection;
