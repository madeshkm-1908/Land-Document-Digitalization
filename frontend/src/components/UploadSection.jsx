import React, { useState, useRef } from 'react';
import { Upload, File, X, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL || 'https://land-document-backend.onrender.com';

function UploadSection({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type.startsWith('image/'))) {
      setFile(selectedFile);
      toast.success('File selected: ' + selectedFile.name);
    } else {
      toast.error('Please upload a PDF or image file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInput = (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const processDocument = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Uploading to:', `${API_URL}/upload/`);
      const response = await axios.post(`${API_URL}/upload/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000 // 60 seconds timeout for OCR
      });

      console.log('Response:', response.data);
      toast.success('Document processed successfully!');
      onUpload(response.data);
      
    } catch (error) {
      console.error('Upload error:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
        toast.error('Server error: ' + (error.response.data.detail || 'Unknown error'));
      } else if (error.request) {
        toast.error('Cannot reach backend. Make sure the backend is running.');
      } else {
        toast.error('Error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
      <h3 className="font-semibold text-white mb-4 flex items-center">
        <Upload className="h-5 w-5 mr-2 text-purple-400" />
        Upload Document
      </h3>

      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive ? 'border-purple-400 bg-purple-500/10' : 'border-white/20'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileInput}
        />

        {!file ? (
          <div>
            <File className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-300">Drag & drop your document here</p>
            <p className="text-sm text-gray-500 mt-1">or</p>
            <button
              onClick={handleUploadClick}
              className="mt-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-xl text-sm hover:shadow-lg transition-all"
            >
              Browse Files
            </button>
            <p className="text-xs text-gray-500 mt-3">Supports: PDF, JPG, PNG, JPEG</p>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <File className="h-8 w-8 text-purple-400" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">{file.name}</p>
                <p className="text-xs text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={processDocument}
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1.5 rounded-lg text-sm hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {loading ? 'Processing...' : 'Process'}
              </button>
              <button
                onClick={removeFile}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Status message */}
      {loading && (
        <div className="mt-4 text-center text-purple-300 text-sm">
          ⏳ Processing document with OCR... This may take a few seconds.
        </div>
      )}
    </div>
  );
}

export default UploadSection;
