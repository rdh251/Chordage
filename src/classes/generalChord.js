// Copyright 2019 Ross Hall
/* generalChord.js holds the data structures storing information
about a general chord. THis is how the information the user enters 
in the control panel is organized and stored */
import {
    A,
    NATURAL,
    IONIAN,
    LYDIAN,
    MIXOLYDIAN,
    LOCRIAN,
} from '../constants/music'
/* general note refers to the name of a note without relation to
 where a note can be found on a fretboard*/
export class general_note {
    constructor(the_root, the_accidental) {
        this.root = the_root;
        this.accidental = the_accidental;
    }
}

/* general chord organizes the information needed to describe a chord
wthout relation to where that chord might be played on a frettboard*/
export class general_chord {
    constructor() {
        this.root = A;
        this.accidental = NATURAL 
        this.mode = IONIAN;
        this.tri_notes = [true, true, true];
        this.ext_notes = [false, false, false, false];
    }
    /* Determines a name for the general chord based on the 
    inputs provided. In the future this will be changed to
    represent more of a pseudo name that is altered after a 
    specific chord is selected by the user.*/
    getNameAsString() {
        let string_name = this.root
        if (this.accidental !== NATURAL) {
            string_name += this.accidental;
        }
        if (this.mode === IONIAN ||
            this.mode === LYDIAN) {
                string_name += 'maj';
        } else if (this.mode === MIXOLYDIAN) {
            string_name += 'dom';
        } else if (this.mode === LOCRIAN) {
            string_name += 'dim';
        }
        else {
            string_name += 'min'
        }
        let k = 0;
        for (let i = 7; i <= 13; i += 2) {
            if (this.ext_notes[k]) {
                string_name = string_name + ' ' + i;
            }
            k++;
        }
        return string_name;
    }
}
// makes a clone of a general_chord object.
export function generalCopy(clone, old) {
    clone.root = old.root;
    clone.accidental = old.accidental;
    clone.mode = old.mode;
    clone.tri_notes = old.tri_notes;
    clone.ext_notes = old.ext_notes;
}