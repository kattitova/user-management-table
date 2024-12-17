import React, { useRef } from 'react';
import './App.css';
import Main from './components/Main/Main';
import Header from './components/Header/Header';

function App() {
  const scrollRef = useRef<HTMLElement>(null);

  return (
    <div className="App">
      <Header ref={scrollRef} />
      <Main />
      <footer ref={scrollRef}>(c) Test task by Kateryna Tytova for Smart-business Company</footer>
    </div>
  );
}

export default App;
