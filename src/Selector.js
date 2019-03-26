import React, { Component } from 'react';
import store from './store/index.js';
import {connect} from 'react-redux';
import theReducer from './reducers/index.js';
import { changeActiveIndex } from './actions/index.js';

const mapStateToProps = state => {
    return {
        chords: state.chords,
        active_index: state.active_index
    }
}

class connected_Selector extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }
    handleScroll() {
        let el = document.getElementById('chordHolder')
        let scrollOffset = el.scrollLeft;
        let itemWidth = el.offsetWidth / 3.0;
        let i = 0;
        while ((i) * itemWidth <= scrollOffset - (itemWidth/2.0)) {
            i++;
        }
        if (i !== this.props.active_index) {
            store.dispatch( changeActiveIndex(i) );
        }
    }

    render() {
        const {props: {
                chords,
                active_index,
            },
            handleScroll
        } = this;
        return (
            <ul id='chordHolder' onScroll={handleScroll}>
                <li></li>
                {chords.map((child, index) => {
                    if (index === active_index) { 
                        return (<li className='selected'><h6>{child.getNameAsString()}</h6></li>);
                    } else {
                        return (<li><h6>{child.getNameAsString()}</h6></li>);
                    }
                })}
                <li></li>
            </ul>
        );
    }
}
const Selector = connect(mapStateToProps)(connected_Selector); 
export default Selector;
