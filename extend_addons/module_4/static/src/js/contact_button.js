odoo.define('module_4.TopButton', function(require) {
    "use strict";

    var config = require('web.config');
    var core = require('web.core');
    var SystrayMenu = require('web.SystrayMenu');
    var Widget = require('web.Widget');
    var QWeb = core.qweb;
    var ajax = require('web.ajax');

    var ContactMenu = Widget.extend({
        name: 'contact_menu',
        template:'module_4.ContactsMenu',
        events: {
            'click .o_mail_preview': '_onClickPreview',
            'show.bs.dropdown': '_onShowDropdown',
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
            this._$filterButtons = this.$('.o_filter_button');
            this._$previews = this.$('.o_mail_systray_dropdown_items');
            this._filter = false;
            return this._super.apply(this, arguments);
        },

        get_partner: function(event) {
            var self = this;
            var def1 =  this._rpc({
                  model: 'res.partner',
                  method: 'get_newest_partner'
            })
            console.log(def1)
            return $.when(def1);
        },
        _renderPreviews: function (partners) {
            console.log(partners);
            this._$previews.html(QWeb.render('module_4.ContactsMenu.Previews', {
                partners: partners,
            }));
        },
        _updatePreviews: function () {
            // Display spinner while waiting for conversations preview
            this._$previews.html(QWeb.render('Spinner'));
            this.get_partner()
                .then(this._renderPreviews.bind(this));
        },
        _onShowDropdown: function () {
            this._updatePreviews();
        },
        _onClickPreview: function (ev) {
            var $target = $(ev.currentTarget);
            var previewID = $target.data('preview-id');
            console.log(previewID)
            return this.do_action({
            type: 'ir.actions.act_window',
            res_model: 'res.partner',
            res_id: previewID,
            views: [[false, 'form']],
            target: 'current'
        });
        },
    });
    var activityMenuIndex = _.findIndex(SystrayMenu.Items, function (SystrayMenuItem) {
        return SystrayMenuItem.prototype.name === 'activity_menu';
    });
    if (activityMenuIndex > 0) {
        SystrayMenu.Items.splice(activityMenuIndex, 0, ContactMenu);
    } else {
        SystrayMenu.Items.push(ContactMenu);
    }

    return ContactMenu;

});