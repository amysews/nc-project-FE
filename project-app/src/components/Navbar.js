import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div className="container">
                <NavLink to="/" className="nav-item" > Home</NavLink>
                <NavLink to="/questions" className="nav-item" >Questions</NavLink>
            </div>
            {/* <NavLink to="/users"> Users</NavLink>
            {/* {'  |  '}
            <NavLink to="/submitQuestion">Submit a Question</NavLink> */}

        </nav>

    )
}

export default Navbar;