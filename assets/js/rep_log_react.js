import React from 'react';
import ReactDom from 'react-dom';
import RepLogApp from './RepLog/RepLogApp';

const shouldShowHeart = true;

ReactDom.render(
    <RepLogApp
        withHeart={shouldShowHeart}
        initialState={window.REP_LOG_APP_INITIAL_STATE}
    />,
    document.getElementById('lift-stuff-app')
);
