
(function ($) {
    "use strict";

    /**
     * @template {import("infinite-scroll")} T
     * @template {import("infinite-scroll").Options} TOptions
     * @template {import("infinite-scroll").EventsMap} TEvent
     */

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
     */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    const TAG = 'InfiniteScroll'
    const SELECTOR = '.container-infinite-scroll';
    const infiniteStatus = 'infinite-load-status';

    /** @type {TEvent} */
    const EVENT = {
        append: "append.infiniteScroll",
        load: "load.infiniteScroll",
        request: "request.infiniteScroll",
        last: "last.infiniteScroll",
        error: "error.infiniteScroll",
        scrollThreshold: "scrollThreshold.infiniteScroll",

    }

    class InfiniteScroll {

        /** @type {JQuery<Element>} */
        element;

        /** @type {TOptions} */
        options = {};

        /** @type {T} */
        infinite;

        /**
         * @param {Element} element
         */
        constructor(element) {

            this.options = {
                elementScroll: true,
                status: '.infinite-load-status',
                hideNav: '.pagination',
                scrollThreshold: 200,
                path: '.page-item.next a.page-link',
                append: '.card-listing-post',
                history: true,
            }

            const options = this.options;
            const self = this;
            if (typeof options === 'object' && $(options.path).length > 0 && $(options.hideNav).length > 0) {

                this.element = $(element).infiniteScroll(options)
                this.infinite = this.element.data('infiniteScroll');

                $(document).on('scroll', (event) => {
                    event.preventDefault();
                    const scrollTop = $(event.target).scrollTop();
                    const outerHeight = self.element.outerHeight();
                    const top = self.element.offset().top;

                    if (outerHeight < scrollTop) {
                        self.infinite.loadNextPage();
                    }
                })

                this.element
                    .on(EVENT.append, (event, body, path, items, response) => {
                        timeOut(2500, () => {
                            self.backdrop().hide()
                            $('body').find(`.${infiniteStatus}`)?.remove();
                        })
                    })
                    .on(EVENT.load, (event, body, path, response) => {
                    })
                    .on(EVENT.request, (event, path, fetchPromise) => {
                        $('body').append(self.#scrollerStatus())
                        self.backdrop().show()
                    })
                    .on(EVENT.last, (event) => {
                        timeOut(2500, () => {
                            const last = $('<div/>').addClass('text-center bold text-success f20').text('End of content')
                            self.element.append(last)
                        })
                    })
            }

            // Test
        }

        backdrop() {
            const backdrop = $('<div />').addClass('backdrop-infinite-scroll fade show')
            const self = this;
            return {
                show: () => {
                    this.backdrop().hide();
                    $('body').append(backdrop)
                },
                hide: () => {
                    $('body').find('.backdrop-infinite-scroll')?.remove()
                }
            }
        }

        #scrollerStatus() {
            let scroller = [
                `<div class="${infiniteStatus}">`,
                `<div class="infinite-loader-spinner infinite-scroll-request">`,
                `<div class="spinner-container">`,
                `<div class="spinner-center"></div>`,
                `</div>`,
                `</div>`,
                `<div class="infinite-scroll-last"></div>`,
                `<div class="infinite-scroll-error"></div>`,
                `</div>`,
            ].join('');
            return $(scroller)
        }

        static #validate() {
            return $(SELECTOR).length > 0
                && typeof window['InfiniteScroll'] === 'function';
        }

        static instance() {
            if (InfiniteScroll.#validate()) {
                $(SELECTOR).each((i, element) => {
                    new InfiniteScroll(element)
                })
            }
        }
    }
    InfiniteScroll.instance();
}(jQuery));