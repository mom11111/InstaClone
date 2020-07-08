import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Post from './Components/Post'
function App() {
  return (
    <BrowserRouter>
    <div>
      <Route exact path='/'><Signup /></Route>
      <Route exact path='/login'><Login /></Route>
      <Route exact path='/post'><Post /></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
