from odoo import api, fields, models, _
from odoo.exceptions import UserError

class Course(models.Model):
    _name = 'courses.course'

    name = fields.Char("Course Name")
    description = fields.Text("Course Description")
    teacher_id = fields.Many2one("res.users", "Teacher")
    date_start = fields.Datetime("Start Date")
    date_end = fields.Datetime("End Date")
    level = fields.Selection([('basic', 'Basic'), ('advanced', 'Advanced')])
    thumbnail = fields.Binary('Thumbnail', attachment=True)

    @api.model
    def create(self, vals):
        if vals.get('date_start') and vals.get('date_end'):
            courses = self.filtered(lambda c: c.date_start == vals.get('date_start')\
                                              and c.date_end == vals.get('date_end'))
            if courses:
                raise UserError("Can't create this course, bc the system have course with the same date!!")
        res = super(Course, self).create(vals)
        return res

    @api.model
    def open_course(self):
        return {
            'name': _('Courses'),
            'domain': [('teacher_id', '=', self.env.uid)],
            'view_type': 'form',
            'res_model': 'courses.course',
            'view_id': False,
            'type': 'ir.actions.act_window',
            'target': 'new'
        }




