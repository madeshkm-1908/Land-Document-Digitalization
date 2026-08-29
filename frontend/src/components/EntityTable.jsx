import React from 'react';
import { Table } from 'lucide-react';

function EntityTable({ entities }) {
  if (!entities) return null;

  const entityTypes = {
    buyer: 'Buyer',
    seller: 'Seller',
    survey_number: 'Survey Number',
    patta_number: 'Patta Number',
    registration_number: 'Registration Number',
    date: 'Date',
    area: 'Area',
    boundaries: 'Boundaries'
  };

  const getValues = (key) => {
    const values = entities[key];
    if (!values) return '—';
    if (Array.isArray(values)) return values.join(', ');
    return values || '—';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 mt-4">
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
        <Table className="h-5 w-5 mr-2 text-blue-600" />
        Extracted Metadata
      </h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-2 px-3 font-medium text-gray-600">Field</th>
              <th className="text-left py-2 px-3 font-medium text-gray-600">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(entityTypes).map(([key, label]) => (
              <tr key={key} className="border-t border-gray-100">
                <td className="py-2 px-3 text-gray-700 font-medium">{label}</td>
                <td className="py-2 px-3 text-gray-600">{getValues(key)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EntityTable;