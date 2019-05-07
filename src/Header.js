// Copyright 2019 Ross Hall
/*The simple header or banner of the application */
import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view_progression: false,
        }
    }
    render() {
        return (
            <header className="App-header">
                <h1>Chordage</h1>
                <div id='view-progression'>
                    <h5 id='view-text'>View Progression</h5>
                </div>
            </header>
        );
    }
}
export default Header;