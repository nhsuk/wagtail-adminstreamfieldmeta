from wagtail.admin.edit_handlers import StreamFieldPanel
from wagtail.core import blocks
from wagtail.core.fields import StreamField
from wagtail.core.models import Page


CTA_VARIANT = (
    ('link', 'Link'),
    ('button', 'Button'),
)


class RichText(blocks.StructBlock):
    text = blocks.RichTextBlock(required=False)
    meta_id = blocks.CharBlock(required=False, label='ID', classname='wasm-meta-field', help_text='Rich Text Id')

    class Meta:
        form_classname = 'wasm-meta-panel'


class SimpleCtaLink(blocks.StructBlock):
    link_text = blocks.CharBlock(required=False)
    link_external = blocks.CharBlock(label='External link', required=False)
    meta_id = blocks.CharBlock(required=False, label='ID', classname='wasm-meta-field', help_text='CTA Id')
    meta_cta_variant = blocks.ChoiceBlock(
        choices=CTA_VARIANT,
        default='link',
        label='CTA Style',
        classname='wasm-meta-field'
    )

    class Meta:
        icon = 'link'
        label = 'cta'
        form_classname = 'wasm-meta-panel'


class Grid(blocks.StructBlock):
    heading = blocks.CharBlock(required=False)
    body = blocks.StreamBlock([
        ('rich_text', RichText()),
    ], null=True, blank=True)
    meta_id = blocks.CharBlock(required=False, label='ID', classname='wasm-meta-field', help_text='Grid Id')

    class Meta:
        form_classname = 'wasm-meta-panel'


class CustomPage(Page):
    body = StreamField([
        ('cta', SimpleCtaLink()),
        ('grid', Grid()),
    ], null=True, blank=True)

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
    ]