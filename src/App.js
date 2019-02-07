import React, { Component } from 'react';
import Header from './Header.js';
import Cards, {Card1, Card2, Card3} from './Cards.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div id='topCardHolder'>
          <Card1 />
        </div>
        <div id="chordBackdrop"></div>
        <div id="slide">
          <div id='spacer'></div>
          <div id='botCardHolder'>
            <Card2 />
          </div>

          <div id='description'>
            <div id='triHolder'>
              <div id='triangle'></div>
            </div>
            <div id='chordHolder'></div>
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
          </div>
        </div>
      </div>
    );
  }
}

export default App;
