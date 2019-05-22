"""
.. module:: wagtailadminstreamfieldmeta.wagtail_hooks
"""

from django.contrib.staticfiles.templatetags.staticfiles import static
from django.utils.html import format_html

from wagtail.core import hooks


@hooks.register('insert_editor_css')
def editor_css():
    """ editor_css """
    return format_html(
        '<link rel="stylesheet" href="{}">',
        static('wasm-admin-interface/css/wasm-admin-interface.css')
    )


@hooks.register('insert_editor_js')
def editor_js():
    """ editor_js """
    return format_html(
        '<script src="{}"></script>',
        static('wasm-admin-interface/js/wasm-admin-interface.js')
    )
