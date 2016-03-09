FIREFLY.HOME = {};

FIREFLY.HOME = (function() {
    'use strict';
    var posts = FIREFLY.POSTS;

    var event_listners = function() {
        //on click share status
        $('#share-post').click(function() {
            if ($('#text-status').val() === '') return; //do nothing if post message empty
            posts.share_post();
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
    FIREFLY.HOME.init();
});
