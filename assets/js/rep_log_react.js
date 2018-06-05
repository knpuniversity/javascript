import React from 'react';
import { render } from 'react-dom';
import RepLogApp from './RepLog/RepLogApp';

const shouldShowHeart = true;

render(
    <div>
        <RepLogApp withHeart={shouldShowHeart} />
        <RepLogApp withHeart={false} />
    </div>,
    document.getElementById('lift-stuff-app')
);
