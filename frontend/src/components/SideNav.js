import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SideNav extends Component {
    render() {
        return (
            <aside className="SideNav column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile" style={{ borderRight: "2px solid #ccc", backgroundColor: "#f5f5f5" }}>
                <div className="has-text-centered mb-5">
                    <h1 className="title is-5 mt-5">Navigation</h1>
                </div>
                <nav className="menu">
                    <ul className="menu-list">
                        <li><Link to="/" className="navbar-item">Dashboard</Link></li>
                        <li><Link to="/story" className="navbar-item">Management Story</Link></li>
                    </ul>
                </nav>
            </aside>
        );
    }
}

export default SideNav;
