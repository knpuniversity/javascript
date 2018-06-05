import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
    return (
        <button
            className="btn"
            {...props}
        >{props.children}</button>
    );
}

