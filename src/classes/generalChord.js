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

export class general_note {
    constructor(the_root, the_accidental) {
        this.root = the_root;
        this.accidental = the_accidental;
    }
}

export class general_chord {
    constructor() {
        this.root = A;
        this.accidental = NATURAL 
        this.mode = IONIAN;
        this.tri_notes = [true, true, false];
        this.ext_notes = [true, false, false, false];
    }
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
export function generalCopy(clone, old) {
    clone.root = old.root;
    clone.accidental = old.accidental;
    clone.mode = old.mode;
    clone.tri_notes = old.tri_notes;
    clone.ext_notes = old.ext_notes;
}