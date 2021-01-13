import './App.css';
import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Signup } from './components/Signup/Signup';





const App = () => {
  return (
    <>
      {/* Navbar */}
      <header>
        Header
      </header>
      {/* Main */}
      <main>
        <Switch>
          <Route path="/signup" component={Signup} />
        </Switch>
      </main>
      {/* Footer */}
      <footer>
        Footer
      </footer>
    </>
  );
}

export default App;
