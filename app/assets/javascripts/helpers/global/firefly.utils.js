var FIREFLY = {};
FIREFLY.UTILS = {};

FIREFLY.UTILS = (function() {
    'use strict';

    var get_template = function(elem) {
        return Handlebars.compile(elem.html());
    };

    return {
        get_template: get_template
    };
})();
