# Generated by Django 4.0.6 on 2022-07-25 06:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_product_rentduration_product_rentprice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='rentDuration',
            field=models.CharField(blank=True, choices=[('per hr', 'Per Hour'), ('per day', 'Per Day'), ('per week', 'Per Week')], max_length=10, null=True),
        ),
    ]