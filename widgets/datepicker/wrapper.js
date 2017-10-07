import UniversalDatePicker from "./containers/datepicker_old.jsx";
import ReactDOM from "react-dom";
import React from "react";
import jQuery from "jquery";

(function($) {
    $.fn.mtDatePicker = function(name, options) {

        let inputs = this.filter("input").toArray();

        if (inputs.length === 0) {
            throw new Error("mtDatePicker needs input element array as parameter");
        }

        if (!name || name === "") {
            throw new Error("a unique name must provide");
        }

        let settings = $.extend({
            inputElements: inputs,
        }, options);

        //Mapping Config to options
        /*
                maxLengthBetweenCalendars: 331,
                defaultReturnDayLength: 1,
                maxActiveDays: 331,
                advanceBooking: 21
        */


        if ($("#universal-datepicker-" + name).length === 0) {
            $(document.body).append($("<div id='universal-datepicker-" + name + "'></div>"));
        }

        let container = $("#universal-datepicker-" + name).get(0);

        let reactDatepikcer = React.createElement(UniversalDatePicker, settings, null);

        ReactDOM.render(
            reactDatepikcer,
            container
        );

        return function() {
          ReactDOM.unmountComponentAtNode(container);
        };
    };
}(jQuery));
