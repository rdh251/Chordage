// Copyright 2019 Ross Hall
/* the boardBackdrop component serves only as a placeholder 
to attach the boardViz component*/

import React, { Component } from 'react';
import {connect} from 'react-redux';
import BoardViz from './boardViz.js';

const mapStateToProps = state => {
    return {
        specific_chords_length: state.specific_chords[state.active_index].length,
        visible_diagram_index: state.visible_diagram_indices[state.active_index],
        selected_chord_index: state.selected_indices[state.active_index],
    }
}
class connected_BoardBackdrop extends Component {
    render() {
        return (
            <div id="bhordBackdrop">
                <BoardViz />
            </div>
        );
    }
}
const BoardBackdrop = connect(mapStateToProps)(connected_BoardBackdrop); 
export default BoardBackdrop;

