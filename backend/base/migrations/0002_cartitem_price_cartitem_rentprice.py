# Generated by Django 4.0.6 on 2022-08-04 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartitem',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
        migrations.AddField(
            model_name='cartitem',
            name='rentPrice',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
    ]