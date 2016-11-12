FIREFLY.PEOPLE_HELPER = {};

FIREFLY.PEOPLE_HELPER = (function() {
    'use strict';

    var add_user = function(elem) {
        //data to send
        var data = {
            for_id: elem.attr('data-id')
        };
        //send ajax request
        $.ajax({
            url: '/people/add_friend',
            method: 'POST',
            data: data,
            beforeSend: function(){
                elem.html('<i class="fa fa-circle-o-notch fa-spin"></i>');
            }
        })
        .done(function(xhr) {
            elem.html('Request Sent')
                .removeClass('add_user');
        })
        .fail(function() {
            elem.html('Add');
        })
        .always(function() {

        });
    };

    var accept_user = function(elem) {
        //data to send
        var data = {
            by_id: elem.attr('data-id')
        };
        //send ajax request
        $.ajax({
            url: '/people/accept_friend',
            method: 'POST',
            data: data,
            beforeSend: function() {
                elem.html('<i class="fa fa-circle-o-notch fa-spin"></i>');
            }
        })
        .done(function(xhr) {
            elem.html('Friends')
                .removeClass('.add_user_accept');
        })
        .fail(function() {
            elem.html('Accept Request');
        })
        .always(function() {

        });
    };

    var deny_user = function(elem) {
        //data to send
        var data = {
            by_id: elem.attr('data-id')
        };
        //send ajax request
        $.ajax({
            url: '/people/deny_friend',
            method: 'POST',
            data: data,
            beforeSend: function() {
                elem.html('<i class="fa fa-circle-o-notch fa-spin"></i>');
            }
        })
        .done(function(xhr) {
            //elem.html('Add Friend')
                //.removeClass('.add_user_deny');
        })
        .fail(function() {
            //elem.html('Accept Request');
        })
        .always(function() {

        });
    };

    var remove_user = function(elem) {
        //data to send
        var data = {
            by_id: elem.attr('data-id')
        };
        //send ajax request
        $.ajax({
            url: '/people/deny_friend',
            method: 'POST',
            data: data,
            beforeSend: function() {
                elem.html('<i class="fa fa-circle-o-notch fa-spin"></i>');
            }
        })
        .done(function(xhr) {
            //elem.html('Add Friend')
                //.removeClass('.add_user_deny');
        })
        .fail(function() {
            //elem.html('Accept Request');
        })
        .always(function() {

        });
    };

    var follow_user = function(elem) {
        //data to send
        var data = {
            following_id: elem.attr('data-id')
        };
        //send ajax request
        $.ajax({
            url: '/people/follow_person',
            method: 'POST',
            data: data,
            beforeSend: function() {
                elem.html('<i class="fa fa-circle-o-notch fa-spin"></i>');
            }
        })
        .done(function(xhr) {
            elem.html('Un Follow')
                .removeClass('.follow-user')
                .addClass('.unfollow-user');
        })
        .fail(function() {
            //elem.html('Accept Request');
        })
        .always(function() {
            elem.html('Un Follow');
        });
    };

    var unfollow_user = function(elem) {
        //data to send
        var data = {
            following_id: elem.attr('data-id')
        };
        //send ajax request
        $.ajax({
            url: '/people/unfollow_person',
            method: 'POST',
            data: data,
            beforeSend: function() {
                elem.html('<i class="fa fa-circle-o-notch fa-spin"></i>');
            }
        })
        .done(function(xhr) {
            elem.html('Follow')
                .addClass('.follow-user')
                .removeClass('.unfollow-user');
        })
        .fail(function() {
            elem.html('Accept Request');
        })
        .always(function() {
            elem.html('Follow');
        });
    };

    return {
        add_user: add_user,
        accept_user: accept_user,
        deny_user: deny_user,
        remove_user: remove_user,
        follow_user: follow_user,
        unfollow_user: unfollow_user
    };
})();
