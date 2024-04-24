from odoo import fields, models, api


class ResUsers(models.Model):
    _inherit = 'res.users'

    def _get_restricted_menus(self):
        restricted_menu = super(ResUsers, self)._get_restricted_menus()
        if self._is_system():
            return restricted_menu

        pp_bonus_period = self.env['hr.salary.review.period'].search([
            ('company_id', '=', self.env.company.id),
            ('use_for', '=', 'pp_bonus'),
        ])
        pp_bonus = self.env['hr.pp.bonus'].search([('employee_id', '=', self.env.user.employee_id.id)], limit=1)
        if not pp_bonus_period \
                or not (pp_bonus_period.date_start <= fields.Date.today() <= pp_bonus_period.date_end) \
                or not pp_bonus:
            restricted_menu.append('ila_hr_payroll_pp_bonus.pp_bonus_menu_personal')
        return restricted_menu
