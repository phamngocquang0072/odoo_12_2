odoo.define("ila_hr_payroll_pp_bonus.ila_pp_bonus", function (require) {
  "use strict";
  const AbstractAction = require("web.AbstractAction");
  const { action_registry, qweb } = require("web.core");
  var field_utils = require("web.field_utils");
  var utils = require("web.utils");
  var round_di = utils.round_decimals;
  var QWeb = qweb;
  var framework = require("web.framework");
  var session = require('web.session');

  const PP_BonusWidget = AbstractAction.extend({
    template: "ila_hr_payroll_pp_bonus.PP_Bonus_Template",
    events: {
      "click .btn-view-content": "_onClickViewReport",
      "click .btn-print-content": "_onClickPrintReport",
    },
    format_float: function (amount, decimals = 0) {
      if (typeof amount === "number") {
        amount = round_di(amount, decimals).toFixed(decimals);
        amount = field_utils.format.float(round_di(amount, decimals), {
          digits: [69, decimals],
        });
      }
      return amount;
    },
    format_date: function (date, format) {
      return date ? moment(date).format(format) : '';
    },
    with_dict: function (gender) {
      return gender == 'male' ? 'Mr' : 'Ms'
    },
    _onClickViewReport() {
      var container = $(".ila-container-view");
      container.html(`
      <svg class="animate__animated animate__jackInTheBox pl text-center w-100" width="240" height="240" viewBox="0 0 240 240">
        <circle class="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 660" stroke-dashoffset="-330" stroke-linecap="round"></circle>
        <circle class="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 220" stroke-dashoffset="-110" stroke-linecap="round"></circle>
        <circle class="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
        <circle class="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
      </svg>
      `);
      this.field_year = $("#ila_year").val();
      var self = this;
      this._rpc({
        model: "hr.pp.bonus",
        method: "view_report_pp_bonus",
        args: [this.env, this.field_year],
      }).then(function (data) {
        if (Object.keys(data).length) {
          data["format_float"] = self.format_float;
          data["format_date"] = self.format_date;
          data["with_dict"] = self.with_dict;
          data['signer_title'] = data['signer_title'] ? data['signer_title'] + '/ ' : '';
          data['signer_title_en'] = data['signer_title_en'] ? data['signer_title_en'] : '';
          self.html = $(QWeb.render("ila_hr_payroll_pp_bonus.PP_Letter", data));
          container.html(self.html);
          self.pp_bonus_id = data['id'] ? data['id'] : '';
          self.print_by_company = data['company_id'][1] == 'ILAV' ? 'print_ila_pp_bonus' : 'print_ilo_pp_bonus';
          $(".btn-print-content").prop("disabled", false);
        } else {
          container.html(`<div class="animate__animated animate__jackInTheBox w-75 text-center mx-auto"><img src="/ila_base/static/src/img/no-data-icon.png" class="img-fluid w-25" /><h2>No data.....</h2></div>`);
        }
      });
    },
    _onClickPrintReport() {
      var self = this;
      framework.blockUI();
      new Promise(function (resolve, reject) {
        var blocked = !session.get_file({
          url: '/report/download',
          data: {
            data: JSON.stringify(['/report/pdf/' + self.print_by_company + '/' + self.pp_bonus_id, 'qweb-pdf']),
            context: JSON.stringify(session.user_context),
          },
          success: resolve,
          error: (error) => {
            self.call('crash_manager', 'rpc_error', error);
            reject();
          },
          complete: framework.unblockUI,
        });
        if (blocked) {
          // AAB: this check should be done in get_file service directly,
          // should not be the concern of the caller (and that way, get_file
          // could return a promise)
          var message = _t('A popup window with your report was blocked. You ' +
            'may need to change your browser settings to allow ' +
            'popup windows for this page.');
          self.do_warn(_t('Warning'), message, true);
        }
      });
    },
  });

  // form name tag xml ref to PP_BonusWidget static js
  action_registry.add("pp_bonus", PP_BonusWidget);

  return PP_BonusWidget;
});
