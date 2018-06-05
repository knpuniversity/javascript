import React from 'react';
import ReactDom from 'react-dom';

const el = <h2>Lift Stuff! <span>❤️</span></h2>;

console.log(el);
ReactDom.render(el, document.getElementById('lift-stuff-app'));
