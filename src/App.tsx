import React from 'react';
import './App.css';

function App() {
  const custTitle = "Project React";
  return (
    <div className="App">
      <header className="App-header">
        <img src="site-logo.png" className="App-logo" alt="logo"
        />
        <p>
          {custTitle}
        </p>
      </header>
    </div>
  );
}

export default App;
