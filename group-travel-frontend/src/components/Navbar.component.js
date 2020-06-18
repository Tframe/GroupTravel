/*  Author: Trevor Frame
*   Description: 
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-custom navbar-expand">
                <Link to="/" className="navbar-brand">Home</Link>
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/MyTrips" className="nav-link">My Trips</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/CreateTrip" className="nav-link">Create a Trip</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}