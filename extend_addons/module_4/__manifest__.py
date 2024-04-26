# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'Task 4',
    'version': '0.1',
    'author': 'Quang',
    'website': '',
    'category': 'Test',
    'summary': 'Task 4',
    'description': """""",
    'depends': [
        'contacts'
    ],
    'data': [

        'views/assets.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
    'qweb': ['static/src/xml/*.xml'],
}
