import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ loggedInUser }) => {
    return (
        <nav className="navbar-menu">
            <div className="container navbar-start">
                <NavLink to="/questions" className="nav-item" >Questions</NavLink>
                <NavLink to="/dashboard" className="nav-item" >{loggedInUser ? "Personal Dashboard" : null}</NavLink>
            </div>
            <div className="container navbar-end">
                <NavLink to="/" onClick={() => this.props.setAppUser(null)} className="nav-item" >{loggedInUser ? `Hi ${loggedInUser.first_name}, not you? Click here to change user` : "Login"}</NavLink>
            </div>
        </nav>

    )
}

export default Navbar;