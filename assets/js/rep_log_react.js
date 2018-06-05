import React from 'react';
import { render } from 'react-dom';
import RepLogApp from './RepLog/RepLogApp';

const shouldShowHeart = true;

render(
    <RepLogApp
        withHeart={shouldShowHeart}
        itemOptions={window.REP_LOG_APP_PROPS.itemOptions}
    />,
    document.getElementById('lift-stuff-app')
);
