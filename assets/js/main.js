'use strict';

//  SigningIn actions
var commonActions = (function (document, $) {
    var $doc = $(document);

    var selector = {
        toggleBlockLink:       '.js-toggle-block-link',
        dragArea:              '.js-drag-area'
    };

    var className = {
        active:   'is-active',
        visibile: 'is-visible',
        hidden:   'is-hidden',
        dragover: 'is-dragover',
        error:    'is-error',
        warning:  'is-warning'
    };

    function _tabs() {
        $('ul.tabs li').click(function(){
            var tab_id = $(this).attr('data-tab');

            $('ul.tabs li').removeClass('current');
            $('.tab-content').removeClass('current');

            $(this).addClass('current');
            $("#"+tab_id).addClass('current');
        })
    }

    function bind() {
        _tabs();
    }

    function init() {
        bind();
    }

    return {
        init: init
    };

})(document, jQuery);