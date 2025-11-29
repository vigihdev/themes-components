
(function ($) {
    "use strict";

    /**  @typedef {import("owlcarousel").IOwlCarouselOptions} IOwlCarouselOptions */

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
     */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    const TAG = 'Owl Our Clients'
    const SELECTOR = '.owl-carousel.client-kami-owl-carousel';


    class OwlOurClients {

        /** @type {JQuery<Element>} */
        $element;

        /** @type {IOwlCarouselOptions} */
        options = {};

        /**
         * @param {JQuery<Element>} $element
         */
        constructor($element) {

            this.$element = $element;
            this.#addAriaLabel();

            const options = $element.data('options')
            if (typeof options === 'object') {
                this.$element.owlCarousel(options);
                const optionsEl = this.$element.data('owl.carousel')
                this.options = optionsEl.options;

            }

        }

        #addAriaLabel() {
            this.$element
                .on('initialize.owl.carousel', (event) => {
                    timeOut(1000, () => {
                        $('.owl-dot').each(function (index) {
                            $(this).attr('aria-label', 'Navigate to Slide ' + (index + 1));
                        });
                    })
                })
        }

        static #validate() {
            return $(SELECTOR).length > 0
                && typeof $?.fn?.owlCarousel === 'function';
        }

        static instance() {
            if (OwlOurClients.#validate()) {
                new OwlOurClients($(SELECTOR))
            }
        }
    }
    OwlOurClients.instance();
}(jQuery));