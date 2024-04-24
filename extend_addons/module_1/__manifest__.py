# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'Test 1',
    'version': '0.1',
    'author': 'Quang',
    'website': '',
    'category': 'Test',
    'summary': 'Test 1',
    'description': """""",
    'depends': [
        'project',
        'board'
    ],
    'data': [
        'security/ir.model.access.csv',

        'views/project_task_view.xml',
        'menu/menu.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
    'qweb': ['static/src/xml/*.xml'],
}
