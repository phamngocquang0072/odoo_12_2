from lxml import etree

from odoo import api, models, fields
from odoo.tools.translate import _


class Partner(models.Model):
    _inherit = 'res.partner'

    @api.model
    def get_newest_partner(self):
        partners = self.search([], limit=10, order="id DESC")
        data = [{
            'imageSRC': '/web/image/res.partner/{}/image_small'.format(rec.id),
            'name': rec.name,
            'phone': rec.phone,
            'res_id': rec.id
        } for rec in partners]
        print(data)
        return data