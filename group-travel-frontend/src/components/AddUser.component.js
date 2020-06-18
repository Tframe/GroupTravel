/*  Author: Trevor Frame
*   Description: 
*/

import React, { Component } from 'react';
import axios from 'axios'

import Navbar from './Navbar.component.js'
import Footer from "./Footer.component.js"

//utility function to verify password and verify_password match
//before creating user.
function verifyPasswordMatch(password, verify_password){
    if(password === verify_password){
        return true;
    }else{
        return false;
    }
}

//class used to create a user
export default class AddUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeVerifyPassword = this.onChangeVerifyPassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            email:'',
            password:'',
            verify_password: '',
            first_name: '',
            last_name: ''
        }
    }

    //form submit, add username
    onChangeUserName(event){
        this.setState({
            username: event.target.value
        });
    }
    //form submit, add username
    onChangeEmail(event){
        this.setState({
            email: event.target.value
        });
    }
    //form submit, add username
    onChangePassword(event){
        this.setState({
            password: event.target.value
        });
    }
    //form submit, add username
    onChangeVerifyPassword(event){
        this.setState({
            verify_password: event.target.value
        });
    }
    //form submit, add username
    onChangeFirstName(event){
        this.setState({
            first_name: event.target.value
        });
    }
    //form submit, add username
    onChangeLastName(event){
        this.setState({
            last_name: event.target.value
        });
    }

    //on submit form, create new user with input data
    onSubmit(event){
        event.preventDefault();

        if(verifyPasswordMatch(this.state.password, this.state.verify_password)){
            const user = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                first_name: this.state.first_name,
                last_name: this.state.last_name
            }
    
            axios.post(process.env.REACT_APP_BACKEND_DOMAIN + 'users/add', user)
            .then(res => console.log(res.data));
            this.setState({
                username: '',
                email:'',
                password:'',
                first_name: '',
                last_name: ''
            })
            window.location.href = "/"
        }else{
            window.alert("Password and verify password don't match.");
        }
    }
    //form used to create a user
    render(){
        return (
            <div>
                <Navbar />
                <h3>Create User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Name: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.first_name}
                        onChange={this.onChangeFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.last_name}
                        onChange={this.onChangeLastName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUserName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                        required
                        className="form-control"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Verify Password: </label>
                        <input type="password"
                        required
                        className="form-control"
                        value={this.state.verify_password}
                        onChange={this.onChangeVerifyPassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/> 
                    </div>
                </form>
                <Footer />
            </div>
        )
    }
}