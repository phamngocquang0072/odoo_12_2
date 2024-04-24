from odoo import api, fields, models, _


class HrPpBonus(models.Model):
    _name = 'hr.pp.bonus'
    _inherit = ['access.mixin']
    _description = 'PP Bonus'

    def _get_years(self):
        return [(str(i), i) for i in range(self.env['base'].get_utc7_datetime().year, 2020, -1)]

    employee_id = fields.Many2one('hr.employee', 'Employee')
    employee_code = fields.Char('Employee Code')
    employee_full_name = fields.Char('Employee Full Name')
    employee_type = fields.Selection([
        ('local', 'Local'),
        ('expat_teaching', 'Teacher'),
        ('expat', 'Expat'),
        ('local_teaching', 'VNT'),
        ('local_teaching_assistant', 'Teaching Assistant')
    ], string='Employee Type')

    position_title = fields.Char('Position Title (Current)')
    position_title_en = fields.Char('Position Title (En)')
    department_id = fields.Many2one('hr.department', 'Department')
    department_name = fields.Char('Department Name', related='department_id.name', store=True)
    gender = fields.Selection(related='employee_id.gender', store=True)

    year = fields.Integer('Year')
    effective_from = fields.Date('Letter Date')
    gross_performance_bonus = fields.Monetary('Gross Performance Bonus', otp_auth=True, currency_field='currency_id')

    signature = fields.Char('Signature')
    signer_title_en = fields.Char('Signer Title (En)')
    signer_title = fields.Char('Signer Title')
    username = fields.Char('Username')

    # Technical Fields
    pp_bonus_import_id = fields.Many2one(
        'hr.pp.bonus.import', 'Batch Import PP Bonus')
    company_id = fields.Many2one('res.company', related="employee_id.company_id", store=True)
    currency_id = fields.Many2one(string="Currency", related='company_id.currency_id', store=True)

    contract_id = fields.Many2one('hr.contract')

    def view_report_pp_bonus(self, year):
        current_employee = self.env.user.employee_id
        pp_bonus = self.env['hr.pp.bonus'].search_read([
            ('year', '=', int(year)),
            ('employee_id', '=', current_employee.id),
        ], order="create_date desc", limit=1)
        if pp_bonus:
            data = {key: item and item or '' for key, item in pp_bonus[0].items()}
            return data
        return {}
