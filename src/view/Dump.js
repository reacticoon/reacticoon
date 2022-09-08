import React from 'react';

const Dump = props => (
  <div
    style={{
      fontSize: 12,
      border: '1px solid #efefef',
      padding: 10,
      overflow: 'auto',
      maxHeight: '80vh',
    }}
  >
    {Object.entries(props).map(([key, val]) => (
      <pre key={key}>
        <strong style={{ background: 'red' }}>
          {key} 🦝
        </strong>
        {JSON.stringify(val, '', ' ')}
      </pre>
    ))}
  </div>
);

export default Dump;