FIREFLY.PEOPLE = {};

FIREFLY.PEOPLE = (function() {
    'use strict';
    var $root = $('.container'),
        people_helper = FIREFLY.PEOPLE_HELPER;

    var event_listners = function() {
        //adding user as a friend
        $root.on('click', '.add_user', function() {
            people_helper.add_user($(this));
        });

        //accepting a friend request
        $root.on('click', '.add_user_accept', function() {
            people_helper.accept_user($(this));
        });
    };

    var init = function() {
        event_listners();
    };

    return {
        init: init
    };
})();


$(document).ready(function(){
    FIREFLY.PEOPLE.init();
});
