import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import "materialize-css/dist/css/materialize.min.css";
import '../css/App.css';

import Test from "./Test";
import HomePage from "./HomePage";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { Provider } from 'react-redux'
import store from '../store/index'
import NavBar from "./NavBar";
import Footer from "./Footer";
import LoginDash from "./LoginDash";
import RegisterDash from "./RegisterDash";

import Dashboard from "./Dashboard";
import AdminDash from "./admin/AdminDash";
// import DonationProcess from "./preparation/donationProcess";
// import DonationTypes from "./preparation/donationTypes";
// import Eligibility from "./preparation/eligibility";

class App extends Component{

  render() {
    return (
        <Provider store={store}>
            <Router>
                <div >
                    <NavBar/>
                    <div className="w-responsive text-center mx-auto p-3 mt-2" sm={6}>
                        <Switch>

                            <Route exact path="/">
                                <HomePage />
                            </Route>
                            <Route exact path="/about">
                                <Test />
                            </Route>
                                <Route exact path="/login">
                                <LoginDash/>
                            </Route>
                            <Route exact path="/register">
                                <RegisterDash/>
                            </Route>
                            <Route exact path="/dashboard">
                                <Dashboard />
                            </Route>

                            <Route exact path="/admindash">
                                <AdminDash />
                            </Route>

                            {/* <Route exact path="/donationProcess">
                                <DonationProcess />
                            </Route>

                            <Route exact path='/eligibility'>
                                <Eligibility/>
                            </Route>

                            <Route exact path='/donationTypes'>
                                <DonationTypes />
                            </Route> */}

                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </Router>
        </Provider>
    );
  }


}

export default App;
