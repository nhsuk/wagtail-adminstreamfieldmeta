"""
.. module:: tests
"""

from django.contrib.auth.models import User
from django.test import Client, TestCase

# from wagtail.core.blocks.stream_block import StreamValue
# from wagtail.core.blocks.struct_block import StructValue
# from wagtail.tests.utils import WagtailPageTests


class AdminStreamFieldMetaClassTests(TestCase):
    """ AdminStreamFieldMetaClassTests """

    def setUp(self):
        """ setUp """
        self.admin_user = User.objects.create_superuser('admin', None, 'password')
        self.client = Client()

    def test_js_css_loaded(self):
        """ test_js_css_loaded """

        self.client.force_login(self.admin_user)

        # check for create page
        response = self.client.get('/admin/pages/add/dummy_page/custompage/1/')

        self.assertContains(
            response,
            '''<link rel="stylesheet" href="/static/wasm-admin-interface/css/wasm-admin-interface.css">''',
            count=1,
            status_code=200,
            html=True,
        )

        self.assertContains(
            response,
            '''<script src="/static/wasm-admin-interface/js/wasm-admin-interface.js"></script>''',
            count=1,
            status_code=200,
            html=True,
        )

        # check for update page
        response = self.client.get('/admin/pages/2/edit/')

        self.assertContains(
            response,
            '''<link rel="stylesheet" href="/static/wasm-admin-interface/css/wasm-admin-interface.css">''',
            count=1,
            status_code=200,
            html=True,
        )

        self.assertContains(
            response,
            '''<script src="/static/wasm-admin-interface/js/wasm-admin-interface.js"></script>''',
            count=1,
            status_code=200,
            html=True,
        )
