
(function ($) {
    "use strict";

    /**  @typedef {import("owlcarousel").IOwlCarouselOptions} IOwlCarouselOptions */

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
     */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    const TAG = 'Review Customer'
    const SELECTOR = '.owl-carousel.review-customer-owl-carousel';


    class ReviewCustomer {

        /** @type {JQuery<Element>} */
        $element;

        /** @type {IOwlCarouselOptions} */
        options = {};

        /**
         * @param {JQuery<Element>} $element
         */
        constructor($element) {

            this.$element = $element;
            this.$element.owlCarousel($element.data('options'));
            const options = this.$element.data('owl.carousel')
            this.options = options;
        }

        static #validate() {
            return $(SELECTOR).length > 0
                && typeof $?.fn?.owlCarousel === 'function';
        }

        static instance() {
            if (ReviewCustomer.#validate()) {
                new ReviewCustomer($(SELECTOR))
            }
        }
    }
    ReviewCustomer.instance();
}(jQuery));