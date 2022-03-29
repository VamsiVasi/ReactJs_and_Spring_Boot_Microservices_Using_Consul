import React, { Component } from 'react';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-dark bg-dark">
                        <a href="http://localhost:3000" className="navbar-brand">Stark Employee System</a>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;