import React, { Component } from 'react';
import Select from 'react-select';
import Header from './Header.js';
import Cards, {Card1, Card2, Card3} from './Cards.js';
import Tabs from './Tabs.js';
import Selector from './Selector.js'
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
          <Card1 />
        </div>
        <div id="chordBackdrop"></div>
        <div id="slide">
          <div id='spacer'></div>
          <div id='triHolder'>
            <div id='triangle'></div>
          </div>
          <div id='description'>
            <Selector />
            <Tabs>
              <div id='define' label='Define Chord'>
                <div id='root'>
                  <h3>Root:</h3>
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

                  />
                </div>
                <div id='mode'>
                  <h3>Mode:</h3>
                </div>
                <div id='triad'>
                  <h3>Triad:</h3>
                  <ul id='tri-list'>
                    <li>1</li>
                    <li>3</li>
                    <li>5</li>
                  </ul>
                </div>
                <div id='extensions'>
                  <h3>Ext:</h3>
                  <ul id='ext-list'>
                    <li>7</li>
                    <li>9</li>
                    <li>11</li>
                    <li>13</li>
                  </ul>
                </div>
              </div>
              <div id='set' label='Set Note'>
                In a while!
              </div>
              <div id='search' label='Search Space'>
                Sticks!
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