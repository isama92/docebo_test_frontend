'use strict';

const fetchCards = function (chunkSize) {
    return getCards(this.container, chunkSize);
};

const carousel_1_options = {
    container: 'my-carousel-1',
    title: 'Fresh and just uploaded content',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    icon: 'wb_incandescent',
    fetchCards: fetchCards,
};

const carousel_2_options = {
    container: 'my-carousel-2',
    title: 'Another carousel instance title',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    fetchCards: fetchCards,
};


// document is ready
document.addEventListener('DOMContentLoaded', (event) => {
    // init carousels
    const carousel_1 = new Carousel(carousel_1_options);
    const carousel_2 = new Carousel(carousel_2_options);
})
