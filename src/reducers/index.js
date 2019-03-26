import { 
    ADD_CHORD,
    CHANGE_ACTIVE_INDEX,
    CHANGE_ROOT, 
    CHANGE_ACCIDENTAL,
    CHANGE_MODE,
    CHANGE_TRI_NOTES,
    CHANGE_EXT_NOTES
} from "../constants/actionTypes.js";
import { general_chord, generalCopy, general_note } from '../classes/generalChord.js';
import {chord_finder} from '../classes/specificChord.js';
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
    MIXOLYDIAN} from '../constants/music.js';

let E_note = new general_note(E, NATURAL);
let A_note = new general_note(A, NATURAL);
let D_note = new general_note(D, NATURAL);
let G_note = new general_note(G, NATURAL);
let B_note = new general_note(B, NATURAL);
let TUNING = [E_note, A_note, D_note, G_note, B_note, E_note];


let chord1 = new general_chord;
let chord2 = new general_chord;
let chord3 = new general_chord;
let chord4 = new general_chord;
chord2.root = 'B';
chord3.root = 'C';
chord4.root = 'D';

let find_chords = new chord_finder();
let specific_arr1 = find_chords.getFingerPositions(chord1, TUNING, 9, 2);
let specific_arr2 = find_chords.getFingerPositions(chord2, TUNING, 9, 2);
let specific_arr3 = find_chords.getFingerPositions(chord3, TUNING, 9, 2);
let specific_arr4 = find_chords.getFingerPositions(chord4, TUNING, 9, 2);

const initialState = {
    active_index: 0,
    chords: [chord1, chord2, chord3, chord4],
    specific_chords: [ specific_arr1, specific_arr2, specific_arr3, specific_arr4 ]
};

function theReducer(state = initialState, action) {
    if (action.type === ADD_CHORD) {
        return Object.assign({}, state, {
            chords: state.chords.concat(action.payload)
        });
    } else if (action.type === CHANGE_ACTIVE_INDEX) {
        return Object.assign({}, state, {
            active_index: action.payload,
        });
    } else if (action.type === CHANGE_ROOT) {
        let copy_me = state.chords[state.active_index];
        let the_clone = new general_chord;
        generalCopy(the_clone, copy_me);
        the_clone.root = action.payload;

        let new_arr = state.chords.slice();
        new_arr[state.active_index] = the_clone;

        return Object.assign({}, state, {
            chords: new_arr,
        });
    } else if (action.type === CHANGE_ACCIDENTAL) {
        let copy_me = state.chords[state.active_index];
        let the_clone = new general_chord;
        generalCopy(the_clone, copy_me);
        the_clone.accidental = action.payload;

        let new_arr = state.chords.slice();
        new_arr[state.active_index] = the_clone;

        return Object.assign({}, state, {
            chords: new_arr,
        });
    } else if (action.type === CHANGE_MODE){
        let copy_me = state.chords[state.active_index];
        let the_clone = new general_chord;
        generalCopy(the_clone, copy_me);
        the_clone.mode = action.payload;

        let new_arr = state.chords.slice();
        new_arr[state.active_index] = the_clone;

        return Object.assign({}, state, {
            chords: new_arr,
        });
    } else if (action.type === CHANGE_TRI_NOTES) {
        let copy_me = state.chords[state.active_index];
        let the_clone = new general_chord;
        generalCopy(the_clone, copy_me);
        the_clone.tri_notes = action.payload;
        

        let new_arr = state.chords.slice();
        new_arr[state.active_index] = the_clone;

        return Object.assign({}, state, {
            chords: new_arr,
        });
    } else if (action.type === CHANGE_EXT_NOTES) {
        let copy_me = state.chords[state.active_index];
        let the_clone = new general_chord;
        generalCopy(the_clone, copy_me);
        the_clone.ext_notes = action.payload;
        

        let new_arr = state.chords.slice();
        new_arr[state.active_index] = the_clone;

        return Object.assign({}, state, {
            chords: new_arr,
        });
    }
    return state;
};

export default theReducer;