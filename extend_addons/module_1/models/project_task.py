from odoo import api, fields, models, _
from datetime import date, timedelta

class ProjectTask(models.Model):
    _inherit = 'project.task'


    @api.model
    def get_data(self):
        uid = self.env.uid
        today = date.today()
        stage_in_progress = self.env.ref('project.project_stage_1')
        stage_in_done = self.env.ref('project.project_stage_2')
        employee = self.env['hr.employee'].search([('user_id', '=', uid)], limit=1)
        domain = [
            ('create_date', '>=', today.strftime('%Y-%m-01')),
            ('create_date', '<', (today + timedelta(days=1)).strftime('%Y-%m-%d')),
            ('create_uid', '=', uid)
        ]
        my_tasks = self.search(domain)
        undone_tasks = my_tasks.filtered(lambda t: t.date_deadline >= today and t.stage_id != stage_in_done)
        in_progress_tasks = my_tasks.filtered(lambda t: t.date_deadline < today and t.stage_id == stage_in_progress)
        done_tasks = my_tasks.filtered(lambda t: t.stage_id == stage_in_done)
        result = {
            'name': employee.name if employee else '',
            'employee': employee,
            'work_phone': employee.work_phone if employee else '',
            'code': employee.barcode if employee else '',
            'emp_id': employee.id if employee else '',
            'work_email': employee.work_email if employee else '',
            'my_tasks': len(my_tasks),
            'in_progress_tasks': len(in_progress_tasks),
            'undone_tasks': len(undone_tasks),
            'done_tasks': len(done_tasks),
        }
        print(result)
        return result