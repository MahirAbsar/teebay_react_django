from unicodedata import category
from django.db import models
from django.contrib.auth.models import User
import uuid
# Create your models here.
    

class Product(models.Model):
    perHr = 'per hr'
    perDay = 'per day'
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null = True)
    name = models.CharField(max_length=200)
    image = models.ImageField(null=True,blank=True)
    category = models.ManyToManyField('Category')
    description = models.TextField(null=True,blank=True)
    price = models.DecimalField(max_digits=6,decimal_places=2)
    rentPrice =  models.DecimalField(max_digits=6,decimal_places=2,null=True,blank = True)
    CHOICES = [
    (perHr,'Per Hour'),
    (perDay,'Per Day'),
    ]
    rentDuration = models.CharField(max_length=10,choices=CHOICES,null=True,blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False,unique=True)

    def __str__(self):
        return str(self.name)

class Category(models.Model):
    name = models.CharField(max_length=200,null=True,blank=True,primary_key=False)
    def __str__(self):
        return self.name
 

