import React, { Component } from 'react';
import {connect} from 'react-redux';
import {changeTriNotes} from './actions/index.js'
import PropTypes from 'prop-types'; // data validation
import store from './store/index.js';

const mapStateToProps = state => {
    return {
        tri_notes: state.chords[state.active_index].tri_notes,
    }
}

class connected_TSelect extends Component {
    constructor(props) {
        super(props);
    }
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
                tri_notes
            },
            triItemOnClick
        } = this
        console.log(tri_notes);
        const tri_list_items = tri_notes.map(function(bool, index){
            let class_list=""
            if (bool) {
                class_list += 'selected-note';
            } 
            return <li 
                className={class_list}
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