# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-28 19:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('volontulo', '0011_auto_20180114_1908'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='name',
            field=models.CharField(db_index=True, max_length=150),
        ),
    ]
