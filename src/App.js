import React, { Component } from 'react';
import Select from 'react-select';
import Header from './Header.js';
import Cards, {Card1, Card2, Card3} from './Cards.js';
import Tabs from './Tabs.js';
import Selector from './Selector.js';
import DCPanel from './defineChordPanel.js';
import ChordViz from './chordViz.js';
import ChordBackdrop from './chordBackdrop.js';
import './App.css';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
let letter_options = letters.map(opt => ({label: opt, value: opt}));

class App extends Component {
  triRotate() {
      let el = document.getElementById('slide')
      let scroll_percentage = el.scrollTop / (el.scrollHeight-el.clientHeight);
      let rotation = 540 * scroll_percentage;
      let tri = document.getElementById('triangle');
      tri.style.transform = 'rotate('+rotation+'deg)';         
  }
  render() {
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
      triRotate,
    } = this;
    return (
      <div className="Wrapper">
        <Header />
        <div id='topCardHolder'>
          <Card1 />
        </div>
        <div id="slide" onScroll={triRotate}>
          <ChordBackdrop />
          <div id='spacer'></div>
          <div id='triHolder'>
            <div id='triangle' onClick={scrollTo}></div>
          </div>
          <div id='botCardHolder'>
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
                  <label>Low Fret: </label>
                  <input></input>
                </div>
                <div>
                  <label>High Fret: </label>
                  <input></input>
                </div>
                <button>Submit</button>
              </div> 
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
/*
<div id='set' label='Unknown Button' style={{marginTop: '10%', alignContent: 'center'}}>
<label>Set Note: </label>
<input></input>
<button>Submit</button>
</div>
*/

/*
          <div id='botCardHolder'>
            <Card2 />
          </div>
*/
