import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

function GraphVisualization({ graphData }) {
  if (!graphData || !graphData.nodes || !graphData.edges) {
    return (
      <div className="text-center py-8 text-gray-400">
        No graph data available. Process a document to see the ownership chain.
      </div>
    );
  }

  const elements = [
    ...graphData.nodes.map(node => ({
      data: { id: node.id, label: node.label }
    })),
    ...graphData.edges.map(edge => ({
      data: { source: edge.source, target: edge.target, label: edge.label }
    }))
  ];

  const layout = {
    name: 'dagre',
    rankDir: 'TB',
    spacingFactor: 1.5,
    animate: true,
    animationDuration: 500
  };

  const styles = [
    {
      selector: 'node',
      style: {
        'background-color': '#3B82F6',
        'label': 'data(label)',
        'color': '#1F2937',
        'text-valign': 'center',
        'text-halign': 'center',
        'width': 80,
        'height': 40,
        'shape': 'roundrectangle',
        'border-width': 2,
        'border-color': '#2563EB',
        'font-size': '12px',
        'font-weight': 'bold'
      }
    },
    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': '#6B7280',
        'line-color': '#6B7280',
        'label': 'data(label)',
        'font-size': '10px',
        'text-rotation': 'autorotate',
        'color': '#6B7280'
      }
    }
  ];

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <CytoscapeComponent
        elements={elements}
        layout={layout}
        style={{ width: '100%', height: '100%' }}
        stylesheet={styles}
        cy={(cy) => {
          cy.on('tap', 'node', (evt) => {
            const node = evt.target;
            console.log('Clicked node:', node.data().label);
          });
        }}
      />
    </div>
  );
}

export default GraphVisualization;
