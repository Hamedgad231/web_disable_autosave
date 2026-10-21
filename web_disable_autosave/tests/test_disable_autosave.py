from odoo.tests import HttpCase, tagged


@tagged('post_install', '-at_install')
class TestDisableAutosave(HttpCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.partners = cls.env['res.partner'].create([{'name': 'Autosave One'}, {'name': 'Autosave Two'}])
        cls.partner_action = cls.env['ir.actions.act_window'].create({
            'name': 'Autosave Partners',
            'res_model': 'res.partner',
            'view_mode': 'list,form',
            'domain': [('id', 'in', cls.partners.ids)],
        })

    def test_form_only_saves_on_save_button(self):
        self.start_tour(f"/odoo/action-{self.partner_action.id}", 'web_disable_autosave_form', login='admin')
        self.assertEqual(self.partners.mapped('name'), ['Autosave One', 'Changed Two'])

    def test_list_leaving_edited_row_discards(self):
        tag = self.env['res.partner.category'].create({'name': 'Autosave Tag'})
        tag_action = self.env['ir.actions.act_window'].create({
            'name': 'Autosave Tags',
            'res_model': 'res.partner.category',
            'view_mode': 'list',
            'domain': [('id', '=', tag.id)],
        })
        self.start_tour(f"/odoo/action-{self.partner_action.id}/action-{tag_action.id}",
                        'web_disable_autosave_list', login='admin')
        self.assertEqual(tag.name, 'Autosave Tag')
