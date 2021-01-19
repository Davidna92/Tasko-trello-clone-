import './App.css';
import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import userService from './services/userService';

import { Login } from './components/Login/login';
import { Signup } from './components/Signup/Signup';
import { Boards } from './components/Boards/Boards';




class App extends Component {

  state = {
    user: {}
  };

  async componentDidMount() {
    const userId = await userService.getUser(); // giving the id of the current user
    const userData = await userService.userData(userId._id); // giving the user data by setting user id

    this.setState({ user: userData }); //setting the user data object to the state
    // console.table(this.state.user);
  }

  render() {
    const { user } = this.state;

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
            <Route path="/login" component={Login} />
            <Route path="/boards" component={() => <Boards user={user} />} />
          </Switch>
        </main>
        {/* Footer */}
        <footer>
          Footer
       </footer>
      </>
    );
  }
}

export default App;
