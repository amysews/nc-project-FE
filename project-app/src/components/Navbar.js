import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ loggedInUser }) => {
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <img src="joyText.png" alt="Joy logo" id="navbar-logo" />
            </div>

            <div className="navbar-menu">
                <div className="navbar-start">
                    <NavLink to="/questions" activeClassName="selected-nav" className="nav-item" >Questions</NavLink>
                    <NavLink to="/dashboard" activeClassName="selected-nav" className="nav-item" >{loggedInUser ? "Personal Dashboard" : null}</NavLink>
                </div>
                <div className="navbar-end">
                    <NavLink to="/" onClick={() => this.props.setAppUser(null)} className="nav-item" >{loggedInUser ? `Hi ${loggedInUser.first_name}, not you? Click here to change user` : "Login"}</NavLink>
                </div>
            </div>
        </div>

    )
}

export default Navbar;