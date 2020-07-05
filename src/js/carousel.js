'use strict';

/**
 * Carousel Class
 */
class Carousel {
    // configs
    chunkSize = chunkSize;
    card_types = card_types;
    card_cardinalities = card_cardinalities;
    card_width = card_width;

    // all the fetched cards
    cards = [];

    // true during fetching
    fetching = false;

    /**
     * Carousel constructor
     * @param {object} opts
     */
    constructor(opts) {
        // check if opts are valid
        if (typeof opts.container === 'undefined') {
            throw new Error('Carousel container is not defined');
        }

        if (typeof opts.title === 'undefined') {
            throw new Error('Carousel title is not defined');
        }

        if (typeof opts.subtitle === 'undefined') {
            throw new Error('Carousel subtitle is not defined');
        }

        this.opts = opts;

        // render carousl html
        this.renderCarousel();

        // add carousel listeners
        this.addListeners();

        // fetch cards
        this.addCards();
    }

    /**
     * Set fetching value
     * @param {boolean} status Fetching status
     */
    setFetchingStatus(status) {
        this.fetching = status;
    }

    /**
     * Check if fetching value is true
     * @returns {boolean}
     */
    isFetching() {
        return this.fetching;
    }

    /**
     * Fetch new cards and render them
     */
    async addCards() {
        if (this.isFetching()) {
            return;
        }
        this.setFetchingStatus(true);
        const cards = await this.opts.fetchCards(this.chunkSize);
        this.cards = this.cards.concat(cards);
        this.renderCards(cards);
    }

    /**
     * Build carousel html
     * @returns {string}
     */
    buildCarousel() {
        const icon_html = this.opts.icon ? `
            <div class="carousel__header__icon">
                <i class="material-icons">${this.opts.icon}</i>
            </div>
        ` : '';

        return `
            <div class="carousel">
                <div class="carousel__header">
                    ${icon_html}
                    <div class="carousel__header__text">
                        <div class="carousel__header__text__title">${this.opts.title}</div>
                        <div class="carousel__header__text__subtitle">${this.opts.subtitle}</div>
                    </div>
                </div>
                <div class="carousel__cards__container">
                    <div class="carousel__cards__arrow carousel__cards__arrow--prev">
                        <i class="material-icons">chevron_left</i>
                    </div>
                    <div class="carousel__cards__arrow carousel__cards__arrow--next">
                        <i class="material-icons">chevron_right</i>
                    </div>
                    <div class="carousel__cards"></div>
                </div>
            </div>
        `;
    }

    /**
     * Render carousel
     */
    renderCarousel() {
        const html = this.buildCarousel();
        const container_el = document.getElementById(this.opts.container);
        container_el.innerHTML = html;
        this.container = container_el;
    }

    /**
     * Build card html
     * @returns {string}
     */
    buildCard(card) {
        if (typeof card.title === 'undefined') {
            throw new Error('Card must have a title');
        }

        if (typeof card.image === 'undefined') {
            throw new Error('Card must have an image');
        }

        const card_type = this.card_types.find(t => t.key === card.type);
        if (typeof card_type === 'undefined') {
            throw new Error('Card must have a type');
        }

        if (!this.card_cardinalities.includes(card.cardinality)) {
            throw new Error('Card must have a cardinality');
        }


        let duration_str = '';
        if (card.duration) {
            duration_str = durationToReadableTime(card.duration);
        }

        const language_html = card_type.key === 'elearning'
            ? '<div class="carousel__card__content__language">English</div>'
            : '';

        return `
            <div class="carousel__card carousel__card--${card.cardinality}">
                <div class="carousel__card__image">
                    <img src="${card.image}?random=${Math.random()}" alt="Card image">
                    <div class="carousel__card__image__info">
                        <div>${card_type.label}</div>
                        <div>${duration_str}</div>
                    </div>
                </div>
                <div class="carousel__card__content">
                    <div class="carousel__card__content__title">${card.title}</div>
                    ${language_html}
                </div>
            </div>
        `;
    }

    /**
     * Build placeholder card html
     * @returns {string}
     */
    buildPlaceholder() {
        return `
            <div class="carousel__card carousel__card--placeholder">
                <div class="carousel__card__image">
                    <img src="https://via.placeholder.com/400x400" alt="Card placeholder image">
                </div>
            </div>
        `;
    }

    /**
     * Render cards in dom
     */
    renderCards(cards) {
        const cards_el = document.querySelector(`#${this.opts.container} .carousel__cards`);

        // remove placeholders
        document.querySelectorAll(`#${this.opts.container} .carousel__card--placeholder`)
            .forEach(placeholder => placeholder.parentNode.removeChild(placeholder));

        // create cards
        let cards_html = '';
        for (const card of cards) {
            cards_html += this.buildCard(card);
        }

        // create placeholders
        for (let i = 0; i < this.chunkSize; i++) {
            cards_html += this.buildPlaceholder();
        }

        // render
        cards_el.innerHTML += cards_html;

        this.setFetchingStatus(false);
    }

    /**
     * Check if a placeholder is shown in cards container
     */
    placeholderIsShown() {
        const placeholder_el = document.querySelector(`#${this.opts.container} .carousel__card--placeholder`);
        const cards_el = placeholder_el.parentElement;

        // is the first placeholder shown?
        if (cards_el.scrollLeft + cards_el.offsetWidth > placeholder_el.offsetLeft) {
            // yes, fetch more cards
            this.addCards();
        }
    }

    /**
     * Add listeners to carousel
     */
    addListeners() {
        const ctx = this;
        const carousel_el = document.querySelector(`#${this.opts.container} .carousel`);
        const cards_el = document.querySelector(`#${ctx.opts.container} .carousel__cards`);

        // check if mouse gets over the carousel element
        carousel_el.addEventListener('mouseenter', function () {
            const arrows = document.querySelectorAll(`#${ctx.opts.container} .carousel__cards__arrow`);
            arrows.forEach(arrow => arrow.classList.add('carousel__cards__arrow--show'));
        });
        carousel_el.addEventListener('mouseleave', function () {
            const arrows = document.querySelectorAll(`#${ctx.opts.container} .carousel__cards__arrow`);
            arrows.forEach(arrow => arrow.classList.remove('carousel__cards__arrow--show'));
        });

        // check if user clicks on prev arrow
        document.querySelector(`#${this.opts.container} .carousel__cards__arrow--prev`)
            .addEventListener('click', function () {
                cards_el.scrollLeft -= ctx.card_width;
            });

        // check if user clicks on next arrow
        document.querySelector(`#${this.opts.container} .carousel__cards__arrow--next`)
            .addEventListener('click', function () {
                cards_el.scrollLeft += ctx.card_width;
                ctx.placeholderIsShown();
            });

        // on user scroll
        document.querySelector(`#${this.opts.container} .carousel__cards`)
            .addEventListener('scroll', function () {
                ctx.placeholderIsShown();
            });
    }
}
