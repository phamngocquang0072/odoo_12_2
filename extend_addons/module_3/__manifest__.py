# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'Task 3',
    'version': '0.1',
    'author': 'Quang',
    'website': '',
    'category': 'Test',
    'summary': 'Task 3',
    'description': """""",
    'depends': [
        'contacts',
    ],
    'data': [
        'security/ir.model.access.csv',

        'views/course_view.xml',
        'views/assets.xml',
        'menu/menu.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
    'qweb': ['static/src/xml/*.xml'],
}
