from pyexpat import model
from statistics import mode
from unicodedata import category
from django.db import models
from django.contrib.auth.models import User
import uuid
# Create your models here.
    

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,null=True,blank=True)
    address = models.CharField(max_length=2000,null=True,blank=True)
    phoneNumber = models.CharField(max_length=30,null=True,blank=True)
    def __str__(self):
        return str(self.user)
    

class Product(models.Model):
    perHr = 'per hr'
    perDay = 'per day'
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null = True)
    name = models.CharField(max_length=200)
    category = models.ManyToManyField('Category')
    description = models.TextField(null=True,blank=True)
    price = models.DecimalField(max_digits=6,decimal_places=2,default=0)
    rentPrice =  models.DecimalField(max_digits=6,decimal_places=2,default = 0)
    CHOICES = [
    (perHr,'Per Hour'),
    (perDay,'Per Day'),
    ]
    rentDuration = models.CharField(max_length=10,choices=CHOICES,default=perHr)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False,unique=True)

    def __str__(self):
        return str(self.name)

class Category(models.Model):
    name = models.CharField(max_length=200,null=True,blank=True)
    def __str__(self):
        return self.name
 

    def __str__(self):
        return str(self.name)


class Cart(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False,unique=True)

    def __str__(self):
        return str(self.createdAt)+" "+str(self.user.first_name)
    
class CartItem(models.Model):
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE,null=True,blank=True)
    product = models.ForeignKey(Product,on_delete=models.CASCADE,null=True,blank=True)
    type = models.CharField(max_length=100,null=True,blank=True)
    rentStart = models.DateField(blank=True,null=True)
    rentEnd = models.DateField(blank=True,null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False,unique=True)
    
    class Meta:
        ordering = ['rentStart','-rentEnd']

    def __str__(self):
        return str(self.cart.user.username) +" "+ str(self.createdAt)

