# Generated by Django 4.0.6 on 2022-08-03 08:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='passWord',
            new_name='password',
        ),
    ]
