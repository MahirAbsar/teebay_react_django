from unicodedata import category
from django.db import models
from django.contrib.auth.models import User
import uuid
# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    firstName = models.CharField(max_length=200, blank=True, null=True)
    lastName = models.CharField(max_length=200, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField(max_length=500, blank=True, null=True)
    phoneNumber = models.CharField(max_length=200,null=True,blank=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)
    def __str__(self):
        return self.name
    

class Product(models.Model):

 perHr = 'per hr'
 perDay = 'per day'
 perWeek = 'per week'
 user = models.ForeignKey(User,on_delete=models.SET_NULL,null = True)
 name = models.CharField(max_length=200)
 image = models.ImageField(null=True,blank=True)
 category = models.ForeignKey('Category',on_delete=models.SET_NULL,null=True,blank=True)
 description = models.TextField(null=True,blank=True)
 price = models.DecimalField(max_digits=6,decimal_places=2)
 rentPrice =  models.DecimalField(max_digits=6,decimal_places=2,null=True,blank = True)
 CHOICES = [
  (perHr,'Per Hour'),
  (perDay,'Per Day'),
  (perWeek,'Per Week')
 ]
 rentDuration = models.CharField(max_length=10,choices=CHOICES,null=True,blank=True)
 createdAt = models.DateTimeField(auto_now_add=True)
 id = models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False,unique=True)

 def __str__(self):
     return str(self.name)

class Category(models.Model):
 name = models.CharField(max_length=200)
 
 def __str__(self):
     return self.name
 

