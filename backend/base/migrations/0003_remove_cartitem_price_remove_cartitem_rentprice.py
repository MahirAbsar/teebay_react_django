# Generated by Django 4.0.6 on 2022-08-04 17:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_cartitem_price_cartitem_rentprice'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartitem',
            name='price',
        ),
        migrations.RemoveField(
            model_name='cartitem',
            name='rentPrice',
        ),
    ]
