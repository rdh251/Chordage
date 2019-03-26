import { 
    ADD_CHORD,
    CHANGE_ACTIVE_INDEX,
    CHANGE_ROOT,
    CHANGE_ACCIDENTAL,
    CHANGE_MODE,
    CHANGE_TRI_NOTES,
    CHANGE_EXT_NOTES
 } from "../constants/actionTypes.js";

export function addChord(the_stuff) {
    return { 
        type: ADD_CHORD, 
        payload: the_stuff 
    };
}
export function changeActiveIndex(the_stuff) {
    return { 
        type: CHANGE_ACTIVE_INDEX, 
        payload: the_stuff 
    };
}
export function changeRoot(the_stuff) {
    return {
        type: CHANGE_ROOT,
        payload: the_stuff
    }
}
export function changeAccidental(the_stuff) {
    return {
        type: CHANGE_ACCIDENTAL,
        payload: the_stuff
    }
}
export function changeMode(the_stuff) {
    return {
        type: CHANGE_MODE,
        payload: the_stuff
    }
}
export function changeTriNotes(the_stuff) {
    return {
        type: CHANGE_TRI_NOTES,
        payload: the_stuff
    }
}
export function changeExtNotes(the_stuff) {
    return {
        type: CHANGE_EXT_NOTES,
        payload: the_stuff
    }
}