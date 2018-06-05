import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
    return (
        <button
            className={`btn ${props.className}`}
            {...props}
        >{props.children}</button>
    );
}

Button.propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string
};

Button.defaultProps = {
    className: ''
};
