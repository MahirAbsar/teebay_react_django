from unicodedata import category
from rest_framework import serializers
from . import models
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
 name = serializers.SerializerMethodField(read_only=True)
 class Meta:
  model = User
  fields = ['id','username','email','name']
 
 def get_name(self,obj):
  name = obj.first_name
  if name == '':
   name = obj.email
  return name


class ProductSerializer(serializers.ModelSerializer):
  
  category = serializers.StringRelatedField(many=True,read_only=True)
  # user = serializers.CharField(source="user.username")
  class Meta:
    model = models.Product
    fields = "__all__"
    
class UserSerializerWithToken(UserSerializer):
 token = serializers.SerializerMethodField(read_only=True)
 class Meta:
  model = User
  fields = ['id','username','email','name','token']

 def get_token(self,obj):
  token = RefreshToken.for_user(obj)
  return str(token.access_token)
  

