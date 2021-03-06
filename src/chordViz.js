// Copyright 2019 Ross Hall
/* The ChordViz component takes a list on specific chord instances and 
translates them into a list of chord diagram SVG's */
import React, { Component } from 'react';
import store from './store/index.js';
import {connect} from 'react-redux';
import {changeDiagramIndex} from './actions/index.js';

const mapStateToProps = state => {
    return {
        active_index: state.active_index,
        specific_chords: state.specific_chords[state.active_index],
        visible_diagram_indices: state.visible_diagram_indices,
        selected_chord_index: state.selected_indices[state.active_index],
        scale: state.scales[state.active_index],
        colors: state.colors
    }
}
class connected_ChordViz extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }
    handleScroll() {
        let el = document.getElementById('svg-list')
        let scrollOffset = el.scrollLeft;
        let itemWidth = el.offsetWidth;
        let i = 0;
        while ((i) * itemWidth <= scrollOffset - (itemWidth / 2)) {
            i++;
        }
        if (i !== this.props.visible_diagram_indices[this.props.active_index]) {
            store.dispatch( changeDiagramIndex(this.props.active_index, i) );
        }
    }
    makeSVG = (notes, scale, colors) => {
        let string_number = notes.length;
        let string_span = 100/(string_number + 1);

        let x_coords = [];
        for (let i = 0; i < string_number; i++) {
            x_coords.push(((i+1) * string_span) +'%');
        }
        let fret_number = 5;
        let fret_span = 100/(fret_number + 1);
        let y_coords = [];
        for (let i = 0; i < fret_number + 1; i++) {
            y_coords.push(((i+1) * fret_span) + '%');
        }
        let fret_x1 = (fret_span - 7) + '%';
        let fret_x2 = ((fret_span * (string_number-1)) + 7) + '%';
        
        let circle_radius = (string_span / 2.5);
        let radius_str = circle_radius +'%';
        
        let hi_fret = -100;
        let lo_fret = 100;
        for (let i = 0; i < notes.length; i++) {
            if (notes[i] !== null && notes[i].index !== 0 && notes[i].index < lo_fret) {
                lo_fret = notes[i].index;
            }
            if (notes[i] !== null && notes[i].index !== 0 && notes[i].index > hi_fret) {
                hi_fret = notes[i].index;
            }
        }
        let chord_span;
        if (hi_fret === 100) {
            chord_span = 0;
        } else {
            chord_span = hi_fret - lo_fret + 1;
        }
        let chord_padding = Math.floor((fret_number - chord_span) / 2);
        
        let chord_shift = lo_fret - chord_padding;
        let diagram_base;
        if(chord_shift < 0) {
            chord_shift = 1;
            diagram_base = 1
        } else {
            diagram_base = chord_shift;
        }

        let shifted_notes = []
        for (let i = 0; i < notes.length; i++) {
            if (notes[i] === null){
                shifted_notes.push(null);
            } else if (notes[i].index === 0) {
                shifted_notes.push({index:1, note:notes[i].note});
            } else {
                shifted_notes.push({index:notes[i].index - chord_shift + 2, note:notes[i].note});
            }
        }
        return(
            <svg className='the-svg' style={{margin: 'auto', width:'50%', height:'50%'}}>
                {y_coords.map((y_coord, index)=> {
                    if (index === 0) {
                        return <line key={index} x1='0%' y1={y_coord} x2='100%' y2={y_coord} style={{stroke: 'orange', width: '12'}}></line>;
                    } else {
                        return <line key={index} x1={fret_x1} y1={y_coord} x2={fret_x2} y2={y_coord} style={{stroke: 'gold', width: '10'}}></line>;
                    }
                })}
                <text x='2%' y={(fret_span-1) + '%'} fill="white">0</text>
                <text x='2%' y={(fret_span+5) + '%'} fill="white">{diagram_base}</text>
                {x_coords.map((x_coord, index) => {
                    return <line key={index} x1={x_coord} y1='0%' x2={x_coord} y2='100%' style={{stroke: 'white', width: '10'}}></line>;
                })}
                {shifted_notes.map((note, index) => {
                    if (note === null) {
                        return null
                    } else {
                        let x_center = string_span*(index+1) +'%';
                        let y_center = fret_span*note.index - circle_radius + '%';
                        let color;
                        for(let i = 0; i<colors.length; i++) {
                            if (note.note.root === scale[i].root &&
                                note.note.accidental === scale[i].accidental) {
                                    color=colors[i];
                                }
                            }  
                        return <circle key={index} cx={x_center} cy={y_center} r={radius_str} fill={color}></circle>
                    }
                })}
            </svg>
        );
    }
    render() {
        const {
            props: {
                specific_chords,
                selected_chord_index,
                scale,
                colors
            },
            handleScroll,
            makeSVG
        } = this;
        return(
            <ul id='svg-list' onScroll={handleScroll}>
                {specific_chords.map((arr, index) => {
                    if (index === selected_chord_index) {
                        return <li key={index} className='selected'><h6 id='the-chosen-one'>Selected</h6> {makeSVG(arr, scale, colors)}</li>
                    } else {
                        return <li key={index}>{makeSVG(arr, scale, colors)}</li>
                    }
                })}    
            </ul>
        );
    }
}
const ChordViz = connect(mapStateToProps)(connected_ChordViz); 
export default ChordViz;