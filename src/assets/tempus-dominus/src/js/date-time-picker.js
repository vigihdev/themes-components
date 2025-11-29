
(function ($) {
    "use strict";

    /**
     * @template {TempusDominus} T
     * @template {import("tempus-dominus/display/index").default} TDisplay
     * @template {import("tempus-dominus/utilities/optionsStore")} TOptionsStore
     * @template {TempusDominus.TempusDominus} TTempusDominus
     * @template {TempusDominus.Unit} TUnit
     * @template {TempusDominus.DateTime} TDateTime
     * @template {TempusDominus.Options} TOptions
     */

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
     */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    const TAG = 'DateTimePicker'
    const SELECTOR = '.form-control.form-control-date-time-picker';
    const CONTAINER_PICKER = '.container-date-time-picker';
    const INPUT_GROUP = '.input-group';

    const EVENT = {
        show: "show.td",
        hide: "hide.td",
        change: "change.td",
        update: "update.td",
    }

    /** @type {TempusDominus.Options} */
    const optionsDefauld = {
        restrictions: {
            minDate: moment()._d
        },
        display: {
            theme: 'light',
            components: {
                date: true, month: false, year: false, decades: false, clock: true, hours: true,
                minutes: true, seconds: false, useTwentyfourHour: true
            }
        },

        localization: { locale: 'id' }
    }


    class OptionsPicker {
    }

    class ButtonClose {

        /** @type {TTempusDominus} */
        tempusDominus;

        /** @type {string} variable */
        btnClose = 'btn-close'

        /** @type {JQuery<Element>} */
        toolbar

        /**
         * @param {TTempusDominus} tempus
         */
        constructor(tempus) {
            if (tempus && typeof tempus === 'object' && tempus?.display?.widget) {
                const widget = $(tempus?.display?.widget)?.length > 0 ? $(tempus?.display?.widget) : false;
                const toolbar = widget && widget?.find('.toolbar').length > 0 ? widget?.find('.toolbar') : false;

                if (toolbar && toolbar.find(`.${this.btnClose}`).length === 0) {
                    this.tempusDominus = tempus;
                    this.toolbar = toolbar;

                    toolbar.append(this.#getHtml())
                }
            }
        }

        /**
         * @return {JQuery<Element>}
         */
        #getHtml() {
            const self = this;
            const btnClose = $('<div/>')
                .attr({ 'data-action': 'closePicker', title: 'Close Picker' })
                .addClass(`${this.btnClose}`)
                .append([
                    $('<span/>').addClass('btn-close-title bold text-danger ripple-effect').text('Close')
                ])

            btnClose.on('click', (event) => {
                event.preventDefault();
                self.tempusDominus.hide();
            });

            return btnClose;
        }

        /**
         * @param {TTempusDominus} tempus
         * @return {void}
         */
        static instance(tempus) {
            new ButtonClose(tempus)
        }
    }

    class DateTimePicker {

        /** @type {JQuery<Element>} */
        element;

        /** @type {TOptions} */
        options;

        /** @type {TTempusDominus}  */
        tempusDominus;

        /** @type {string} */
        styleWidgetOld;

        /** @type {TDisplay} */
        display;

        /**
         * @param {Element} element
         */
        constructor(element) {

            this.element = $(element);
            const inputGroup = this.element?.closest(INPUT_GROUP)
            if (inputGroup?.length > 0) {
                if (inputGroup.find(CONTAINER_PICKER).length === 0) {
                    inputGroup.append([
                        $('<div/>').addClass(CONTAINER_PICKER.slice(1))
                            .css({
                                position: "absolute",
                                top: '52px',
                            })
                    ])
                }
            }

            var data = this.element.data();
            data = $.extend(data, {
                container: $(CONTAINER_PICKER).get(0)
            })

            this.options = $.extend(optionsDefauld, data)

            this.element.val(moment().add(1, 'hour').format('YYYY-MM-DD HH:mm'))
            this.element.closest('.textfield')?.addClass('textfield-floating-label-completed');

            this.tempusDominus = new tempusDominus.TempusDominus(element, this.options);
            this.display = this.tempusDominus.display;

            const self = this;
            const tempus = this.tempusDominus;

            tempus.dates.formatInput = (date) => {
                return moment(date).format('YYYY-MM-DD HH:mm')
            }

            this.#events();
        }

        #events() {
            const self = this;
            const tempus = this.tempusDominus;

            $(tempus._toggle)
                .on(EVENT.show, (event) => {
                    var currentView = self.display.optionsStore.currentView;

                    $(self.display.widget).addClass('bootstrap')

                    if (currentView !== 'calendar') {
                        const togglePicker = $('[data-action="togglePicker"]');
                        togglePicker.trigger('click')
                    }

                })
                .on(EVENT.hide, (event) => {
                })
                .on(EVENT.update, (event) => {
                    ButtonClose.instance(tempus);
                })
        }


        static #validate() {
            return $(SELECTOR).length > 0
                && typeof moment === 'function'
                && typeof window['tempusDominus'] === 'object';
        }

        static instance() {
            if (DateTimePicker.#validate()) {

                $(SELECTOR).each((i, input) => {
                })
            }
        }
    }


}(jQuery));