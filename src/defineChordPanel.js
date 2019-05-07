// Copyright 2019 Ross Hall
/* Contains the surface level structure of the control panel */

import React, { Component } from 'react';
import RSelect from './rootSelector.js';
import MSelect from './modeSelector.js';
import TSelect from './triSelector.js';
import ESelect from './extSelector.js';

class DCPanel extends Component {
    render() {
        return (
            <div className='panel-wrap'>
                <div id='theroot'>
                    <h3>Root:</h3>
                    <RSelect />
                </div>
                <div id='mode'>
                    <h3>Mode:</h3>
                    <MSelect />
                </div>
                <div id='note-selection'>
                    <div id='triad'>
                        <h3><span>Triad:</span></h3>
                        <TSelect />
                    </div>
                    <div id='extensions'>
                        <h3><span>Ext:</span></h3>
                        <ESelect />
                    </div>
                </div>
            </div>
        );
    }
}
export default DCPanel;
