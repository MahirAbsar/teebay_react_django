# Generated by Django 4.0.6 on 2022-08-03 15:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0003_remove_profile_email_remove_profile_firstname_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='product',
        ),
        migrations.RemoveField(
            model_name='cart',
            name='rentEnd',
        ),
        migrations.RemoveField(
            model_name='cart',
            name='rentStart',
        ),
        migrations.RemoveField(
            model_name='cart',
            name='type',
        ),
        migrations.CreateModel(
            name='CartItems',
            fields=[
                ('type', models.CharField(blank=True, max_length=100, null=True)),
                ('rentStart', models.DateField(blank=True, null=True)),
                ('rentEnd', models.DateField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.product')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
