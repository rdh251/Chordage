// Copyright 2019 Ross Hall

/* reducers/index.js holds the initial state 
and the logic for each type of state change
that could occur*/

import { 
    CHANGE_PROGRESSION,
    CHANGE_ACTIVE_INDEX,
    CHANGE_ROOT, 
    CHANGE_ACCIDENTAL,
    CHANGE_MODE,
    CHANGE_TRI_NOTES,
    CHANGE_EXT_NOTES,
    CHANGE_DIAGRAM_INDEX,
    CHANGE_SELECTED_CHORD
} from "../constants/actionTypes.js";
import { general_chord, generalCopy, general_note } from '../classes/generalChord.js';
import {chord_finder} from '../classes/specificChord.js';
import {
    A, 
    B, 
    D, 
    E, 
    G,
    NATURAL,
} from '../constants/music.js';

let E_note = new general_note(E, NATURAL);
let A_note = new general_note(A, NATURAL);
let D_note = new general_note(D, NATURAL);
let G_note = new general_note(G, NATURAL);
let B_note = new general_note(B, NATURAL);

/* In the future the user will be able to set this tuning  */
let TUNING = [E_note, A_note, D_note, G_note, B_note, E_note];

let chord1 = new general_chord();
let chord2 = new general_chord();
let chord3 = new general_chord();
let chord4 = new general_chord();
chord2.root = 'B';
chord3.root = 'C';
chord4.root = 'D';

let find_chords = new chord_finder();

let specific_arr1 = find_chords.getFingerPositions(chord1, TUNING, 3, 1);
let scale1 = find_chords.find_general_scale(chord1);

let specific_arr2 = find_chords.getFingerPositions(chord2, TUNING, 8, 5);
let scale2 = find_chords.find_general_scale(chord2);

let specific_arr3 = find_chords.getFingerPositions(chord3, TUNING, 10, 5);
let scale3 = find_chords.find_general_scale(chord3);

let specific_arr4 = find_chords.getFingerPositions(chord4, TUNING, 12, 7);
let scale4 = find_chords.find_general_scale(chord4);

/* initial state using structure define above */
const initialState = {
    active_index: 0,
    chords: [chord1, chord2, chord3, chord4],
    specific_chords: [ specific_arr1, specific_arr2, specific_arr3, specific_arr4 ],
    selected_indices: [0,0,0,0],
    visible_diagram_indices: [0,0,0,0],
    scales: [scale1, scale2, scale3, scale4],
    colors: ['yellow', 'magenta', 'cyan', 'orange', 'red', 'blue', 'lightgreen'] // index maps to scale degree
};

function theReducer(state = initialState, action) {
    /***********************************************************************************
     * Add Chord
     **********************************************************************************/
    if (action.type === CHANGE_PROGRESSION) {
        if(action.payload === 'DELETE') {
            if (state.chords.length > 1) { 
                let new_chords = state.chords.slice();
                let new_specific_chords = state.specific_chords.slice();
                let new_selected_indices = state.selected_indices.slice();
                let new_visible_diagram_indices = state.visible_diagram_indices.slice();
                let new_scales = state.scales.slice();

                new_chords.splice(state.active_index, 1);
                new_specific_chords.splice(state.active_index, 1);
                new_selected_indices.splice(state.active_index, 1);
                new_visible_diagram_indices.splice(state.active_index, 1);
                new_scales.splice(state.active_index, 1);
                let new_index;
                if (state.active_index === state.chords.length - 1) {
                    new_index = state.active_index - 1;
                } else {
                    new_index = state.active_index;
                }
                return Object.assign({}, state, {
                    active_index: new_index,
                    chords: new_chords,
                    specific_chords: new_specific_chords,
                    selected_indices: new_selected_indices,
                    visible_diagram_indices: new_visible_diagram_indices,
                    scales: new_scales,
                });
            }
        } else if (action.payload === 'BEFORE') {
            let new_chord = new general_chord();
            let new_spec_arr = find_chords.getFingerPositions(new_chord, TUNING, 9, 3);
            let new_scale = find_chords.find_general_scale(new_chord);

            let new_chords = state.chords.slice();
            let new_specific_chords = state.specific_chords.slice();
            let new_selected_indices = state.selected_indices.slice();
            let new_visible_diagram_indices = state.visible_diagram_indices.slice();
            let new_scales = state.scales.slice();

            new_chords.splice(state.active_index, 0, new_chord);
            new_specific_chords.splice(state.active_index, 0, new_spec_arr);
            new_selected_indices.splice(state.active_index, 0, 0);
            new_visible_diagram_indices.splice(state.active_index, 0, 0);
            new_scales.splice(state.active_index, 0, new_scale);

            return Object.assign({}, state, {
                chords: new_chords,
                specific_chords: new_specific_chords,
                selected_indices: new_selected_indices,
                visible_diagram_indices: new_visible_diagram_indices,
                scales: new_scales
            });
        } else { // insert after
            let new_chord = new general_chord();
            let new_spec_arr = find_chords.getFingerPositions(new_chord, TUNING, 9, 3);
            let new_scale = find_chords.find_general_scale(new_chord);

            let new_chords = state.chords.slice();
            let new_specific_chords = state.specific_chords.slice();
            let new_selected_indices = state.selected_indices.slice();
            let new_visible_diagram_indices = state.visible_diagram_indices.slice();
            let new_scales = state.scales.slice();

            new_chords.splice(state.active_index + 1, 0, new_chord);
            new_specific_chords.splice(state.active_index + 1, 0, new_spec_arr);
            new_selected_indices.splice(state.active_index + 1, 0, 0);
            new_visible_diagram_indices.splice(state.active_index + 1, 0, 0);
            new_scales.splice(state.active_index + 1, 0, new_scale);

            return Object.assign({}, state, {
                chords: new_chords,
                specific_chords: new_specific_chords,
                selected_indices: new_selected_indices,
                visible_diagram_indices: new_visible_diagram_indices,
                scales: new_scales
            });
        }


    /***********************************************************************************
     * Change Active Index
     **********************************************************************************/
    } else if (action.type === CHANGE_ACTIVE_INDEX) {
        return Object.assign({}, state, {
            active_index: action.payload,
        });
    /***********************************************************************************
     * Change Root
     **********************************************************************************/
    } else if (action.type === CHANGE_ROOT) {
        let copy_me = state.chords[state.active_index];
        let the_clone = new general_chord();
        generalCopy(the_clone, copy_me);
        the_clone.root = action.payload;

        let new_arr = state.chords.slice();
        new_arr[state.active_index] = the_clone;
        
        let new_specific_chords = find_chords.getFingerPositions(the_clone, TUNING, 9, 3);
        let new_spec_arr = state.specific_chords.slice();
        new_spec_arr[state.active_index] = new_specific_chords;

        let new_scale = find_chords.find_general_scale(the_clone);
        let new_scales = state.scales.slice();
        new_scales[state.active_index] = new_scale;

        return Object.assign({}, state, {
            chords: new_arr,
            specific_chords: new_spec_arr,
            scales: new_scales
        });
    /***********************************************************************************
     * Change accidental
     **********************************************************************************/
    } else if (action.type === CHANGE_ACCIDENTAL) {
        let copy_me = state.chords[state.active_index];
        let the_clone = new general_chord();
        generalCopy(the_clone, copy_me);
        the_clone.accidental = action.payload;

        let new_arr = state.chords.slice();
        new_arr[state.active_index] = the_clone;

        let new_specific_chords = find_chords.getFingerPositions(the_clone, TUNING, 9, 3);
        let new_spec_arr = state.specific_chords.slice();
        new_spec_arr[state.active_index] = new_specific_chords;

        let new_scale = find_chords.find_general_scale(the_clone);
        let new_scales = state.scales.slice();
        new_scales[state.active_index] = new_scale;

        return Object.assign({}, state, {
            chords: new_arr,
            specific_chords: new_spec_arr,
            scales: new_scales
        });
    /***********************************************************************************
     * Change Mode
     **********************************************************************************/
    } else if (action.type === CHANGE_MODE){
        let copy_me = state.chords[state.active_index];
        let the_clone = new general_chord();
        generalCopy(the_clone, copy_me);
        the_clone.mode = action.payload;

        let new_arr = state.chords.slice();
        new_arr[state.active_index] = the_clone;

        let new_specific_chords = find_chords.getFingerPositions(the_clone, TUNING, 9, 3);
        let new_spec_arr = state.specific_chords.slice();
        new_spec_arr[state.active_index] = new_specific_chords

        let new_scale = find_chords.find_general_scale(the_clone);
        let new_scales = state.scales.slice();
        new_scales[state.active_index] = new_scale;

        return Object.assign({}, state, {
            chords: new_arr,
            specific_chords: new_spec_arr,
            scales: new_scales 
        });
    /***********************************************************************************
     * Change Tri Notes
     **********************************************************************************/
    } else if (action.type === CHANGE_TRI_NOTES) {
        let copy_me = state.chords[state.active_index];
        let the_clone = new general_chord();
        generalCopy(the_clone, copy_me);
        the_clone.tri_notes = action.payload;
        

        let new_arr = state.chords.slice();
        new_arr[state.active_index] = the_clone;

        let new_specific_chords = find_chords.getFingerPositions(the_clone, TUNING, 9, 3);
        let new_spec_arr = state.specific_chords.slice();
        new_spec_arr[state.active_index] = new_specific_chords;

        let new_scale = find_chords.find_general_scale(the_clone);
        let new_scales = state.scales.slice();
        new_scales[state.active_index] = new_scale;

        return Object.assign({}, state, {
            chords: new_arr,
            specific_chords: new_spec_arr,
            scales: new_scales 
        });
    /***********************************************************************************
     * Change Ext Notes
     **********************************************************************************/
    } else if (action.type === CHANGE_EXT_NOTES) {
        let copy_me = state.chords[state.active_index];
        let the_clone = new general_chord();
        generalCopy(the_clone, copy_me);
        the_clone.ext_notes = action.payload;
        

        let new_arr = state.chords.slice();
        new_arr[state.active_index] = the_clone;

        let new_specific_chords = find_chords.getFingerPositions(the_clone, TUNING, 9, 3);
        let new_spec_arr = state.specific_chords.slice();
        new_spec_arr[state.active_index] = new_specific_chords;

        let new_scale = find_chords.find_general_scale(the_clone);
        let new_scales = state.scales.slice();
        new_scales[state.active_index] = new_scale;

        return Object.assign({}, state, {
            chords: new_arr,
            specific_chords: new_spec_arr,
            scales: new_scales 
        });
    /*************************************************************************************
     * Change  Visible Diagram Index
     * **********************************************************************************/
    } else if (action.type === CHANGE_DIAGRAM_INDEX) {
        let visible_diagrams = state.visible_diagram_indices.slice();
        visible_diagrams[action.payload.active_index] = action.payload.diagram_index;
        return Object.assign({}, state, {
            visible_diagram_indices: visible_diagrams,
        });
    } else if (action.type === CHANGE_SELECTED_CHORD) {
        let selected_chords = state.selected_indices.slice();
        selected_chords[action.payload.active_index] = action.payload.visible_index;

        return Object.assign({}, state, {
            selected_indices: selected_chords,
        });
    }
    return state;
};

export default theReducer;