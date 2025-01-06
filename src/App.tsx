import React from 'react';
import './App.css';

function App() {
  const custTitle = "Project React";
  return (
    <div className="App">
      <header className="App-header">
        <img src="name.png" className="App-logo" alt="logo" width={400}
        />
        <p>
          {custTitle}
        </p>
      </header>
    </div>
  );
}

export default App;
