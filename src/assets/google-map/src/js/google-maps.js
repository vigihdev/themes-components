// google-maps
(function ($) {
    "use strict";
    const TAG = 'GoogleMaps'
    const ELEMENT = '.google-maps';

    /**
     * @template {google.maps.Size} TSize
     * @template {google.maps.InfoWindow} TInfoWindow
     * @template {google.maps.Map} TMap
     * @template {{lat:number,lng:number}} TLatLng
     * @template {{backgroundColor?: null | string, center?: TLatLng, clickableIcons?: null | boolean, controlSize?: null | number, disableDefaultUI?: null | boolean, disableDoubleClickZoom?: null | boolean, draggable?: null | boolean, draggableCursor?: null | string, draggingCursor?: null | string, fullscreenControl?: null | boolean, fullscreenControlOptions?: null | FullscreenControlOptions, gestureHandling?: null | string, heading?: null | number, isFractionalZoomEnabled?: null | boolean, keyboardShortcuts?: null | boolean, mapId?: null | string, mapTypeControl?: null | boolean, mapTypeControlOptions?: null | MapTypeControlOptions, mapTypeId?: null | string, maxZoom?: null | number, minZoom?: null | number, noClear?: null | boolean, panControl?: null | boolean, panControlOptions?: null | PanControlOptions, restriction?: null | MapRestriction, rotateControl?: null | boolean, rotateControlOptions?: null | RotateControlOptions, scaleControl?: null | boolean, scaleControlOptions?: null | ScaleControlOptions, scrollwheel?: null | boolean, streetView?: null | StreetViewPanorama, streetViewControl?: null | boolean, streetViewControlOptions?: null | StreetViewControlOptions, styles?: null | MapTypeStyle[], tilt?: null | number, zoom?: null | number, zoomControl?: null | boolean, zoomControlOptions?: null | ZoomControlOptions, }} TMapOtions
     */

    /**
     * @param {CallableFunction} callback
     * @param {number} ms
     * @return {Promise<void>}
    */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);

    const EVENTS = {
        BOUNDS_CHANGED: "bounds_changed",
        CENTER_CHANGED: "center_changed",
        CLICK: "click",
        CONTEXTMENU: "contextmenu",
        DBLCLICK: "dblclick",
        DRAG: "drag",
        DRAGEND: "dragend",
        DRAGSTART: "dragstart",
        HEADING_CHANGED: "heading_changed",
        IDLE: "idle",
        MAPTYPEID_CHANGED: "maptypeid_changed",
        MOUSEMOVE: "mousemove",
        MOUSEOUT: "mouseout",
        MOUSEOVER: "mouseover",
        PROJECTION_CHANGED: "projection_changed",
        RESIZE: "resize",
        RIGHTCLICK: "rightclick",
        TILESLOADED: "tilesloaded",
        TILT_CHANGED: "tilt_changed",
        ZOOM_CHANGED: "zoom_changed"
    }


    const SELECTOR = '#google-maps .google-maps-widget';

    /**
     * @type {TMapOtions} options
     */
    class GoogleMaps {

        /** @type {JQuery<SELECTOR>} */
        $element

        constructor(element) {

            this.$element = $(element);

            const data = this.$element.data();
            const options = this.$element.data('mapOption');
            const markerData = options?.marker
            const info = options?.info_window

            if (!options || typeof options !== 'object' || !markerData || !info || !options?.style_map) {
                return;
            }

            // console.log(options);
            this.$element.append([
                $('<div/>').addClass('map').attr('id', 'map').css(options.style_map)
            ])

            const map = new google.maps.Map(document.getElementById('map'), options)
            const markers = new google.maps.Marker({
                position: map.getCenter().toJSON(),
                map,
                title: options.name,
                icon: { url: markerData.icon, scaledSize: new google.maps.Size(50, 50) },
            });
            const infoWindow = new google.maps.InfoWindow(info);
            infoWindow.open({ anchor: markers, map });

            window.addEventListener('resize', function (event) {
                event.preventDefault();
                const width = this.outerWidth;
                if (width <= 768) {
                } else {
                }
            })

        }

        static validate() {
            return $(SELECTOR).length > 0 && typeof window['google'] === 'object';
        }

        static instance() {
            timeOut(500, () => {
                if (GoogleMaps.validate()) {
                    new GoogleMaps(SELECTOR)
                }
            })
        }
    }

    GoogleMaps.instance();

})(jQuery); 