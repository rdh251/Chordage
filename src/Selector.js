import React, { Component } from 'react';

class Selector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: 8,
            activeIndex: 0
        }
        this.handleScroll = this.handleScroll.bind(this);
    }
    handleScroll() {
        let el = document.getElementById('chordHolder')
        let scrollOffset = el.scrollLeft;
        let itemWidth = el.offsetWidth / 3.0;
        let i = 0;
        while((i) * itemWidth <= scrollOffset - (itemWidth/2.0)) {
            i++;
        }
        this.state.activeIndex = i;
        console.log(this.state.activeIndex);
        console.log(this.props.children);
    }

    render() {
        return (
        <ul id='chordHolder' onScroll={this.handleScroll}>
            <li></li>
            <li>item 0</li>
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
            <li>item 4</li>
            <li>item 5</li>
            <li>item 6</li>
            <li>item 7</li>
            <li></li>
          </ul>
        );
    }
}
export default Selector;
