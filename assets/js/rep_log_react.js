import React from 'react';
import ReactDom from 'react-dom';
import RepLogApp from './RepLog/RepLogApp';

const shouldShowHeart = true;

ReactDom.render(
    <div>
        <RepLogApp withHeart={shouldShowHeart} />
        <RepLogApp withHeart={false} />
    </div>,
    document.getElementById('lift-stuff-app')
);
