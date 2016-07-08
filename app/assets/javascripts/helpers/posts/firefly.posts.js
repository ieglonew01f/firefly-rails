FIREFLY.POSTS = {};

FIREFLY.POSTS = (function() {
    'use strict';

    var utils                      = FIREFLY.UTILS,
        post_card_template         = utils.get_template($('#post-card-template')),
        comment_card_template      = utils.get_template($('#comment-card-template')),
        post_img_template          = utils.get_template($('#post-image-container-template')),
        post_next_template         = utils.get_template($('#post-image-next-container-template')),
        post_link_preview_template = utils.get_template($('#expanded-url-preview-template')),
        loader_template            = '<div class="loader loader-inner ball-pulse"><div></div><div></div><div></div></div>',
        photo_upload_form          = $('#form-photo-upload'),
        post_link                  = false,
        parse_link                 = null,
        post_meta                  = null,
        is_image_post              = false;

    var share_post = function() {
        var post_type = 1; //default normal text posts
        //post type 2 link type post
        //post type 3 image type post

        var post_content = $('#text-status').val();

        if (parse_link === post_content) {
            post_content = null;
        }

        if(post_link) {
            post_type = 2; //link type post
        }
        if (is_image_post) {
            post_type = 3;
        } //image type post

        var post_data_args = {
            post_text: post_content,
            type: post_type,
            post_meta: post_meta
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
            var post_meta = {};
            var has_post_meta_data = 'hidden';

            if (xhr.data.post.post_type === "2" || xhr.data.post.post_type === 2) { //do this only for link type post
              if (xhr.data.post.post_meta) {
                  post_meta = {
                      title: xhr.data.post.post_meta.title,
                      description: xhr.data.post.post_meta.description,
                      image: xhr.data.post.post_meta.images[0].src,
                      link: xhr.data.post.post_meta.url
                  };
                  has_post_meta_data = '';
              }
            }
            else if (xhr.data.post.post_type === "3" || xhr.data.post.post_type === 3) {
              $('.photoset-grid-lightbox').photosetGrid({
                  layout: '232',
                  width: '100%',
                  gutter: '3px',
                  highresLinks: true,
                  lowresWidth: 300,
                  rel: 'gallery-01',
                  borderActive: true,
                  borderWidth: '3px',
                  borderColor: '#000000',
                  borderRadius: '3px',
                  borderRemoveDouble: false,

                  onInit: function(){},
                  onComplete: function(){

                      $('.photoset-grid-lightbox').css({
                          'visibility': 'visible'
                      });

                  }
              });
            }
            else {
                post_meta = {
                    title: '',
                    description: '',
                    image: '',
                    link: ''
                };
            }

            $(post_card_template({
                post: {
                    user: {
                        first_name: xhr.data.user.first_name,
                        last_name: xhr.data.user.last_name,
                        username: xhr.data.user.username,
                        profile_picture: xhr.data.user.profile_picture
                    },
                    content: xhr.data.post.content,
                    id: xhr.data.post.id,
                    post_meta: post_meta,
                    has_post_meta_data: has_post_meta_data,
                    comments: {}
                }
            })).hide().prependTo('.post-container').fadeIn("slow");
        })
        .fail(function() {

        })
        .always(function() {
            $('#share-post').show();
            $('#status-widget-loader').hide();
            $('.link-preview-container').empty();
            parse_link = null;
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

    //parse_link helper
    var parse_linker = function(link) {

        //send ajax request
        $.ajax({
            url: '/posts/parse_link',
            method: 'GET',
            data: {link: link},
            beforeSend: function(){
                $('.link-preview-container').empty();
                post_meta = null;
                $('#share-post').hide();
                $('#status-widget-loader').show();
                parse_link = link;
            }
        })
        .done(function(xhr) {
            $(post_link_preview_template({
                image_src: xhr.data.images[0].src,
                link_title: xhr.data.title,
                link_desc: xhr.data.description,
                url: xhr.data.url
            })).hide().appendTo($('.link-preview-container')).fadeIn("slow");

            post_link = true;
            post_meta = xhr.data;
        })
        .fail(function() {

        })
        .always(function() {
          $('#share-post').show();
          $('#status-widget-loader').hide();
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
                var image_data = JSON.parse(response.responseText).data.meta_data;
                $('#image-container').show();
                $(post_img_template({
                    image_thumb: image_data.thumb.url
                })).appendTo('#image-container');
                $('.panel-img-add').parents('.col-sm-2').remove();
                $(post_next_template()).appendTo('#image-container');
                is_image_post = true;
        		}
      	});
    };

    var like_a_comment = function(this_obj) {
        var comment_id = this_obj.parents('.comment-card').attr('data-id');
        var this_obj_parents = this_obj.parents('.comment-card');

        //send ajax request
        $.ajax({
            url: '/comment_likes/',
            method: 'POST',
            data: {comment_id: comment_id},
            beforeSend: function(){
                this_obj.removeClass('btn-comment-like')
                        .addClass('btn-comment-unlike')
                        .text('Unlike');
                this_obj_parents.find('.tiny-like-hand')
                                .removeClass('hidden');
                var current_likes_count = this_obj_parents.find('.tiny-like-hand')
                                                          .attr('data-likes');
                var new_likes_count = parseInt(current_likes_count) + 1;

                this_obj_parents.find('.tiny-like-hand')
                                .attr('data-likes', new_likes_count)
                                .text(' '+new_likes_count);
            }
        })
        .done(function(xhr) {

        })
        .fail(function() {
            var current_likes_count = this_obj_parents.find('.tiny-like-hand')
                                                      .attr('data-likes');
            var new_likes_count = parseInt(current_likes_count) - 1;

            this_obj_parents.find('.tiny-like-hand')
                            .attr('data-likes', new_likes_count)
                            .text(' '+new_likes_count);
        })
        .always(function() {

        });
    };

    var unlike_a_comment = function(this_obj) {
      var comment_id = this_obj.parents('.comment-card').attr('data-id');
      var this_obj_parents = this_obj.parents('.comment-card');

      //send ajax request
      $.ajax({
          url: '/comment_likes/'+comment_id,
          method: 'DELETE',
          data: {id: comment_id},
          beforeSend: function() {
              var new_likes_count = 0;

              this_obj.removeClass('btn-comment-unlike')
                      .addClass('btn-comment-like')
                      .text('Like');

              var current_likes_count = this_obj_parents.find('.tiny-like-hand')
                                                        .attr('data-likes');

              if (parseInt(current_likes_count) > 0) {
                  new_likes_count = parseInt(current_likes_count) - 1;
              }

              this_obj_parents.find('.tiny-like-hand')
                              .attr('data-likes', new_likes_count)
                              .text(' '+new_likes_count);
          }
      })
      .done(function(xhr) {

      })
      .fail(function() {
          var current_likes_count = this_obj_parents.find('.tiny-like-hand')
                                                    .attr('data-likes');
          var new_likes_count = parseInt(current_likes_count) + 1;

          this_obj_parents.find('.tiny-like-hand')
                          .attr('data-likes', new_likes_count)
                          .text(' '+new_likes_count);
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
            post_type: post_data.type,
            post_meta: post_data.post_meta
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
        image_post: image_post,
        parse_linker: parse_linker,
        like_a_comment: like_a_comment,
        unlike_a_comment: unlike_a_comment
    };
})();
