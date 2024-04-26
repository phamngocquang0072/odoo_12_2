odoo.define('module_3.CourseButton', function(require) {
    "use strict";

    var config = require('web.config');
    var core = require('web.core');
    var Widget = require('web.Widget');
    var QWeb = core.qweb;
    var ajax = require('web.ajax');

    var CourseButton = Widget.extend({
        name: 'course_button',
        template:'module_3.CourseButton',
        events: {
            'click .o_course_btn': '_onClickPreview',
        },
        /**
         * @override
         */
        willStart: function () {
            return $.when(this._super.apply(this, arguments), this.call('mail_service', 'isReady'));
        },
        /**
         * @override
         */
        start: function () {
            return this._super.apply(this, arguments);
        },
        _onClickPreview: function (ev) {
            this._rpc({
              model: 'courses.course',
              method: 'open_course'
            })
        },
    });
    return CourseButton;

});