from math import prod
from unicodedata import category
from rest_framework import serializers
from . import models
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
  name = serializers.SerializerMethodField(read_only=True)
  address = serializers.SerializerMethodField(read_only=True)
  phoneNumber = serializers.SerializerMethodField(read_only=True)
  class Meta:
    model = User
    fields = ['id','first_name','last_name','name','address','phoneNumber','username','email','name']
  
  def get_name(self,obj):
   return (obj.first_name+' '+obj.last_name)
  def get_address(self,obj):
   return obj.profile.address
  def get_phoneNumber(self,obj):
   return obj.profile.phoneNumber



class ProductSerializer(serializers.ModelSerializer):

  
  category = serializers.StringRelatedField(many=True,read_only=True)
  # user = serializers.CharField(source="user.username")
  class Meta:
    model = models.Product
    fields = "__all__"
    
class UserSerializerWithToken(UserSerializer):
 token = serializers.SerializerMethodField(read_only=True)
 name = serializers.SerializerMethodField(read_only=True)
 address = serializers.SerializerMethodField(read_only=True)
 phoneNumber = serializers.SerializerMethodField(read_only=True)
 class Meta:
  model = User
  fields = ['id','first_name','last_name','name','address','phoneNumber','username','email','token']

 def get_token(self,obj):
   token = RefreshToken.for_user(obj)
   return str(token.access_token)
 

class CartItemSerializer(serializers.ModelSerializer):
  product = serializers.StringRelatedField(many=False,read_only=True)
  user = serializers.StringRelatedField(many=False,read_only=True)
  class Meta:
    model = models.CartItem
    fields = "__all__"
  

