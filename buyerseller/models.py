from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField(default=0)

    class Meta:
        db_table = 'tbl_item'

class Category(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'tbl_category'

class CategoryMapping(models.Model):
    item = models.ForeignKey(Item, on_delete=None)
    category = models.ForeignKey(Category, on_delete=None)

    class Meta:
        db_table = 'tb_category_mapping'