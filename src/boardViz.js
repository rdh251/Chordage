// Copyright 2019 Ross Hall
/*
BoardViz translates a specific chord instance into a full frettboard chord visualization
*/
import React, { Component } from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        the_chord: state.specific_chords[state.active_index][state.selected_indices[state.active_index]],
        scale: state.scales[state.active_index],
        colors: state.colors
    }
}
class connected_BoardViz extends Component {
    makeSVG = (notes, scale, colors) => {
        let string_number = 6
        let string_span = 100/(string_number + 1);

        let x_coords = [];
        for (let i = 0; i < string_number; i++) {
            x_coords.push(((i+1) * string_span) +'%');
        }
        let fret_number = 16;
        let fret_span = 100/(fret_number + 1);
        let y_coords = [];
        for (let i = 0; i < fret_number + 1; i++) {
            y_coords.push(((i+1) * fret_span) + '%');
        }
        let fret_x1 = (string_span - 7) + '%';
        let fret_x2 = ((string_span * (string_number)) + 7) + '%';
        
        let circle_radius = (string_span / 5.5);
        let radius_str = circle_radius +'%';
        
        return(
            <svg class='the-svg' style={{margin: 'auto', width:'30%', height:'70%'}}>
                {y_coords.map((y_coord, index)=> {
                    if (index === 0) {
                        return <line x1='0%' y1={y_coord} x2='100%' y2={y_coord} style={{stroke: 'orange', width: '12'}}></line>;
                    } else {
                        return <line x1={fret_x1} y1={y_coord} x2={fret_x2} y2={y_coord} style={{stroke: 'gold', width: '10'}}></line>;
                    }
                })}
                {x_coords.map(x_coord => {
                    return <line x1={x_coord} y1='0%' x2={x_coord} y2='100%' style={{stroke: 'white', width: '10'}}></line>;
                })}
                {notes.map((note, index) => {
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
                        return <circle cx= {x_center} cy={y_center} r={radius_str} fill={color}></circle>
                    }
                })}
            </svg>
        );
    }
    render() {
        const {
            props: {
                the_chord,
                scale,
                colors
            },
            makeSVG
        } = this;
        return(
            makeSVG(the_chord, scale, colors)
        );
    }
}
const BoardViz = connect(mapStateToProps)(connected_BoardViz); 
export default BoardViz;