// Copyright 2019 Ross Hall
/*selection of extension notes */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {changeExtNotes} from './actions/index.js'
import store from './store/index.js';

const mapStateToProps = state => {
    return {
        ext_notes: state.chords[state.active_index].ext_notes,
        colors: state.colors,
    }
}

class connected_ESelect extends Component {
    extItemOnClick = (index) => {
        let arr = this.props.ext_notes.slice();
        arr[index] = !arr[index];
        store.dispatch(changeExtNotes(arr));
    }
    render() {
        const {
            props: {
                ext_notes,
                colors
            },
            extItemOnClick
        } = this

        const ext_list_items = ext_notes.map(function(bool, index){
            let styles;
            if (bool) {
                let color_index = ((index*2+7)%8);
                if (color_index === 7){
                    color_index--;
                }
                styles = {color: colors[color_index], border: "2px solid " + colors[color_index]}
            } 
            return <li 
                style={styles}
                key={index}
                onClick = {extItemOnClick.bind(this, index)}> <h6>{index * 2 + 7}</h6> </li>
        });
        return (
            <ul id='ext-list'>
                {ext_list_items}
            </ul>
        )
    }
}
const ESelect = connect(mapStateToProps)(connected_ESelect); 
export default ESelect;
