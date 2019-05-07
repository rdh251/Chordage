// Copyright 2019 Ross Hall
/* selection of root in control panel */
import React, { Component } from 'react';
import store from './store/index.js';
import {connect} from 'react-redux';
import {
    changeRoot,
    changeAccidental
} from './actions/index.js'
import {A, 
    B, 
    C, 
    D, 
    E, 
    F, 
    G,
    SHARP,
    NATURAL,
    FLAT} from './constants/music.js';

const mapStateToProps = state => {
    return {
        root: state.chords[state.active_index].root,
        accidental: state.chords[state.active_index].accidental
    }
}
class connected_RSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRMenu: false,
            showAMenu: false,
        }
    }
    rootClicker = () => {
        this.setState({showRMenu: true});
    }
    rootSelector = (letter) => {
        this.setState({
            showRMenu: false,
        });
        store.dispatch(changeRoot(letter))
    }
    accClicker = () => {
        this.setState({showAMenu: true});
    }
    accSelector = (symbol) => {
        this.setState({
            showAMenu: false,
        });
        store.dispatch(changeAccidental(symbol))
    }
    render() {
        const {
            props: {
                root,
                accidental
            },
            state: {
                showRMenu,
                showAMenu
            },
            rootClicker,
            rootSelector,
            accClicker,
            accSelector
        } = this;
        let r;
        let a;
        if (showRMenu) {
            r = 
                <ul id='root-menu'>
                    <li onClick={rootSelector.bind(this, A)}><h6>{A}</h6></li>
                    <li onClick={rootSelector.bind(this, B)}><h6>{B}</h6></li>
                    <li onClick={rootSelector.bind(this, C)}><h6>{C}</h6></li>
                    <li onClick={rootSelector.bind(this, D)}><h6>{D}</h6></li>
                    <li onClick={rootSelector.bind(this, E)}><h6>{E}</h6></li>
                    <li onClick={rootSelector.bind(this, F)}><h6>{F}</h6></li>
                    <li onClick={rootSelector.bind(this, G)}><h6>{G}</h6></li>
                </ul>
        } else {
            r = <div id='the-root' onClick={rootClicker}><h6>{root}</h6></div>
        }
        if (showAMenu) {
            a = 
                <ul id='accidental-menu'>
                    <li onClick={accSelector.bind(this, SHARP)}><h6>{SHARP}</h6></li>
                    <li onClick={accSelector.bind(this, NATURAL)}><h6>{NATURAL}</h6></li>
                    <li onClick={accSelector.bind(this, FLAT)}><h6>{FLAT}</h6></li>
                </ul>
        } else {
            a = <div id='the-accidental' onClick={accClicker}><h6>{accidental}</h6></div>
        }
        return(
            <div id='root-container'>
                {r}
                {a}
            </div>
        )
    }
}
const RSelect = connect(mapStateToProps)(connected_RSelect); 
export default RSelect;