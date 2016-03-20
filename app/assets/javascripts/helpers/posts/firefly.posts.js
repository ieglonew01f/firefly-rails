FIREFLY.POSTS = {};

FIREFLY.POSTS = (function() {
    'use strict';

    var utils                 = FIREFLY.UTILS,
        post_card_template    = utils.get_template($('#post-card-template')),
        comment_card_template = utils.get_template($('#comment-card-template'));

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
            $(post_card_template({
                post: {
                    user: {
                        first_name: xhr.data.user.first_name,
                        last_name: xhr.data.user.last_name
                    },
                    content: xhr.data.post.content,
                    id: xhr.data.post.id,
                    comments: {}
                }
            })).hide().prependTo('.post-container').fadeIn("slow");
        })
        .fail(function() {

        })
        .always(function() {
            cleanup();
        });
    };

    //add comment handler
    var share_comment = function(this_obj) {
        var comment_data_args = {
            comment: this_obj.val(),
            comment_type: 1,
            post_id: this_obj.parents('.card.post-card-block').data('id')
        };

        var this_comment_card = this_obj.parents('.card.post-card-block').find('.comments-list');

        //send ajax request
        $.ajax({
            url: '/comments',
            method: 'POST',
            data: comment_data_builder(comment_data_args)
        })
        .done(function(xhr) {
            $(comment_card_template({
                comment: {
                    user: {
                        first_name: xhr.data.user.first_name,
                        last_name: xhr.data.user.last_name
                    },
                    comment: xhr.data.comment.comment,
                    post_id: xhr.data.comment.post_id
                }
            })).hide().appendTo(this_comment_card).fadeIn("slow");
        })
        .fail(function() {

        })
        .always(function() {
            cleanup();
        });
    };

    //like post handler
    var like_a_post = function(this_obj) {
        var like_data_args = {
            post_id: this_obj.parents('.post-card-block').data('id')
        };

        //send ajax request
        $.ajax({
            url: '/post_likes',
            method: 'POST',
            data: like_data_builder(like_data_args)
        })
        .done(function(xhr) {
            this_obj.attr('class', 'li-btns unlike-btn-a');
        })
        .fail(function() {

        })
        .always(function() {

        });
    };

    //unlike post handler
    var unlike_a_post = function(this_obj) {
        var post_id = this_obj.parents('.post-card-block').data('id');
        //send ajax request
        $.ajax({
            url: '/post_likes/'+post_id,
            method: 'DELETE',
            data: {post_id: post_id}
        })
        .done(function(xhr) {
            this_obj.attr('class', 'li-btns like-btn-a');
        })
        .fail(function() {

        })
        .always(function() {

        });
    };

    //like unlike data builder
    var like_data_builder = function(like_data) {
        return {
            post_id: like_data.post_id
        };
    };

    var post_data_builder = function(post_data) {

        //to do fancy stuff for diffrent type of posts

        return {
            post_text: post_data.post_text,
            post_type: post_data.type
        };
    };

    var comment_data_builder = function(comment_data) {
        //to do fancy stuff here

        return {
            comment: comment_data.comment,
            comment_type: comment_data.comment_type,
            post_id: comment_data.post_id
        };
    };

    var cleanup = function() {
        $('#text-status, .comment-input').val('');
    };

    return {
        share_post: share_post,
        share_comment: share_comment,
        like_a_post: like_a_post,
        unlike_a_post: unlike_a_post
    };
})();
