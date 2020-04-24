import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navibar from './components/Navibar';
import PrivateRoute from './components/PrivateRoute';
import DadJokes from './components/DadJokes';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navibar />
      <Switch>
        <PrivateRoute path='/protected' component={DadJokes} />
        <Route path="/register"><Register /></Route>
        <Route path="/logout"><Login /></Route>
        <Route path="/"><Login /></Route>
      </Switch>
    </div>
  );
}

export default App;
