# Generated by Django 5.0.7 on 2024-10-01 23:07

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id_uuid', models.UUIDField(default=uuid.UUID('ae62dc2e-87fb-4461-81a7-3b2f44b850a2'), primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('image', models.ImageField(upload_to='product_images/')),
            ],
        ),
    ]
