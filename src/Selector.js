// Copyright 2019 Ross Hall
/* Used to navigate through chords in the progression list */
import React, { Component } from 'react';
import store from './store/index.js';
import {connect} from 'react-redux';
import { changeActiveIndex } from './actions/index.js';

const mapStateToProps = state => {
    return {
        chords: state.chords,
        active_index: state.active_index,
        visible_diagram_indices: state.visible_diagram_indices,
    }
}
class connected_Selector extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }
    /*used to track the list item centerd in the screen and makes that
    the selected chord by changing the active index*/ 
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
            let list = document.getElementById('svg-list');
            if (list) {
                itemWidth = list.offsetWidth;
                list.scrollLeft = this.props.visible_diagram_indices[i] * itemWidth;
            }
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
                        return (<li key={index} className='selected'><h6>{child.getNameAsString()}</h6></li>);
                    } else {
                        return (<li key={index}><h6>{child.getNameAsString()}</h6></li>);
                    }
                })}
                <li></li>
            </ul>
        );
    }
}
const Selector = connect(mapStateToProps)(connected_Selector); 
export default Selector;
