/*  Author: Trevor Frame
*   Description:  
*/

import React, { Component } from "react"
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component{
    
    constructor(props){
        super(props);

        this.onSubmitUsername = this.onSubmitUsername.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.validateLogin = this.validateLogin.bind(this);

        this.state={
            users: [],
            username:'',
            password:''
        }
        
    }

    //when page renders, get list of users in mongodb
    componentDidMount(){

        axios.get(process.env.REACT_APP_BACKEND_DOMAIN + '/users')
            .then(res => {
                this.setState({ users: res.data})
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //set username entered
    onSubmitUsername(event){
        this.setState({
            username: event.target.value
        })
    }

    //set password entered
    onSubmitPassword(event){
        this.setState({
            password: event.target.value
        })
    }

    //function that validates username and password match what's in database.
    validateLogin(event){
        event.preventDefault();

        const login_info = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(process.env.REACT_APP_BACKEND_DOMAIN + '/users/auth', login_info)
        .then((res) => {
            console.log("HELLO");
            window.location.href = "/MyTrips"
        })
        .catch((err) => {
            console.log(err);
            alert("Invalid login attempt!");
        });

    }
    //loginbox rendering
    render() {
        return(
            <div className="login_parent">
                <div className="login_box">
                    <h2 className="login">Group Travel Login</h2>
                    <form id="login_form" className="login_form" onSubmit={this.validateLogin}>
                        <label className="user_name">User Name: </label>
                        <input  id="user_name" 
                                type="text" 
                                name="User Name" 
                                placeholder="User Name" 
                                onChange={this.onSubmitUsername}/>
                        <label className="password">Password: </label>
                        <input  id="password" 
                                type="password" 
                                name="Password" 
                                placeholder="************"
                                onChange={this.onSubmitPassword}/>
                        <input type="submit" value="Login" id="Submit" className="Submit"/>
                    </form>
                    <div className="bottom_container">
                        <Link className="create_user" to='/AddUser' >Create profile</Link>
                    </div>
                    <div className="bottom_container">
                        <Link className="forgot_password" to='/ForgotPassword' >Forgot Password</Link>
                    </div>
                </div>
            </div>
        )
    }
}
