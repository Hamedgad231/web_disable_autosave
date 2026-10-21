# -*- coding: utf-8 -*-
{
    'name': "Disable Auto Save",
    'summary': 'Stop the automatic save of Odoo: records are only saved when the user clicks Save',
    'description': """
        Disable the automatic save of the web client:
        - leaving the record (breadcrumb, menu, back button, links): ask to discard the changes or stay
        - reloading or closing the browser tab: the browser asks before leaving, nothing is saved
        - switching to another browser tab: nothing is saved
        - record pager (next / previous) and New button: ask to discard the changes or stay
        - editable lists: leaving the page with an edited row asks to discard it or stay
    """,
    'author': "Hamid A Mohamed",
    'maintainer': "Hamid A Mohamed",
    'category': 'Productivity',
    'version': '20.0.1.0.0',
    'license': 'LGPL-3',
    'depends': ['web'],
    'assets': {
        'web.assets_backend': [
            'web_disable_autosave/static/src/**/*',
        ],
        'web.assets_tests': [
            'web_disable_autosave/static/tests/tours/**/*',
        ],
    },
    'images': ['static/description/banner.png'],
    'price': 0,
    'currency': 'USD',
    'installable': True,
    'auto_install': False,
    'application': False,
}
