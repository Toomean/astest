
import React, { Component } from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';

class Header extends Component {
    render () {
        const logoStyles = {
            backgroundImage : `url( ${ logo } )`
        }

        return (
            <header className="Header">
                <div className="Header__logo" style={ logoStyles }></div>
            </header>
        );
    }
}

export default Header;
