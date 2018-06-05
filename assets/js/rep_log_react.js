import React from 'react';
import ReactDom from 'react-dom';

const el = React.createElement(
    'h2',
    null,
    'Lift History! ',
    React.createElement('span', null, '❤️')
);

console.log(el);
ReactDom.render(el, document.getElementById('lift-stuff-app'));
