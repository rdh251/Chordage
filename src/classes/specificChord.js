import {
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    SHARP,
    NATURAL,
    FLAT,
    IONIAN,
    DORIAN,
    PHRYGIAN,
    LYDIAN,
    MIXOLYDIAN,
    AEOLIAN,
    LOCRIAN,
} from '../constants/music'
import {
    general_chord,
    general_note
} from './generalChord.js';

export class note_instance {
    constructor(fret_number, string_number) {
        this.fret = fret_number;
        this.string = string_number;
    }
}
export class chord_instance {
    constructor() {
        this.tuning=[E, A, D, G, B, E];

    }
}
let temp_string = [E, F, '*', G, '*', A, '*', B, C, '*', D, '*' ];
let E_note = new general_note(E, NATURAL)
let A_note = new general_note(A, NATURAL)
let D_note = new general_note(D, NATURAL)
let G_note = new general_note(G, NATURAL)
let B_note = new general_note(B, NATURAL)
let TUNING = [E_note, A_note, D_note, G_note, B_note, E_note];
export class chord_finder {
    constructor() {
        this.tuning=[E, A, D, G, B, E]; 
        this.active_strings = [true, false, true, true, true, false];
        this.low_fret_bound = 3;
        this.high_fret_bound = 7;
        this.required_notes= [];
        this.general_notes=[];
    }
    find_general_scale(general_chord){
        let general_notes = [new general_note(general_chord.root, general_chord.accidental)];
        let stepper = [2, 2, 1, 2, 2, 2, 1]; // whole tone or halftone step orderings
        let mode = general_chord.mode;
        
        let step_start = 0
        if (mode === DORIAN) {
            step_start += 1;
        } else if (mode === PHRYGIAN) {
             step_start += 2;
        } else if (mode === LYDIAN) {
            step_start += 3;    
        } else if (mode === MIXOLYDIAN) {
            step_start += 4;    
        } else if (mode === AEOLIAN) {
            step_start += 5;    
        } else if (mode === LOCRIAN) {
            step_start += 6;    
        }
        let build_flat_scale = (index) => {
            let top_7 = []
            for (let i = 0; i < 7; i++) {
                let step_finder = step_start + i;
                if (step_finder >= stepper.length) {
                    step_finder = step_finder % stepper.length;
                }
                index += stepper[step_finder];
                if (index >= temp_string.length) {
                    index = index % temp_string.length;
                }
                if (temp_string[index] === '*') {
                    if(index + 1 === temp_string.length) {
                        top_7.push(new general_note(temp_string[0], FLAT));
                    } else {
                        top_7.push(new general_note(temp_string[index + 1], FLAT));

                    }
                } else {

                    top_7.push(new general_note(temp_string[index], NATURAL));
                }
            }
            return top_7; 
        }
        let build_sharp_scale = (index) => {
            let top_7 = []
            for (let i = 0; i < 7; i++) {
                let step_finder = step_start + i;
                if (step_finder >= stepper.length) {
                    step_finder = step_finder % stepper.length;
                }
                index += stepper[step_finder];
                if (index >= temp_string.length) {
                    index = index % temp_string.length;
                }
                if (temp_string[index] == '*') {
                    if(index - 1 < 0) {
                        top_7.push(new general_note(temp_string[12], SHARP));
                    } else {
                        top_7.push(new general_note(temp_string[index-1], SHARP));
                    }
                } else {
                    top_7.push(new general_note(temp_string[index], NATURAL));
                }
            }
            return top_7; 
        }
        let start_fret = temp_string.indexOf(general_chord.root);
        if (general_chord.accidental === FLAT) {
            start_fret--;
            if (start_fret < 0) {
                start_fret = temp_string.length - 1;
            }
            general_notes = general_notes.concat(build_flat_scale(start_fret));
            return(general_notes);

        } else if (general_chord.accidental === SHARP) {
            start_fret++;
            if (start_fret >= temp_string.length){
                start_fret = 0;
            }
            general_notes = general_notes.concat(build_sharp_scale(start_fret));
            return(general_notes);
        } else {
            let flat_scale = general_notes.concat(build_flat_scale(start_fret));
            let sharp_scale = general_notes.concat(build_sharp_scale(start_fret));
            let flat_fail = false;
            let flat_count = 0;
            let previous_root = null;
            for (let i = 0; i < flat_scale.length; i++) {
                if (previous_root === flat_scale[i].root) {
                    flat_fail = true;
                }
                if (flat_scale[i].accidental === FLAT) {
                    flat_count++;
                }
                previous_root = flat_scale[i].root;
            }
            let sharp_fail = false;
            let sharp_count = 0;
            previous_root=null;
            for (let i = 0; i < sharp_scale.length; i++) {
                if (previous_root === sharp_scale[i].root){
                    sharp_fail = true;
                    //break;
                }
                if (sharp_scale[i].accidental === SHARP) {
                    sharp_count++;
                }
                previous_root = sharp_scale[i].root;
            }
            if (sharp_fail) {
                return flat_scale;
            } else if (flat_fail) {
                return sharp_scale;
            } else {
                if (sharp_count < flat_count) {
                    return sharp_scale;
                } else {
                    return flat_scale;
                }
            }
        }
    }
    findChordNotes = (general_chord) => {
        let the_scale = this.find_general_scale(general_chord);
        let notes_in_chord = []
        for(let i = 0; i < the_scale.length; i++) {
            if(i === 0 || i === 2 || i === 4) {
                if(general_chord.tri_notes[Math.floor(i/2)]){
                    notes_in_chord.push(the_scale[i]);
                }
            } else {
                if (general_chord.ext_notes[i%6]) {
                    notes_in_chord.push(the_scale[i]);
                }
            }
        }
        return notes_in_chord;
    }
    getFingerPositions = (general_chord, tuning, h_fret_bound, l_fret_bound) => {
        let chord_notes = this.findChordNotes(general_chord);
        let tuning_temp_indexes = [];
        for (let i = 0; i < tuning.length; i++) {
            let start_fret = temp_string.indexOf(tuning[i].root);
            if (tuning[i].accidental === FLAT) {
                start_fret--;
                if (start_fret < 0) {
                    start_fret = temp_string.length - 1;
                }
                
            } else if (general_chord.accidental === SHARP) {
                start_fret++;
                if (start_fret >= temp_string.length){
                    start_fret = 0;
                }
            }
            tuning_temp_indexes.push(start_fret);
        }


        let string_potentials = [];
        for (let i = 0; i < tuning_temp_indexes.length; i++){
            string_potentials.push([]);
            for(let j = 0; j < h_fret_bound-l_fret_bound - 1; j++) { // Not sure why - 1 is needed here to 
                let temp_index = tuning_temp_indexes[i] + l_fret_bound + j; // the correct upper bound
                if (temp_index >= temp_string.length) {
                    temp_index = temp_index % temp_string.length;
                }
                for(let k = 0; k < chord_notes.length; k++) {                 
                    if (chord_notes[k].accidental === FLAT) {
                        if (temp_string[temp_index + 1] === chord_notes[k].root) {
                            let the_note = new general_note(chord_notes[k].root, chord_notes[k].accidental);
                            let the_index = (temp_index + temp_string.length - tuning_temp_indexes[i]) % temp_string.length;
                            string_potentials[i].push({index:the_index, note:the_note});
                        }
                    } else if (chord_notes[k].accidental === SHARP) {
                        if (temp_string[temp_index - 1] === chord_notes[k].root) {
                            let the_note = new general_note(chord_notes[k].root, chord_notes[k].accidental);
                            let the_index = (temp_index + temp_string.length - tuning_temp_indexes[i]) % temp_string.length;
                            string_potentials[i].push({index:the_index, note:the_note});
                        }
                    } else {
                        if(temp_string[temp_index] === chord_notes[k].root) {
                            let the_note = new general_note(chord_notes[k].root, chord_notes[k].accidental);
                            let the_index=(temp_index + temp_string.length - tuning_temp_indexes[i]) % temp_string.length;
                            string_potentials[i].push({index:the_index, note:the_note});
                        }
                    }
                }
            } 
            string_potentials[i].push(null);
        }

        let arr = string_potentials;
        let n = arr.length;
        let indices = Array(n).fill(0);
        let all_the_chords = [];

        while(1) {
            let new_chord = []
            let lowest_fret = 1000;
            let highest_fret = -1000;
            let val;
            for (let i = 0; i < n; i++) {
                val = arr[i][indices[i]];
                /* 0s and nulls not included in determining how many frets a chord spans */
                if (val != 0 && val !== null && val > highest_fret) {
                    highest_fret = val;
                }
                if (val != 0 && val !== null && val < lowest_fret) {
                    lowest_fret = val;
                } 
                new_chord.push(val);
            }
            if(highest_fret-lowest_fret < 5) {
                all_the_chords.push(new_chord);
            }
            let next = n - 1;
            while (next >= 0 && (indices[next] + 1 >= arr[next].length)) {
                next--;
            }
            if (next < 0) {
                break;
            }
            indices[next]++
            for(let i = next + 1; i < n; i++) {
                indices[i] = 0;
            }
            
        }
// https://www.geeksforgeeks.org/combinations-from-n-arrays-picking-one-element-from-each-array/

        return all_the_chords;

    }
}


