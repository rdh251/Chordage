// Copyright 2019 Ross Hall
/* controls which pane is displayed in the control panel,
    define chord is the only pane built out for now.
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // data validation

// FROM:
// https://alligator.io/react/tabs-component/
class Tab extends Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    }
    onClick = () => {
        const {label, onClick} = this.props;
        onClick(label);
    } 
    render() {
        const {
            onClick,
            props: {
                activeTab,
                label,
            },
        } = this;
        let label_arr = label.split(' ');   
        let className = 'tab-list-item';
        if (activeTab === label) {
            className += ' tab-list-active';
        }
        return (
            <li
                className = {className}
                onClick = {onClick}
            ><h6>{label_arr[0]}<br/>{label_arr[1]}</h6></li>
        );
    }
}
export default Tab;
