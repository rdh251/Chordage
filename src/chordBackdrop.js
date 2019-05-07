// Copyright 2019 Ross Hall
/* The ChordBackdrop component serves as a placeholder
for the chordViz component. */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import ChordViz from './chordViz.js';

const mapStateToProps = state => {
    return {
        specific_chords_length: state.specific_chords[state.active_index].length,
        visible_diagram_index: state.visible_diagram_indices[state.active_index],
        selected_chord_index: state.selected_indices[state.active_index],
    }
}
class connected_ChordBackdrop extends Component {
    render() {
        const {props: {
                specific_chords_length,
                visible_diagram_index
            }
        } = this;
        let left_arrow = null;
        let right_arrow = null;
        if (visible_diagram_index !== 0) {
            left_arrow = <div id='l-cDiagram-arrow'></div>
        }
        if (visible_diagram_index !== specific_chords_length - 1) {
            right_arrow = <div id='r-cDiagram-arrow'></div>
        }
        return (
            <div id="chordBackdrop">
                <ChordViz />
                <h3 id='index-indicator'>{visible_diagram_index + 1} / {specific_chords_length}</h3>
                {left_arrow}
                {right_arrow}
            </div>
        );
    }
}
const ChordBackdrop = connect(mapStateToProps)(connected_ChordBackdrop); 
export default ChordBackdrop;
