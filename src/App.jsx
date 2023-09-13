import { Routes, Route, NavLink } from 'react-router-dom';
import { useState } from 'react';
import Login from 'src/layouts/Login';
import Signup from 'src/layouts/Signup';
import Todolist from 'src/layouts/Todolist';
import Alltodo from 'src/layouts/Todolist';
import Finishedtodo from 'src/layouts/Todolist';
import Unfinishedtodo from 'src/layouts/Todolist';

import './App.css';

function App() {
  const [inputValue, setInputValue] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmpassword: ''
  });

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Login
              inputValue={inputValue}
              setInputValue={setInputValue}
           
            />
          }
        />

        <Route
          path='*'
          element={
            <Login
              inputValue={inputValue}
              setInputValue={setInputValue}
             
            />
          }
        />
        <Route
          path='/signup'
          element={
            <Signup
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          }
        />
        <Route
          
          path='/todolist'
          element={<Todolist inputValue={inputValue} />}>
          <Route
            path='alltodo'
            element={<Alltodo />}
          />
          <Route
            path='fisnishedtodo'
            element={<Finishedtodo />}
          />
          <Route
            path='unfisnishedtodo'
            element={<Unfinishedtodo />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
