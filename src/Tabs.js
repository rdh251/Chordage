// Copyright 2019 Ross Hall
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // data validation
import Tab from './Tab';

// FROM: 
// https://alligator.io/react/tabs-component/
// Copyright 2019 Ross Hall
/* controls which pane is displayed in the control panel,
    define chord is the only pane built out for now.
*/
class Tabs extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
    }
    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.children[0].props.label
        };
    }
    onClickTabItem = (tab) => {
        this.setState({activeTab: tab});
    }
    render() {
        const {
            onClickTabItem,
            props: {
                children,
            },
            state: {
                activeTab,
            }
        } = this;
        return (
            <div className = 'tabs'>
                <div className='tab-content'>
                    {children.map((child) => {
                        if (child.props.label !== activeTab) {
                            return undefined;
                        }
                        return child.props.children;
                    })}
                </div>
                <ol className = 'tab-list'>
                    {children.map((child) => {
                        const { label} = child.props;
                        return (
                            <Tab
                                activeTab = {activeTab}
                                key = {label}
                                label = {label}
                                onClick = {onClickTabItem}
                            />
                        );
                    })}
                </ol>
            </div>
        );
    }
}
export default Tabs;