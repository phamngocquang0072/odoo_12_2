# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'Task 1',
    'version': '0.1',
    'author': 'Quang',
    'website': '',
    'category': 'Test',
    'summary': 'Task 1',
    'description': """""",
    'depends': [
        'project',
    ],
    'data': [

        'views/project_task_view.xml',
        'menu/menu.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
    'qweb': ['static/src/xml/*.xml'],
}
