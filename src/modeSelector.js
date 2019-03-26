import React, { Component } from 'react';
import {connect} from 'react-redux';
import {changeMode} from './actions/index.js'
import {IONIAN, 
    DORIAN, 
    PHRYGIAN, 
    LYDIAN, 
    MIXOLYDIAN, 
    AEOLIAN, 
    LOCRIAN} from './constants/music.js';
import PropTypes from 'prop-types'; // data validation
import store from './store/index.js';

const mapStateToProps = state => {
    return {
        mode: state.chords[state.active_index].mode,
    }
}

class connected_MSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        }
    }
    modeClicker = () => {
        this.setState({showMenu: true});
    }
    modeSelector = (string) => {
        this.setState({
            showMenu: false,
        });
        store.dispatch(changeMode(string))
    }
    render() {
        const {
            props: {
                mode
            },
            state: {
                showMenu,
            },
            modeClicker,
            modeSelector,
        } = this;
        
        if (!showMenu) {
            return(    
              <div id='mode-container'>
                <div id='the-mode' onClick={modeClicker}><h6>{mode}</h6></div>
              </div>  
            );
        } else {
            return(
                <div id='mode-container'>
                    <ul id='mode-list'>
                        <li onClick={modeSelector.bind(this, IONIAN)}><h6>{IONIAN}</h6></li>
                        <li onClick={modeSelector.bind(this, DORIAN)}><h6>{DORIAN}</h6></li>
                        <li onClick={modeSelector.bind(this, PHRYGIAN)}><h6>{PHRYGIAN}</h6></li>
                        <li onClick={modeSelector.bind(this, LYDIAN)}><h6>{LYDIAN}</h6></li>
                        <li onClick={modeSelector.bind(this, MIXOLYDIAN)}><h6>{MIXOLYDIAN}</h6></li>
                        <li onClick={modeSelector.bind(this, AEOLIAN)}><h6>{AEOLIAN}</h6></li>
                        <li onClick={modeSelector.bind(this, LOCRIAN)}><h6>{LOCRIAN}</h6></li>
                    </ul>
                </div>
            )
        }
    }
}
const MSelect = connect(mapStateToProps)(connected_MSelect); 
export default MSelect;