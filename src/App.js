import React from 'react';
import SearchPage from './views/SearchPage';
import ShowList from './views/ShowList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/show/:showId">
            <ShowList></ShowList>
          </Route>
          <Route path="/">
            <SearchPage></SearchPage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;