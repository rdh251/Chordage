
import React, { Component } from 'react';
import store from './store/index.js';
import {connect} from 'react-redux';
import {} from './actions/index.js'
import PropTypes from 'prop-types'; // data validation
import {A, 
    B, 
    C, 
    D, 
    E, 
    F, 
    G,
    SHARP,
    NATURAL,
    FLAT} from './constants/music.js';
import {note_instance, chord_instance} from './classes/specificChord.js';

class ChordTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
/*        let notes = [
            {'string': 1, 'fret': 3},
            {'string': 3, 'fret': 4},
            {'string': 4, 'fret': 4},
            {'string': 5, 'fret': 3},
        ]*/
        let makeSVG = (notes) => {
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
                console.log("fretspan: " + fret_span);
                console.log("fret: " + (i+1));

                y_coords.push(((i+1) * fret_span) + '%');
            }
            console.log('*************y_coords***********');
            console.log("fretspan: " + fret_span);
            console.log(y_coords);
            console.log('*************y_coords***********\n');
            let fret_x1 = (fret_span - 7) + '%';
            let fret_x2 = ((fret_span * (string_number-1)) + 7) + '%';
            
            let circle_radius = (string_span / 2.5);
            let radius_str = circle_radius +'%';
            
            let hi_fret = -100;
            let lo_fret = 100;
            for (let i = 0; i < notes.length; i++) {
                if (notes[i] !== 0 && notes[i] !== null && notes[i] < lo_fret) {
                    lo_fret = notes[i];
                }
                if (notes[i] !== 0 && notes[i] !== null && notes[i] > hi_fret) {
                    hi_fret = notes[i];
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
            console.log("hi_fret: " + hi_fret);
            console.log("lo_fret: " + lo_fret);
            console.log("chord_span: " + chord_span);
            console.log("chord_padding: " + chord_padding);
            console.log("chord_shift: " + chord_shift);
            console.log('0');
            console.log(lo_fret - chord_padding);
            console.log(hi_fret + chord_padding);
            console.log('*********************************');
            let shifted_notes = []
            for (let i = 0; i < notes.length; i++) {
                if (notes[i] === null){
                    shifted_notes.push(null);
                } else if (notes[i] === 0) {
                    shifted_notes.push(1);
                } else {
                    shifted_notes.push(notes[i] - chord_shift + 2);
                }
            }
            return(
                <svg style={{width:'100%', height:'100%'}}>
                    {y_coords.map((y_coord, index)=> {
                        if (index === 0) {
                            return <line x1='0%' y1={y_coord} x2='100%' y2={y_coord} style={{stroke: 'orange', width: '12'}}></line>;
                        } else {
                            return <line x1={fret_x1} y1={y_coord} x2={fret_x2} y2={y_coord} style={{stroke: 'gold', width: '10'}}></line>;
                        }
                    })}
                    <text x='2%' y={(fret_span-1) + '%'} fill="white">0</text>
                    <text x='2%' y={(fret_span+5) + '%'} fill="white">{chord_shift}</text>
                    {x_coords.map(x_coord => {
                        return <line x1={x_coord} y1='0%' x2={x_coord} y2='100%' style={{stroke: 'white', width: '10'}}></line>;
                    })}
                        {console.log('*************y_centers***********')}

                    {shifted_notes.map((note, index) => {
                        if (note === null) {
                            return
                        } else {
                            let x_center = string_span*(index+1) +'%';
                            let y_center = fret_span*note - circle_radius + '%';
                            console.log("fretspan: " + fret_span);
                            console.log("note: " + note);
                            console.log(y_center);
                            return <circle cx= {x_center} cy={y_center} r={radius_str} fill='yellow'></circle>
                        }
                    })}
                    {console.log('*************y_centers***********\n')}
                </svg>
            );
        }
        /*let myChord = new chord_instance(); 
        let string_number = 6
        let string_span = 100/(string_number + 1);

        let x_coords = [];
        for (let i = 0; i < string_number; i++) {
            x_coords.push(((i+1) * string_span) +'%');
        }
        let fret_number = 5;
        let fret_span =  100/(fret_number + 1);
        let y_coords = [];
        for (let i = 0; i < fret_number + 1; i++) {
            y_coords.push(((i+1) * fret_span) + '%');
        }
        let fret_x1 = (fret_span - 7) + '%'
        let fret_x2 = ((fret_span * (string_number-1)) + 7) + '%';

        let circle_radius = (string_span / 2.5);
        let radius_str = circle_radius +'%';
        let x_coord = string_span*1 + '%';
        let y_coord = fret_span*5 - circle_radius + '%';
        
        console.log('x*************************')
        console.log (x_coords);
        console.log(x_coord);
        console.log('y**********************')
        console.log(y_coord);
        console.log(y_coords);*/
        //let arr = [7, null, 8, 8, 7, null];
        let arr = [9, 11, 11, 10, 9, 9];
        return(
                makeSVG(arr)
                /*<svg style={{width:'100%', height:'100%'}}>
                    <line x1={fret_x1} y1={y_coords[0]} x2={fret_x2} y2={y_coords[0]} style={{stroke: 'gold', width: '10'}}></line>
                    <line x1={fret_x1} y1={y_coords[1]} x2={fret_x2} y2={y_coords[1]} style={{stroke: 'gold', width: '10'}}></line>
                    <line x1={fret_x1} y1={y_coords[2]} x2={fret_x2} y2={y_coords[2]} style={{stroke: 'gold', width: '10'}}></line>
                    <line x1={fret_x1} y1={y_coords[3]} x2={fret_x2} y2={y_coords[3]} style={{stroke: 'gold', width: '10'}}></line>
                    <line x1={fret_x1} y1={y_coords[4]} x2={fret_x2} y2={y_coords[4]} style={{stroke: 'gold', width: '10'}}></line>
                    <line x1={fret_x1} y1={y_coords[5]} x2={fret_x2} y2={y_coords[5]} style={{stroke: 'gold', width: '10'}}></line>
                    
                    <line x1={x_coords[5]} y1='0%' x2={x_coords[5]} y2='100%' style={{stroke: 'white', width: '10'}}></line>
                    <line x1={x_coords[4]} y1='0%' x2={x_coords[4]} y2='100%' style={{stroke: 'white', width: '10px'}}></line>
                    <line x1={x_coords[3]} y1='0%' x2={x_coords[3]} y2='100%' style={{stroke: 'white', width: '10px'}}></line>
                    <line x1={x_coords[2]} y1='0%' x2={x_coords[2]} y2='100%' style={{stroke: 'white', width: '10px'}}></line>
                    <line x1={x_coords[1]} y1='0%' x2={x_coords[1]} y2='100%' style={{stroke: 'white', width: '10px'}}></line>
                    <line x1={x_coords[0]} y1='0%' x2={x_coords[0]} y2='100%' style={{stroke: 'white', width: '10px'}}></line>
                    {notes.map(note => {
                        let x_coord = string_span*note.string +'%';
                        let y_coord = fret_span*note.fret-circle_radius + '%';
                        return <circle cx= {x_coord} cy={y_coord} r={radius_str} fill='yellow'></circle>
                    })}

                </svg>*/
        );
    }
}

export default ChordTab;