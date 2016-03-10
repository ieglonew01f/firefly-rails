FIREFLY.POSTS = {};

FIREFLY.POSTS = (function() {
    'use strict';

    var utils              = FIREFLY.UTILS,
        post_card_template = utils.get_template($('#post-card-template'));

    var share_post = function() {
        var post_data_args = {
            post_text: $('#text-status').val(),
            type: 1
        };

        //send ajax request
        $.ajax({
            url: '/posts',
            method: 'POST',
            data: post_data_builder(post_data_args)
        })
        .done(function(xhr) {
            $('.post-container').prepend(post_card_template({
                content: xhr.data.content
            }));
        })
        .fail(function() {

        })
        .always(function() {
            cleanup();
        });
    };

    var post_data_builder = function(post_data) {

        //to do fancy stuff for diffrent type of posts

        return {
            post_text: post_data.post_text,
            post_type: post_data.type
        };
    };

    var cleanup = function() {
        $('#text-status').val('');
    };

    return {
        share_post: share_post
    };
})();