import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Homepage </Link> </li>
                    <li><Link to="/Cards"> Cards</Link></li>
                    <li><Link to="/Createyourcard"> Create your card</Link> </li>
                    <li><Link to="/About"> About </Link></li>
                </ul>
            </nav>
        </header>
    )
}
