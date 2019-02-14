Wagtail - Admin StreamField Meta
================================

Wagtail Cms customization to add meta field for streamfield.

Quick start
-----------

Add "wagtailadminstreamfieldmeta" to your INSTALLED_APPS setting like this:

```python
INSTALLED_APPS = [
    'wagtailadminstreamfieldmeta',
    ...
]
```

How to use
----------

### StructBlock in StreamField
 * Add ```form_classname = 'wasm-meta-panel'``` to the StructBlock in the ```class Meta```
 * Add ```classname='wasm-meta-field'``` to your meta block field

Example:
```python
class SimpleCtaLink(blocks.StructBlock):
    link_text = blocks.CharBlock(required=False)
    meta_id = blocks.CharBlock(required=False, label='ID', classname='wasm-meta-field', help_text='CTA Id')
    class Meta:
        icon = 'link'
        label = 'cta'
        form_classname = 'wasm-meta-panel'

class CustomPage(Page):
    body = StreamField([
        ('cta', SimpleCtaLink()),
    ], null=True, blank=True)

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
    ]
```

How to contribute
-----------------

### Requirements
* Docker
* docker-compose
You'll get all this lot installed nicely with (https://docs.docker.com/docker-for-mac/install).


### Setup locally
Build the image
```
docker-compose build
```
Run the containers
```
docker-compose up
```
Create super user:
```
docker-compose run --rm web python manage.py createsuperuser
```