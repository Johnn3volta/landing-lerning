(function () {

    function $(selector, el) {
        if (!el) {
            el = document;
        }

        return el.querySelector(selector)
    }

    'use strict';
    // Add vent listener for open from button

    var openFormButton = document.querySelector('.arrow-down');

    if (openFormButton) {
        openFormButton.addEventListener('click', function (e) {
            e.preventDefault();
            form.open();
        });
    }

}());