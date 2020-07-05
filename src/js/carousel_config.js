'use strict';

const chunkSize = 3;

const card_types = [
    {key: 'video', label: 'VIDEO'},
    {key: 'elearning', label: 'ELEARNING'},
    {key: 'learning_plan', label: 'LEARNING PLAN'},
    {key: 'playlist', label: 'PLAYLIST'},
];

// cannot contain "placeholder"
const card_cardinalities = ['single', 'collection'];

// card width + margin right, how much will the cards div be scrolled on arrow click
const card_width = 235; // px, rem * 10
