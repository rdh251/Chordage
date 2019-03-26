import React, { Component } from 'react';
import store from './store/index.js';
import {connect} from 'react-redux';
import ChordTab from './chordTab.js';
import {general_chord, general_note} from './classes/generalChord.js';
import {chord_finder} from './classes/specificChord.js';
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
    FLAT,
    MIXOLYDIAN} from './constants/music.js';

const mapStateToProps = state => {
    return {
        specific_chords: state.specific_chords[state.active_index],
    }
}

class connected_ChordViz extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {
            props: {
                specific_chords
            },
        } = this;
       /* let find_chords = new chord_finder();
        let the_chord = new general_chord();
        the_chord.root=B;
        the_chord.accidental=FLAT;
        let a_chord =  new general_chord();
        let d_chord = new general_chord();
        d_chord.root = C;
        d_chord.mode = MIXOLYDIAN;

        let chord_notes = find_chords.findChordNotes(d_chord);
        console.log(chord_notes);
        
        let E_note = new general_note(E, NATURAL);
        let A_note = new general_note(A, NATURAL);
        let D_note = new general_note(D, NATURAL);
        let G_note = new general_note(G, NATURAL);
        let B_note = new general_note(B, NATURAL);
        let TUNING = [E_note, A_note, D_note, G_note, B_note, E_note];
        
        let spectate = find_chords.getFingerPositions(d_chord, TUNING, 9, 2);
        console.log(spectate);*.
/******************************************************************************************** */
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
                <li>
                    <svg class='the-svg' style={{margin: 'auto', width:'70%', height:'70%'}}>
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
                </li>
            );
        }

        //let arr = [7, null, 8, 8, 7, null];
        let arrs = [[9, 11, 11, 10, 9, 9], [7, null, 8, 8, 7, null], [4, null, 4, 4, 4, null]];
        return(
            <ul id='svg-list'>
                {specific_chords.map(arr => {return makeSVG(arr)})}    
            </ul>
        );
    }
}
const ChordViz = connect(mapStateToProps)(connected_ChordViz); 
export default ChordViz;