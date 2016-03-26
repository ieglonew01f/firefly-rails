FIREFLY.POSTS = {};

FIREFLY.POSTS = (function() {
    'use strict';

    var utils                 = FIREFLY.UTILS,
        post_card_template    = utils.get_template($('#post-card-template')),
        comment_card_template = utils.get_template($('#comment-card-template')),
        loader_template       = '<div class="loader loader-inner ball-pulse"><div></div><div></div><div></div></div>',
        photo_upload_form     = $('#form-photo-upload');
    var share_post = function() {
        var post_data_args = {
            post_text: $('#text-status').val(),
            type: 1
        };

        //send ajax request
        $.ajax({
            url: '/posts',
            method: 'POST',
            data: post_data_builder(post_data_args),
            beforeSend: function() {
                $('#share-post').hide();
                $('#status-widget-loader').show();
            }
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
            $('#share-post').show();
            $('#status-widget-loader').hide();
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
            data: comment_data_builder(comment_data_args),
            beforeSend: function() {

            }
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
        var this_obj_parents = this_obj.parents('.post-card-block');
        var like_data_args = {
            post_id: this_obj.parents('.post-card-block').data('id'),
            post_likes: this_obj_parents.attr('data-likes')
        };

        //send ajax request
        $.ajax({
            url: '/post_likes',
            method: 'POST',
            data: like_data_builder(like_data_args),
            beforeSend: function(){
                setTimeout(function(){
                  this_obj.addClass('animated bounceIn');
                }, 100);
                this_obj.attr('class', 'li-btns unlike-btn-a');

                //set like count
                this_obj_parents.find('span.like-count').text(parseInt(like_data_args.post_likes) + 1);
                this_obj_parents.attr('data-likes', parseInt(like_data_args.post_likes) + 1);
            }
        })
        .done(function(xhr) {

        })
        .fail(function() {
            this_obj.attr('class', 'li-btns like-btn-a');
        })
        .always(function() {

        });
    };

    //unlike post handler
    var unlike_a_post = function(this_obj) {
        var post_id = this_obj.parents('.post-card-block').data('id');
        var this_obj_parents = this_obj.parents('.post-card-block');
        //send ajax request
        $.ajax({
            url: '/post_likes/'+post_id,
            method: 'DELETE',
            data: {post_id: post_id},
            beforeSend: function(){
                setTimeout(function(){
                  this_obj.addClass('animated bounceIn');
                }, 100);

                this_obj.attr('class', 'li-btns like-btn-a');
                //set like count
                this_obj_parents.find('span.like-count').text(parseInt(this_obj_parents.attr('data-likes')) - 1);
                this_obj_parents.attr('data-likes', parseInt(this_obj_parents.attr('data-likes')) - 1);
            }
        })
        .done(function(xhr) {

        })
        .fail(function() {
            this_obj.attr('class', 'li-btns unlike-btn-a');
        })
        .always(function() {

        });
    };

    //remove post handler
    var remove_post = function(this_obj) {

        var this_post = this_obj.parents('.post-card-block');
        var post_id   = this_post.attr('data-id');


        //send ajax request
        $.ajax({
            url: '/posts/'+post_id,
            method: 'DELETE',
            beforeSend: function(){
                this_post.find('.loader-post-card-manage-buttons').show();
                this_post.find('.post-card-manage-buttons-inner').hide();
            }
        })
        .done(function(xhr) {
            this_post.fadeOut("slow");
        })
        .fail(function() {

        })
        .always(function() {
            this_post.find('.loader-post-card-manage-buttons').hide();
            this_post.find('.post-card-manage-buttons-inner').show();
        });
    };


    //edit post handler
    var edit_post = function(this_obj) {

        var this_post   = this_obj.parents('.post-card-block'),
            post_id     = this_post.attr('data-id'),
            new_content = this_post.find('.post-edit-text-box').val();

        //send ajax request
        $.ajax({
            url: '/posts/'+post_id,
            method: 'PATCH',
            data: {post_id: post_id, post_content: new_content},
            beforeSend: function(){
                this_post.find('.post-card-edit-loader').show();
                this_post.find('.post-edit-container').hide();
            }
        })
        .done(function(xhr) {
            this_post.find('.post-content p').text(new_content);
        })
        .fail(function() {

        })
        .always(function() {
            this_post.find('.post-edit-container').hide();
            this_post.find('.post-card-edit-loader').hide();
            this_post.find('.post-content').show();
        });

    };

    //image post
    var image_post = function() {
        photo_upload_form.ajaxForm({
        		beforeSend: function() { //before sending form
                console.log('before_send');
        		},
        		uploadProgress: function(event, position, total, percentComplete) { //on progress
                console.log('uploadProgress');
        		},
        		complete: function(response) { // on complete
                console.log(response.responseText);
        		}
      	});
    }

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
        unlike_a_post: unlike_a_post,
        remove_post: remove_post,
        edit_post: edit_post,
        image_post: image_post
    };
})();
