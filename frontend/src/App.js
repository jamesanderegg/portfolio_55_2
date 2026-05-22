import React from 'react';
import TreeMap from './Treemap'
import pageData from './utilities/treedata'

function App() {
  const treeMap = pageData[0];

  return (
    <div className="App">
      <TreeMap treeMapData={treeMap} />
    </div>
  );
}

export default App;
