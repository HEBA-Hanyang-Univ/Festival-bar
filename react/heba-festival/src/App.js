import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [received, setReceived] = useState(0);

  useEffect(() => {
    fetch('/post-data', {
      method:'post',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({
        'TEST':'TEST DATA',
      }),
    }).then(res => res.json()).then(data => {
      setReceived(data.result);
    });
  },[]);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
	<p>Result : { received } </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
