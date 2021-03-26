import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
                <Link to="/chart" className="navbar-brand">Drug Cost Tracker</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Drug List</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/add" className="nav-link">Add New Drug</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/addBrand" className="nav-link">Add New Brand</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar