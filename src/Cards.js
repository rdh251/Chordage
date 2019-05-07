// Copyright 2019 Ross Hall
/* The card1 component is displayed directly below the top banner
and contains the color mapping of scale degrees

The card2 component is displayed directly above the control panel 
and contains buttons for setting a chord and chaning the chord 
progression by adding or deleting chords*/

import React, { Component } from 'react';
import store from './store/index.js';
import {connect} from 'react-redux';
import {
    changeProgression,
    changeSelectedChord
} from './actions/index.js';

const mapStateToPropsC1 = state => {
    return {
        colors: state.colors,
    }
}
const mapStateToPropsC2 = state => {
    return {
        active_index: state.active_index,
        visible_index: state.visible_diagram_indices[state.active_index],  
        test: state.visible_diagram_indices
    }
}
class connected_card1 extends Component {
    render() {
        const {
            props: {
                colors
            },
        } = this;
        return (
            <div id="card1" className="card">
                <ul id='color-index'>
                    {colors.map((color, index) => {
                        return <li key = {index} style={{'backgroundColor':color}}><h6>{index+1}</h6></li>
                    })}
                </ul>
            </div>
        );
    }
}
class connected_card2 extends Component {
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
    setChord = (active_index, visible_index) => {
        store.dispatch(changeSelectedChord(active_index, visible_index));
    }
    render() {
        const {
            props: {
                active_index,
                visible_index,
            },
            state: {
                showMenu,
            },
            optionClicker,
            optionSelector,
            setChord,
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
                    <h3 onClick={setChord.bind(this, active_index, visible_index)}>Set Chord</h3>
                </div>
                {cp_options}
            </div>
        );
    }
}
const Card1 = connect(mapStateToPropsC1)(connected_card1); 
const Card2 = connect(mapStateToPropsC2)(connected_card2);
export {
    Card1,
    Card2,
}