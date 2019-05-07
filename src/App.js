// Copyright 2019 Ross Hall
/*App is the the main component for Chordage and is attached to the root div
in index.html. This component contains the surface level structure of the application*/

import React, { Component } from 'react';
import {Card1, Card2} from './Cards.js';
import Tabs from './Tabs.js';
import Selector from './Selector.js';
import DCPanel from './defineChordPanel.js';
import ChordBackdrop from './chordBackdrop.js';
import BoardBackdrop from './boardBackdrop.js';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view_progression: false,
        }
    }
    viewClicker = () => {
        this.setState({view_progression: !this.state.view_progression});
    }
    /*rotates the center triangle based on the scroll postition of the description panel*/
    triRotate() {
        let el = document.getElementById('slide')
        let scroll_percentage = el.scrollTop / (el.scrollHeight-el.clientHeight);
        let rotation = 540 * scroll_percentage;
        let tri = document.getElementById('triangle');
        tri.style.transform = 'rotate('+rotation+'deg)';         
    }
    render() {
        /* Used for the programmatic scroll of the control panel when the
        center triangle is clicked */
        function scrollTo() {
            let duration = 400;
            let el = document.getElementById('slide');
            let height = el.scrollHeight-el.clientHeight;

            let scroll_percentage = el.scrollTop / (el.scrollHeight-el.clientHeight);
            let to;
            if(scroll_percentage < .5) {
                to = height;
            } else {
                to = 0
            }
            var difference = to - el.scrollTop;
            var perTick = difference / duration * 10;
            let scrolling = setInterval(function() {
                el.scrollTop = el.scrollTop + perTick;
                if (el.scrollTop === to) {
                    clearInterval(scrolling);
                }
            }, 10);
        }
        const {
            state: {
                view_progression
            },
            viewClicker,
            triRotate,
        } = this;

        let backdrop;
        if (view_progression) {
            backdrop = <BoardBackdrop />
        } else {
            backdrop = <ChordBackdrop />
        }

        /* Surface level structure of the app contained in this return statement */
        return (
<div id='wrapper'>
    <div id='tester'>
        <header className="App-header">
            <h1>Chordage</h1>
            <div id='view-progression' onClick = {viewClicker}>
                <h5 id='view-text'>View Progression</h5>
            </div>
        </header>
        <div id='topCardHolder'>
            <Card1 />
        </div>
        <div id="slide" onScroll={triRotate}>
            {backdrop}
            <div id='spacer'></div>
            <div id='description-wrap'>
                <div id='tri-space'>
                    <Card2 />
                </div>

                <div id='description'>

                    <Selector />

                    <Tabs>
                        <div id='define' label='Define Chord'>
                            <DCPanel />
                        </div>

                        <div id='search' label='Search Space'>
                            <div style={{marginBottom: '10%', marginTop: '10%', textAlign: 'center'}}>
                                <h6>Coming Soon!</h6>
                            </div>
                            <button>Submit</button>
                        </div> 
                    </Tabs>
                    <div id='triHolder'>
                        <div id='tri-box'>
                            <div id='triangle' onClick={scrollTo}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h1>SUBLIMINAL MESSAGING</h1>
        <h1>SUBLIMINAL MESSAGING</h1>
        <h1>SUBLIMINAL MESSAGING</h1>
        <h1>SUBLIMINAL MESSAGING</h1>
        <h1>SUBLIMINAL MESSAGING</h1>
        <h1>SUBLIMINAL MESSAGING</h1>
        <h1>SUBLIMINAL MESSAGING</h1>
        <h1>SUBLIMINAL MESSAGING</h1>
        <h1>SUBLIMINAL MESSAGING</h1>
        <h1>SUBLIMINAL MESSAGING</h1>
        <h1>SUBLIMINAL MESSAGING</h1>
        <h1>SUBLIMINAL MESSAGING</h1>
        <h1>SUBLIMINAL MESSAGING</h1>
    </div>
</div>
        );
    }
}
export default App;