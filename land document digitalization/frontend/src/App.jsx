import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadSection from './components/UploadSection';
import GraphVisualization from './components/GraphVisualization';
import EntityTable from './components/EntityTable';
import ECVerification from './components/ECVerification';
import { Upload, FileText, GitBranch, Shield, Home } from 'lucide-react';

function App() {
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (data) => {
    setFileData(data);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white shadow-md border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">
                Land Document Intelligence
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link to="/dashboard" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                <GitBranch className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                Sign In
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800">
                    AI-Powered Land Document Intelligence System
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Upload scanned land documents to extract metadata, verify ownership, and trace the title chain.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <UploadSection onUpload={handleUpload} setLoading={setLoading} />
                    {fileData && fileData.entities && (
                      <EntityTable entities={fileData.entities} />
                    )}
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-2">Status</h3>
                      {loading ? (
                        <div className="text-blue-600">Processing document...</div>
                      ) : fileData ? (
                        <div className="text-green-600">✓ Document processed successfully</div>
                      ) : (
                        <div className="text-gray-400">Awaiting document upload</div>
                      )}
                    </div>
                    {fileData && fileData.ec_verification && (
                      <ECVerification data={fileData.ec_verification} />
                    )}
                  </div>
                </div>

                {fileData && fileData.graph && (
                  <div className="mt-8 bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4">Ownership Graph</h3>
                    <GraphVisualization graphData={fileData.graph} />
                  </div>
                )}
              </div>
            } />
            <Route path="/dashboard" element={
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h4 className="text-sm text-gray-500">Documents Processed</h4>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h4 className="text-sm text-gray-500">Ownership Chains</h4>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h4 className="text-sm text-gray-500">EC Verified</h4>
                    <p className="text-2xl font-bold">18</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h4 className="text-sm text-gray-500">Fraud Alerts</h4>
                    <p className="text-2xl font-bold text-red-500">3</p>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12 py-6">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            <p>© 2025 Land Document Intelligence System | SIH 2025</p>
            <p className="mt-1 text-xs">AI-Powered solution for land record digitization and ownership verification</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;