import React, { Component } from 'react';
import {connect} from 'react-redux';
import {changeExtNotes} from './actions/index.js'
import PropTypes from 'prop-types'; // data validation
import store from './store/index.js';

const mapStateToProps = state => {
    return {
        ext_notes: state.chords[state.active_index].ext_notes,
    }
}

class connected_ESelect extends Component {
    constructor(props) {
        super(props);
    }
    extItemOnClick = (index) => {
        let arr = this.props.ext_notes.slice();
        arr[index] = !arr[index];
        store.dispatch(changeExtNotes(arr));
    }
    render() {
        const {
            props: {
                ext_notes
            },
            extItemOnClick
        } = this

        const ext_list_items = ext_notes.map(function(bool, index){
            let class_list=""
            if (bool) {
                class_list += 'selected-note';
            } 
            return <li 
                className={class_list}
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
