import React, { Component } from 'react';
import Select from 'react-select';
import Header from './Header.js';
import Cards, {Card1, Card2, Card3} from './Cards.js';
import Tabs from './Tabs.js';
import Selector from './Selector.js';
import DCPanel from './defineChordPanel.js';
import ChordViz from './chordViz.js';
import './App.css';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
let letter_options = letters.map(opt => ({label: opt, value: opt}));

class App extends Component {
  render() {
    console.log(window.innerHeight);
    return (
      <div className="Wrapper">
        <Header />
        <div id='topCardHolder'>
        </div>
        <div id="slide">
          <div id="chordBackdrop">
            <ChordViz />
          </div>
          <div id='spacer'></div>
          <div id='triHolder'>
            <div id='triangle'></div>
          </div>
          <div id='description'>
            <Selector />
            <Tabs>
              <div id='define' label='Define Chord'>
                <DCPanel />
              </div>
              <div id='set' label='Set Note'>
                <ChordViz />
              </div>
              <div id='search' label='Search Space'>
                <div>
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
/*<input></input>
<button>Submit</button>
*/
/*
          <div id='botCardHolder'>
            <Card2 />
          </div>
*/
/*
<div id='panelWrap'>
<div id='panel1'>
  <div id='root'></div>
  <div id='mode'></div>
  <div id='triad'></div>
  <div id='extensions'></div>
</div>
<div id='panel2' className='hide'></div>
<div id='panel3' className='hide'></div>
</div>
<ul id='panelNav'>
<li><h6>Chord<br/>Description</h6></li>
<li><h6>Set<br/>Note</h6></li>
<li><h6>Search<br/>Space</h6></li>
</ul>
*/

/*
                  <Select 
                    options={letter_options}
                    onChange={opt => console.log(opt.value)}
                    className={'root'}
                    classNamePrefix={'rooter'}
                    styles={
                      {option: (state) => ({
                        borderBottom: '2px solid red',
                        height: '50%',
                        color: 'black',
                      }),
                      valueContainer:(state) => ({
                        overflow: 'scroll',
                      })

                    }
                    }

                  /> */