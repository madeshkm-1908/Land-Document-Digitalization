import React from 'react';
import { Shield, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

function ECVerification({ data }) {
  if (!data) return null;

  const getStatusIcon = (verified) => {
    if (verified) return <CheckCircle className="h-5 w-5 text-green-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-blue-600" />
        EC Verification
      </h4>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-600">Status:</span>
        <div className="flex items-center space-x-2">
          {getStatusIcon(data.verified)}
          <span className={data.verified ? 'text-green-600' : 'text-red-600'}>
            {data.verified ? 'Verified' : 'Verification Failed'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-600">Matches Found:</span>
        <span className="font-medium">{data.matches_found}</span>
      </div>

      {data.flags && data.flags.length > 0 && (
        <div className="mt-3">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Flags</h5>
          {data.flags.map((flag, index) => (
            <div key={index} className="flex items-start space-x-2 bg-yellow-50 rounded-lg p-2 mb-1">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <span className="text-sm text-yellow-700">{flag.message}</span>
            </div>
          ))}
        </div>
      )}

      {data.recommendations && data.recommendations.length > 0 && (
        <div className="mt-3">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h5>
          {data.recommendations.map((rec, index) => (
            <div key={index} className="bg-blue-50 rounded-lg p-2 mb-1">
              <span className="text-sm text-blue-700">{rec}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ECVerification;