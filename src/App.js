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
import admin from "./Screens/admin";
import BorrowList from './Screens/BorrowList';
import Profile from './Screens/profile';

import Register from './Screens/register';
import Login from './Screens/login'
import Logout from './Screens/logout';

import book from './Components/bookdetail';
import denda from './Components/denda';

import pendingList from './Screens/pendingList'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div style={{ height:'100%'}}>
        
          <Router>
            <Nav/>
            <Route exact path={'/'} component={HomePage} />
            <Route exact path={'/register/'} component={Register} />
            <Route exact path={'/login/'} component={Login}/>
            <Route path={'/logout/'} component={Logout} />
            <Route path ={'/books/'} component={List} />
            <Route path={'/book/:bookid'} component={book} />
            <Route exact path={'/admin/'} component={admin} />
            <Route path={'/member/:userid'} component={BorrowList} />
            <Route exact path={'/member/'} component={Profile} />
            <Route exact path={'/admin/pending/'} component={pendingList} />

            <Route path={'/booq/:bookid'} component={denda} />
            <Route path={'/books/:bookid'} component={UpdateBook} />
            <Route path={'/test/'} component={test} />
           
          
          </Router>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
