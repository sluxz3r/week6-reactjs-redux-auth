import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import './App.css';

import Nav from './Components/Nav';
import Footer from './Components/Footer';
import store from './Publics/redux/store';
import HomePage from './Screens/HomePage';
import List from './Screens/ListBook';
import test from './Components/test';
import UpdateBook from './Components/UpdateBook';

import Register from './Screens/register';
import Login from './Screens/login'
import Logout from './Screens/logout';

import book from './Components/bookdetail';
import denda from './Components/denda';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div style={{ height:'100%'}}>
          
          <Router>
          <Nav />
            <Route exact path={'/'} component={HomePage} />
            <Route path ={'/books/'} component={List} />
            <Route path={'/book/:bookid'} component={book} />
            <Route path={'/booq/:bookid'} component={denda} />
            <Route path={'/books/:bookid'} component={UpdateBook} />
            <Route path={'/test/'} component={test} />
            <Route path={'/register/'} component={Register} />
            <Route path={'/login/'} component={Login} />
            <Route path={'/logout/'} component={Logout} />
          </Router>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
