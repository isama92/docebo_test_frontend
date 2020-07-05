const carousel_cards = [
    {
        image: 'https://loremflickr.com/400/400',
        type: 'video',
        duration: 77,
        title: 'Welcome to Effective Time Management',
        cardinality: 'single',
    },
    {
        image: 'https://loremflickr.com/400/400',
        type: 'elearning',
        duration: 612,
        title: 'Choosing The Best Audio Player Software For Your Computer',
        cardinality: 'single',
    },
    {
        image: 'https://loremflickr.com/400/400',
        type: 'learning_plan',
        duration: 300,
        title: 'The Small Change That Creates Massive Results In Your Life',
        cardinality: 'collection',
    },
    {
        image: 'https://loremflickr.com/400/400',
        type: 'video',
        duration: 60,
        title: 'Enhance Your Brand Potential With Giant Advertising Blimps',
        cardinality: 'single',
    },
    {
        image: 'https://loremflickr.com/400/400',
        type: 'playlist',
        duration: 259,
        title: 'How To Write Better Advertising Copy...',
        cardinality: 'collection',
    },
    {
        image: 'https://loremflickr.com/400/400',
        type: 'elearning',
        duration: 937,
        title: 'A Random Title',
        cardinality: 'single',
    },
    {
        image: 'https://loremflickr.com/400/400',
        type: 'learning_plan',
        duration: 821,
        title: 'Just Another Random Title',
        cardinality: 'single',
    },
    {
        image: 'https://loremflickr.com/400/400',
        type: 'elearning',
        duration: 3600,
        title: 'Lorem ipsum dolor sit amet',
        cardinality: 'single',
    },
    {
        image: 'https://loremflickr.com/400/400',
        type: 'video',
        duration: 612,
        title: 'Consectetur adipiscing elit',
        cardinality: 'single',
    },
    {
        image: 'https://loremflickr.com/400/400',
        type: 'learning_plan',
        duration: 300,
        title: 'Curabitur vel finibus elit',
        cardinality: 'collection',
    },
    {
        image: 'https://loremflickr.com/400/400',
        type: 'video',
        duration: 60,
        title: 'Sit amet imperdiet sapien',
        cardinality: 'single',
    },
    {
        image: 'https://loremflickr.com/400/400',
        type: 'playlist',
        duration: 259,
        title: 'Mauris ac semper erat, vitae faucibus libero',
        cardinality: 'collection',
    },
    {
        image: 'https://loremflickr.com/400/400',
        type: 'elearning',
        duration: 937,
        title: 'Duis orci lacus',
        cardinality: 'single',
    },
    {
        image: 'https://loremflickr.com/400/400',
        type: 'learning_plan',
        duration: 821,
        title: 'Sollicitudin sed pulvinar in',
        cardinality: 'single',
    },
];

/**
 * Randomize array elements
 * @returns {Array}
 */
Array.prototype.shuffle = function () {
    for (let i = 0; i < this.length; i++) {
        const r = Math.floor(Math.random() * (i + 1));
        [this[i], this[r]] = [this[r], this[i]];
    }
    return this;
};

/**
 * Stash carousel cards by a unique identificator
 * @type {object}
 */
const carousel_cards_cache = {};

/**
 * Generate unique cards for a carousel and then get them when needed
 * @param carousel_id
 * @returns {array}
 */
const getCardsByCarousel = carousel_id => {
    if(typeof carousel_cards_cache[carousel_id] === 'undefined') {
        carousel_cards_cache[carousel_id] = carousel_cards.slice().shuffle();
    }
    return carousel_cards_cache[carousel_id];
};

/**
 * Get a random list of n cards for a specific carousel
 * @param {string} carousel_id Carousel unique identificator
 * @param {int} n Number of cards to get
 * @param {int} timeout Timeout in ms before to get the response
 * @returns {Promise} Promise that will resolve giving an array of cards
 */
const getCards = (carousel_id, n, timeout = 1000) => {
    // promise to simulate delay
    return new Promise(resolve => {
        // timeout, adds delay
        setTimeout(() => {
            // Get all the cards for [carousel_id] carousel and then get n elements
            const cards = getCardsByCarousel(carousel_id).slice(0, n);
            // "returns" the cards
            resolve(cards);
        }, timeout)
    });
};
