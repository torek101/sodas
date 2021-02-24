import React, { useState } from 'react';

import './App.css';

export class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: undefined,
            active: props.active || false,
            label: props.label || ''
        };
    }

    render = () => {
        return(
            <div className='field'>
                <input 
                    type='text'
                    value={this.state.value}
                    placeholder={this.props.label}
                />
            </div>
        );
    }
}