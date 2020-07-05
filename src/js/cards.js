'use strict';

/**
 * Generate a random card object
 * @returns {Generator<{duration: (number), image: string, type: (string), title: string, cardinality: (string)}, void, *>}
 */
function *generateCard() {
    while(true) {
        const type = card_types[random_number(0, card_types.length)];
        const card = {
            image: 'https://loremflickr.com/400/400/cats',
            type: type.key,
            duration: type.key !== 'elearning'? random_number(1, 30000) : undefined,
            title: random_string(10, 4),
            cardinality: card_cardinalities[random_number(0, card_cardinalities.length)],
        }
        yield card;
    }
}

/**
 * Generate [n] cards
 * @param {number} n Number of cards to generate
 * @returns {[]}
 */
const generateCards = n => {
    const cards = [];
    for(let i = 0; i < n; i++) {
        cards.push(generateCard().next().value);
    }
    return cards;
}

/**
 * Stash carousel cards by a unique identificator
 * @type {object}
 */
const carousel_cards_cache = {};

/**
 * Generate random cards for a carousel
 * @param {string} carousel_id Cache key
 * @param {int} n Number of cards to generate if not cached
 * @returns {[]}
 */
const getCardsByCarousel = (carousel_id, n) => {
    const cards = generateCards(n);

    // cache init if it doesn't exist
    if(typeof carousel_cards_cache[carousel_id] === 'undefined') {
        carousel_cards_cache[carousel_id] = [];
    }

    carousel_cards_cache[carousel_id] = carousel_cards_cache[carousel_id].concat(cards);
    return cards;
};

/**
 * Get a random list of n cards for a specific carousel
 * @param {string} carousel_id Carousel unique identificator
 * @param {int} chunkSize The chunk size
 * @param {int} timeout Timeout in ms before to get the response
 * @returns {Promise} Promise that will resolve giving an array of cards
 */
const getCards = (carousel_id, chunkSize, timeout = 1000) => {
    // promise to simulate delay
    return new Promise(resolve => {
        // timeout, adds delay
        setTimeout(() => {
            // get a random number of chunk of the specified size
            const chunksToGet = random_number(2, 4);
            const cards = getCardsByCarousel(carousel_id, chunkSize * chunksToGet);
            // "returns" the cards
            resolve(cards);
        }, timeout)
    });
};
