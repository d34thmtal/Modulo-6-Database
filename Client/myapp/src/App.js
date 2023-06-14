import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';
import HomePage from './page/HomePage';
import Header from './components/Header';
import Details from './components/Details';
import Error from './components/Error';
import NewPost from './components/NewPost';
import NewUser from './components/Register';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<HomePage />}/>
        <Route path='/new-post' element={<NewPost />}/>
        <Route path='/details/:id' element={<Details />}/>
        <Route path='/new-user' element={<NewUser />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='*' element={<Error />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


