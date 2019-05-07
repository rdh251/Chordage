
/*import React, { Component } from 'react';
import {} from './actions/index.js'

class ChordTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
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
                y_coords.push(((i+1) * fret_span) + '%');
            }
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

                    {shifted_notes.map((note, index) => {
                        if (note === null) {
                            return
                        } else {
                            let x_center = string_span*(index+1) +'%';
                            let y_center = fret_span*note - circle_radius + '%';
                            return <circle cx= {x_center} cy={y_center} r={radius_str} fill='yellow'></circle>
                        }
                    })}
                </svg>
            );
        }
        let arr = [9, 11, 11, 10, 9, 9];
        return(
                makeSVG(arr)
        );
    }
}

export default ChordTab;*/