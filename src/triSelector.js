// Copyright 2019 Ross Hall
/*triad note selection in the control panel.*/

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {changeTriNotes} from './actions/index.js'
import store from './store/index.js';

const mapStateToProps = state => {
    return {
        tri_notes: state.chords[state.active_index].tri_notes,
        colors: state.colors,
    }
}
class connected_TSelect extends Component {
    triItemOnClick = (index) => {
        let arr = this.props.tri_notes.slice();
        for (let i= 0; i < arr.length; i++) {
        }
        arr[index] = !arr[index];
        store.dispatch(changeTriNotes(arr));
    }
    render() {
        const {
            props: {
                tri_notes,
                colors
            },
            triItemOnClick
        } = this
        const tri_list_items = tri_notes.map(function(bool, index){
            let styles;
            if (bool) {
                let color_index = index*2;
                styles = {color: colors[color_index], border: "2px solid " + colors[color_index]}
            } 
            return <li 
                style={styles}
                key={index}
                onClick = {triItemOnClick.bind(this, index)}> <h6>{index * 2 + 1}</h6> </li>
        });
        return (
            <ul id='tri-list'>
                {tri_list_items}
            </ul>
        )
    }
}
const TSelect = connect(mapStateToProps)(connected_TSelect); 
export default TSelect;