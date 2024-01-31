import React from 'react';
import logo from "../assets/logo.png";

function HeaderComponent(props) {
    return (
        <div className="outer-container header">
            <nav className="column">
                <a className="row" href="http://localhost:3000/pokemonplay/">
                    Pokemon Play Application
                </a>
            </nav>
            <header className="inner-container">
                <header>
                    <img alt="logo" src={logo}/>
                </header>

            </header>
        </div>
    );
}

export default HeaderComponent;