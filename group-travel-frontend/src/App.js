/*  Author: Trevor Frame
*   Description: 
*/
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login.component';
import AddUser from './components/AddUser.component';

function App() {
    return (
        <Router>
                <Route path='/' exact component={Login} />
                <Route path='/AddUser' component={AddUser} />
        </Router>
    )
}

export default App;