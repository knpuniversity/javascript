import React from 'react';
import { render } from 'react-dom';
import RepLogApp from './RepLog/RepLogApp';

const shouldShowHeart = true;

const itemOptions = [
    {id: 'cat', text: 'Cat'},
    {id: 'fat_cat', text: 'Big Fat Cat'},
    {id: 'laptop', text: 'My Laptop'},
    {id: 'coffee_cup', text: 'Coffee Cup'},
    {id: 'invalid_item', text: 'Dark Matter'}
];

render(
    <RepLogApp
        withHeart={shouldShowHeart}
        itemOptions={itemOptions}
    />,
    document.getElementById('lift-stuff-app')
);
