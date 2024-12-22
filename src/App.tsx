import React, { useEffect, useRef } from 'react';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import getUsers from './api/api';
import { useAppDispatch } from './store/hooks';
import { setUsers } from './store/usersSlice';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    //set users from api to state
    getUsers().then(users => {
      dispatch(setUsers(users));
    });
  }, [dispatch]);

  const scrollRef = useRef<HTMLElement>(null);

  return (
    <div className="App">
      <Header ref={scrollRef} />
      <Main />
      <footer ref={scrollRef}>
        <div>
          (c) Test task by <a href="https://www.linkedin.com/in/kateryna-tytova/" target="_blank" rel="noreferrer">Kateryna Tytova</a> for <a href="https://smart-it.com" target="_blank" rel="noreferrer"> Smart-business Company</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
