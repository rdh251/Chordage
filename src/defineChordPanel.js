import React, { Component } from 'react';
import RSelect from './rootSelector.js';
import MSelect from './modeSelector.js';
import TSelect from './triSelector.js';
import ESelect from './extSelector.js';
import PropTypes from 'prop-types'; // data validation

class DCPanel extends Component {
    constructor(props) {
        super(props);
 /*       this.state = {
            root: 'C',
            accidental: '=',
            mode: 'Aeolian',
            tri_notes: [true, true, false],
            ext_notes: [true, false, false, false]
        }*/
    }
    /*triOnClick = (index) => {
        let arr = this.state.tri_notes;
        arr[index] = !arr[index];
        this.setState({tri_notes: arr})
        console.log(index);
    }*/
   /* extOnClick = (index) => {
        let arr = this.state.ext_notes;
        arr[index] = !arr[index];
        this.setState({ext_notes: arr})
        console.log(index);
    }*/

    render() {
       /* const {
            triOnClick,
            extOnClick
        } = this*/
       /* const tri_list_items = this.state.tri_notes.map(function(bool, index){
            let class_list=""
            if (bool) {
                class_list += 'selected-note';
            } 
            return <li 
                className={class_list}
                key={index}
                onClick = {triOnClick.bind(this, index)}> <h6>{index * 2 + 1}</h6> </li>
        });*/
        /*const ext_list_items = this.state.ext_notes.map(function(bool, index){
            let class_list=""
            if (bool) {
                class_list += 'selected-note';
            } 
            return <li 
                className={class_list}
                key={index}
                onClick = {extOnClick.bind(this, index)}> <h6>{index * 2 + 7}</h6> </li>
        });*/

        return (
            <div class='panel-wrap'>
                <div id='theroot'>
                    <h3>Root:</h3>
                    <RSelect />
                </div>
                <div id='mode'>
                    <h3>Mode:</h3>
                    <MSelect />
                </div>
                <div id='triad'>
                    <h3><span>Triad:</span></h3>
                    <TSelect />
                </div>
                <div id='extensions'>
                    <h3><span>Ext:</span></h3>
                    <ESelect />
                </div>
            </div>
        );
    }
}

export default DCPanel;

/*
        <ul id='tri-list'>
            <li id='one'>1</li>
            <li id='three'>3</li>
            <li id='five'>5</li>
        </ul>
*/

/*
        makeTriList = () => {
            this.state.tri_notes.map(function(bool, index){
                let class_list=""
                if (bool) {
                    class_list += 'selected-note';
                } 
                return <li 
                    className={class_list}
                    label={index}
                    onClick = {liOnClick}> {index * 2 + 1} </li>
            });
        }
        makeExtList = () => {
            this.state.ext_notes.map(function(bool, index){
                let class_list=""
                if (bool) {
                    class_list += 'selected-note';
                } 
                return <li 
                    className={class_list}
                    label={index}
                    onClick = {liOnClick}> {index * 2 + 7} </li>
            });
        }
        tri_list_items = makeTriList();
        ext_list_items = makeExtList();
*/