odoo.define('module_1.dashboard_action', function (require){
"use strict";
var AbstractAction = require('web.AbstractAction');
var core = require('web.core');
var QWeb = core.qweb;
var rpc = require('web.rpc');
var ajax = require('web.ajax');
var CustomDashBoard = AbstractAction.extend({
    template: 'CustomDashBoard',
     init: function(parent, context) {
       this._super(parent, context);
       this.dashboards_templates = ['DashboardProject'];
     },
     willStart: function() {
        var self = this;
        return $.when(ajax.loadLibs(this), this._super()).then(function() {
           return self.fetch_data();
        });
     },
     start: function() {
        var self = this;
        this.set("title", 'Dashboard');
        return this._super().then(function() {
           self.render_dashboards();
        });
     },
     render_dashboards: function(){
        var self = this;
        _.each(this.dashboards_templates, function(template) {
           self.$('.o_pj_dashboard').append(QWeb.render(template, {widget: self}));
        });
     },
     fetch_data: function() {
        var self = this;
        var def1 =  this._rpc({
           model: 'project.task',
           method: 'get_data'
        }).then(function(result){
            self.employee = result['employee'],
            self.name = result['name'],
            self.work_phone = result['work_phone'],
            self.code = result['code'],
            self.work_email = result['work_email'],
            self.emp_id = result['emp_id'],
            self.my_tasks = result['my_tasks'],
            self.in_progress_tasks = result['in_progress_tasks'],
            self.undone_tasks = result['undone_tasks'],
            self.done_tasks = result['done_tasks']
        });
        console.log(def1)
        return $.when(def1);
     }
})
core.action_registry.add('custom_dashboard_tags', CustomDashBoard);
return CustomDashBoard;
})