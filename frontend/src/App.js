import React, { useState, useEffect } from 'react';
import TreeMap from './Treemap'
import pageData from './utilities/treedata'
import CoverPage from './Components/CoverPage/CoverPage';

function App() {

  const [treeMap, setTreeMap] = useState(null);
  

  useEffect(() => {
    if (pageData && pageData[0]) {
      setTreeMap(pageData[0]);
      
    }
  }, [])

  return (
    <div className="App">
      <link 
  rel="stylesheet" 
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
/>
      <TreeMap treeMapData={treeMap} />
    </div>
  );
}

export default App;