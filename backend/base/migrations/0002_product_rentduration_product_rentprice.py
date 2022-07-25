# Generated by Django 4.0.6 on 2022-07-25 06:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='rentDuration',
            field=models.CharField(choices=[('per hr', 'Per Hour'), ('per day', 'Per Day'), ('per week', 'Per Week')], default='per hr', max_length=10),
        ),
        migrations.AddField(
            model_name='product',
            name='rentPrice',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True),
        ),
    ]