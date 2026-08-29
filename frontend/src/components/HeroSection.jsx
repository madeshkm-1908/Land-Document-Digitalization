import React, { useState } from 'react';
import { Upload, FileText, GitBranch, Shield, Bot, Landmark, ArrowRight, Building2, MapPin, Calendar, User, CheckCircle, TrendingUp, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import AIAssistant from './AIAssistant';
import UploadSection from './UploadSection';
import ResultsDisplay from './ResultsDisplay';  // ← ADD THIS

function HeroSection({ onUpload }) {
  const [showAI, setShowAI] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [resultData, setResultData] = useState(null);  // ← ADD THIS

  const handleUpload = (data) => {
    setUploadedFile(data);
    setResultData(data);  // ← ADD THIS
    onUpload(data);
    setShowAI(true);
    toast.success('📄 Document processed successfully!');
  };

  return (
    <div className="min-h-screen gradient-bg-hero relative overflow-hidden">
      {/* ... rest of your hero section ... */}
      
      <div className="relative max-w-7xl mx-auto px-4 py-6 fade-in">
        {/* ... header, hero title, feature cards ... */}
        
        {/* Upload Section */}
        <UploadSection onUpload={handleUpload} />
        
        {/* ===== DISPLAY RESULTS HERE ===== */}
        {resultData && <ResultsDisplay data={resultData} />}
        
        {/* AI Assistant Modal */}
        {showAI && <AIAssistant onClose={() => setShowAI(false)} uploadedFile={uploadedFile} />}
      </div>
    </div>
  );
}

export default HeroSection;
