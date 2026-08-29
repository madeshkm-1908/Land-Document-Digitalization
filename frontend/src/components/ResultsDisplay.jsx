import React from 'react';
import { FileText, User, MapPin, Calendar, Shield, GitBranch, CheckCircle, XCircle, Building2, Users } from 'lucide-react';

function ResultsDisplay({ data }) {
  if (!data) return null;

  const { entities, text_preview, graph, ec_verification } = data;

  return (
    <div className="mt-8 space-y-6 fade-in">
      
      {/* ===== TEXT PREVIEW ===== */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <h3 className="text-white font-semibold mb-3 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-purple-400" />
          Extracted Text Preview
        </h3>
        <div className="bg-black/30 p-4 rounded-xl max-h-40 overflow-y-auto">
          <p className="text-gray-300 text-sm whitespace-pre-wrap">
            {text_preview || "No text extracted from the document."}
          </p>
        </div>
      </div>

      {/* ===== ENTITIES TABLE ===== */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <h3 className="text-white font-semibold mb-3 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-400" />
          Extracted Metadata
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 text-gray-400 font-medium">Field</th>
                <th className="text-left py-2 text-gray-400 font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {entities && Object.entries(entities).map(([key, value]) => (
                <tr key={key} className="border-b border-white/5">
                  <td className="py-2 text-gray-400 capitalize">{key.replace('_', ' ')}</td>
                  <td className="py-2 text-white">
                    {Array.isArray(value) && value.length > 0 
                      ? value.join(', ') 
                      : <span className="text-gray-500">—</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== OWNERSHIP CHAIN / GRAPH ===== */}
      {graph && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <GitBranch className="w-5 h-5 mr-2 text-green-400" />
            Ownership Chain
          </h3>
          
          {/* Simple Chain View */}
          <div className="space-y-2">
            {graph.nodes && graph.nodes.map((node, idx) => (
              <div key={node.id} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex-shrink-0"></div>
                <span className="text-white font-medium">{node.label}</span>
                {idx < graph.nodes.length - 1 && (
                  <span className="text-gray-500 text-xs">——→</span>
                )}
              </div>
            ))}
          </div>

          {/* Edges / Transfers */}
          {graph.edges && graph.edges.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-gray-400 text-xs mb-2">Transfers:</p>
              {graph.edges.map((edge, idx) => (
                <div key={idx} className="text-sm text-gray-300">
                  {edge.source} → {edge.target} 
                  <span className="text-gray-500 text-xs ml-2">({edge.label})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===== PREVIOUS OWNERS TABLE ===== */}
      {graph && graph.nodes && graph.nodes.length > 2 && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-yellow-400" />
            Previous Owners
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-gray-400 font-medium">#</th>
                  <th className="text-left py-2 text-gray-400 font-medium">Owner Name</th>
                  <th className="text-left py-2 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {graph.nodes.slice(0, -1).map((node, idx) => (
                  <tr key={node.id} className="border-b border-white/5">
                    <td className="py-2 text-gray-500">{idx + 1}</td>
                    <td className="py-2 text-white">{node.label}</td>
                    <td className="py-2">
                      {idx === 0 ? (
                        <span className="text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded-full">Root of Title</span>
                      ) : (
                        <span className="text-yellow-400 text-xs bg-yellow-400/10 px-2 py-1 rounded-full">Previous</span>
                      )}
                    </td>
                  </tr>
                ))}
                {graph.nodes.length > 1 && (
                  <tr className="border-b border-white/5">
                    <td className="py-2 text-gray-500">{graph.nodes.length}</td>
                    <td className="py-2 text-white font-bold">{graph.nodes[graph.nodes.length - 1].label}</td>
                    <td className="py-2">
                      <span className="text-blue-400 text-xs bg-blue-400/10 px-2 py-1 rounded-full">Current Owner</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== EC VERIFICATION ===== */}
      {ec_verification && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-400" />
            EC Verification
          </h3>
          <div className="flex items-center gap-3">
            {ec_verification.verified ? (
              <CheckCircle className="w-6 h-6 text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400" />
            )}
            <span className={ec_verification.verified ? "text-green-400" : "text-red-400"}>
              {ec_verification.verified ? "✅ Verified – Clear Title" : "❌ Verification Failed"}
            </span>
          </div>
          {ec_verification.matches_found > 0 && (
            <p className="text-gray-400 text-sm mt-2">
              Matches found: {ec_verification.matches_found}
            </p>
          )}
          {ec_verification.flags && ec_verification.flags.length > 0 && (
            <div className="mt-2 bg-yellow-500/10 p-3 rounded-xl">
              <p className="text-yellow-400 text-sm">⚠️ Flags:</p>
              {ec_verification.flags.map((flag, idx) => (
                <p key={idx} className="text-gray-300 text-xs">• {flag}</p>
              ))}
            </div>
          )}
          {ec_verification.recommendations && ec_verification.recommendations.length > 0 && (
            <div className="mt-2 bg-blue-500/10 p-3 rounded-xl">
              <p className="text-blue-400 text-sm">💡 Recommendations:</p>
              {ec_verification.recommendations.map((rec, idx) => (
                <p key={idx} className="text-gray-300 text-xs">• {rec}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ResultsDisplay;
