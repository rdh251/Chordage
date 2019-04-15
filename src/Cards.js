import React, { Component } from 'react';
import store from './store/index.js';
import {connect} from 'react-redux';
import {changeProgression} from './actions/index.js';

class Card1 extends Component {
    render() {
        return (
            <div id="card1" className="card"></div>
        );
    }
}
class Card2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        }
    }
    optionClicker = () => {
        this.setState({showMenu: true});
    }
    optionSelector = (string) => {
        this.setState({
            showMenu: false,
        });
        store.dispatch(changeProgression(string))
    }
    render() {
        const {
            props: {
                mode
            },
            state: {
                showMenu,
            },
            optionClicker,
            optionSelector,
        } = this;
        let cp_options;
        let cp_button =
            <div id='change-progression' onClick={optionClicker}>
                <h3>Change Progression</h3>
            </div>;
        if (showMenu) {
            cp_options =                 
            <ul id='option-menu'>
                <li onClick={optionSelector.bind(this, "BEFORE")}><h6>Insert Before</h6></li>
                <li onClick={optionSelector.bind(this, "AFTER")}><h6>Insert After</h6></li>
                <li onClick={optionSelector.bind(this, "DELETE")}><h6>Delete</h6></li>
            </ul>;
        }

        return (
            <div id="card2" className="card">
                {cp_button}
                <div>
                    <h3>View Progression</h3>
                </div>
                {cp_options}
            </div>
        );
    }
}
class Card3 extends Component {
    render() {
        return (
            <div id="card3" className="card"></div>
        );
    }
}
export {
    Card1,
    Card2,
    Card3
}