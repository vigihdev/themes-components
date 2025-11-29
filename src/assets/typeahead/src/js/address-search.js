
//@ts-nocheck
(function ($) {
    "use strict";

    /**
     * @template {Twitter.Typeahead.ClassNames} TClassNames
     * @template {Twitter.Typeahead.Templates} TTemplates
     * @template {Twitter.Typeahead.Dataset} TDataset
     * @template {Twitter.Typeahead.Options} TOptions
     * @template {google.maps.places.AutocompleteService} TService
     * @template {google.maps.places.AutocompletePrediction} TAutocompletePrediction
     */

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
     */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    const TAG = 'AddressSearch'
    const SELECTOR = '.form-control.form-control-address-picker';

    class AddressSearch {

        /** @type {string} */
        display;

        /** @type {string} */
        name;

        /** @type {number} */
        limit = 7

        /** @type {(query:string,syncResults:<T>(results:T[]) => void) => void,asyncResults?: <T>(result: T[]) => void} */
        source;

        /** @type {TTemplates} */
        templates;

        /** @type {boolean} */
        async = true;

        /** @type {boolean} */
        highlight = true;

        /** @type {TClassNames} */
        classNames;

        /** @type {TOptions} */
        options = {};

        constructor(element) {
            this.element = $(element);
            this.#init();
        }

        #init() {
            this.display = "secondary_text";
            this.name = "address-search";
            this.source = this.#setSource
            this.templates = {
                suggestion: this.#templates().suggestion,
                notFound: this.#templates().empty
            }

            this.options = {
                highlight: false,
                hint: true,
            }

            const typeahead = this.element.typeahead(this.options, this);
            this.element.closest('.twitter-typeahead')
                .addClass('twitter-typeahead-address-search')
        }

        /**
         * @param {string} query
         * @param {(results:TAutocompletePrediction[]) => void} syncResults
         * @param {<T>(results:T[]) => void} asyncResults
         */
        #setSource(query, syncResults, asyncResults) {
            const options = { types: [], componentRestrictions: { country: 'ID' }, input: query }
            const service = new google.maps.places.AutocompleteService();

            service?.getPlacePredictions(options, (predictions, status) => {
                if (status === 'OK') {
                    let items = predictions.map(p => $.extend(p, { secondary_text: p.structured_formatting.secondary_text }));
                    syncResults(items.forEach(item => asyncResults([item])))
                    //console.log(this);
                }
            })
        }

        #templates() {
            return {
                suggestion: Handlebars.compile(
                    "<div>" +
                    "<div class='item-append'><i class='material-icons-outlined'>location_on</i></div>" +
                    "<div class='item-body'>" +
                    "<div class='item-body-title'>{{structured_formatting.main_text}}</div>" +
                    "<div class='item-body-desc'>{{structured_formatting.secondary_text}}</div>" +
                    "</div>" +
                    "<div class='item-prepend'><i class='material-icons-outlined'>north_west</i></div>" +
                    "</div>"
                ),
                empty: '<div class="empty-message">No results</div>',
            };
        }

        static #validate() {

            return $(SELECTOR).length > 0
                && typeof window['google'] === 'object'
                && typeof google?.maps?.places?.AutocompleteService === 'function'
                && typeof $.fn.typeahead === 'function'
                && typeof window['Handlebars'] === 'object';
        }

        static instance() {
            if (AddressSearch.#validate()) {
                $(SELECTOR).each((i, input) => {
                    new AddressSearch(input)
                })
            }
        }
    }

    timeOut(1000, () => {
        AddressSearch.instance();
    })
}(jQuery));