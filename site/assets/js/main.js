'use strict';

//  SigningIn actions
var commonActions = (function (document, $) {
    var $doc = $(document);

    var selector = {
        form: {
            element: '.js-form-validate',
            changeManager: '#form-reason-to-change-manager'
        },
        modal: {
            changeManager: '#modal-change-personal-manager',
            newManager: '#modal-new-personal-manager'
        },

        chat: {
            startManagerChat: '.js-start-manager-chat',
            managerArea: '#chat-manager-area',
            messagesThread: '#chat-thread',
            textarea: '#chat-textarea'
        },
        slidingMenuItem: '.sliding-menu__item',
        slidingMenuTitle: '.js-sliding-menu-title',
        nextElToggler: '.js-toggle-next-el',
        parentElToggler: {
            'parent' : '.js-toggle-parent-el',
            'button' : '.js-toggle-parent-el-button',
            'body' : '.js-toggle-parent-el-body'
        },
        parentElTab: {
            'parent' : '.js-tab-parent-el',
            'button' : '.js-tab-parent-el-button',
            'body' : '.js-tab-parent-el-body'
        },
        openModal: '.js-open-modal',
        closeModal: '.js-close-modal',
        datepickerIcon: 'data-range-input__icon',
        datepickerValue: 'data-range-input__value'
    };

    var className = {
        active:   'is-active',
        visible:  'is-visible',
        hover:    'is-hover'
    };

    var $form = $(selector.form.element);

    $.each($form, function(){
        var $form = $(this);

        $form.parsley()
            .on('form:error', _focusOnFirstFieldError)
            .on('form:submit', _onFormSubmit);
    });

    if($(selector.form.changeManager).length) {
        $(selector.form.changeManager).parsley().on('form:submit', function(){
            $(selector.modal.changeManager).modal('hide');

            setTimeout(function(){
                $(selector.modal.newManager).modal('show');
            }, 200);

            return false;
        });
    }

    function _activateDatepicker() {
        $('input[name="daterange"]').daterangepicker({
            timePicker: true,
            locale: {
                format: 'DD-MM-YYYY'
            },
            startDate: '2013-01-01',
            endDate: '2013-12-31'
        });
    }

    function _startManagerChat() {
        $(selector.chat.startManagerChat).on('click', function(){
            $(selector.modal.newManager).modal('hide');

            $('html, body').animate({
                scrollTop: $(selector.chat.managerArea).offset().top
            }, 250);
        });

        $(selector.chat.messagesThread).animate({
           scrollTop: $(selector.chat.messagesThread)[0].scrollHeight
        }, 0);

        $(selector.chat.textarea).focus();
    }

    function _onFormSubmit(e) {
        if(e.validationResult = false) {
            return false;
        }
    }

    function _focusOnFirstFieldError() {
        var $form = this.$element;
        var $firstInvalidField = $form.find('.parsley-error:first');
        var errors = $firstInvalidField.parsley().getErrorsMessages().join(';');
    }

    function _bindModals() {
        $(selector.openModal).on('click', function(){
            var $targetId = $(this).attr('data-target-id');
            var $modalSelector = '#' + $targetId;
            var $modalEl = $($modalSelector);

            $modalEl.on('shown.bs.modal', function () {
                var $modalFormInputs = $modalEl.find('.form-control');

                if($modalFormInputs.length) {
                    $modalFormInputs[0].focus();
                }
            });

            if($modalEl.length) {
                $modalEl.modal('show');
            }

        });
    }

    function _toggleNextEl() {
        $(selector.nextElToggler).on('click', function(){
            $(this).toggleClass(className.active);
            $(this).next().toggleClass(className.visible);
        });
    }

    function _toggleParentEl() {
        $(selector.parentElToggler.button).on('click', function(){
            var button = $(this),
                parent = button.parents(selector.parentElToggler.parent),
                body = parent.find(selector.parentElToggler.body);
            button.toggleClass(className.active);
            body.toggleClass(className.visible);
        });
    }


    function _tabParentEl() {
        $(selector.parentElTab.button).on('click', function(){
            var button = $(this),
                parent = button.parents(selector.parentElTab.parent),
                body = parent.find(selector.parentElTab.body),
                buttons = parent.find(selector.parentElTab.button),
                href = button.data('href'),
                target = body.data('target'),
                bodies = parent.find(selector.parentElTab.body + '[data-target='+href+']');
            buttons.removeClass(className.active);
            button.addClass(className.active);
            body.removeClass(className.visible);
            bodies.addClass(className.visible);
            return false;
        });
    }

    function _addHoverState() {
        $('.nav-figure').on('mouseover', function(){
            $(this).addClass(className.hover);
        }).on('mouseout', function(){
            $(this).removeClass(className.hover);
        });
    }

    function _tabs() {
        $('.tabs__nav-item').on("click", function(e) {
            e.preventDefault();

            $('.tabs__nav-item').removeClass(className.active);
            $('.tab-container').removeClass(className.visible);
            $(this).addClass(className.active);
            $($(this).attr('href')).addClass(className.visible);
        });
    }

    function _slidingMenu() {
        $(selector.slidingMenuTitle).on('click', function(){
            var $activeTitleSelector = selector.slidingMenuItem + '.' +className.active;
            var $slidingMenuSection = $(this).parent();
            var $activeItems = $($activeTitleSelector);

            if($slidingMenuSection.hasClass(className.active)) {
                $slidingMenuSection.removeClass(className.active);
            }
            else {
                $slidingMenuSection.addClass(className.active);
                $activeItems.removeClass(className.active)
            }
        });
    }

    function _onDocumentClick() {

    }

    function _formControlHacks() {
        var $parentEl = $('.form-controls-group__item');
        var $formControl = $('.form-control');
        var $currentEl;

        $parentEl.on('mouseover', function(){
           $(this).addClass(className.hover);
           $currentEl = $(this);
        }).on('mouseout', function(){
            $currentEl.removeClass(className.hover);
        });

        $formControl.on('focus', function(){
            $(this).parent().addClass(className.active);
        }).on('blur', function() {
            $(this).parent().removeClass(className.active);
        }).on('keydown', function(){
            $(this).removeClass('parsley-error');
        });
    }

    function bind() {
        //_activateDatepicker();

        _formControlHacks();

        _bindModals();

        if($(selector.chat.managerArea).length) {
            _startManagerChat();
        }

        _toggleNextEl();

        _toggleParentEl();

        _addHoverState();

        _tabParentEl();

        _tabs();

        _slidingMenu();

        if($('input[data-validate-strength]').length) {
            $('input[data-validate-strength]').passwordStrength();
        }

    }

    function init() {
        bind();
    }

    return {
        init: init
    };

})(document, jQuery);