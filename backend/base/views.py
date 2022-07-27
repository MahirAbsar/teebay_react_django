
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ProductSerializer,UserSerializer,UserSerializerWithToken
from django.contrib.auth.hashers import make_password
from rest_framework import status
from . import models
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import decimal

@api_view(['GET'])
def getProducts(request):
  products = models.Product.objects.all()
  serialzer = ProductSerializer(products,many =True)
  return Response(serialzer.data)



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
 def validate(self, attrs):
  data = super().validate(attrs)
  refresh = self.get_token(self.user)
  serializer = UserSerializerWithToken(self.user).data
  for i,j in serializer.items():
   data[i] = j
  return data
class MyTokenObtainPairView(TokenObtainPairView):
 serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getProduct(request,pk):
  product = models.Product.objects.get(id=pk)
  serializer=  ProductSerializer(product,many=False)
  return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserInfo(request):
  user = request.user
  serializer = UserSerializer(user,many=False)
  data = request.data
  user.first_name = data['name']
  user.username = data['email']
  user.email = data['email']
  if data['password'] != '':
    user.password = make_password(data['password'])
    
  user.save()
  return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserInfo(request):
 user = request.user
 serializer = UserSerializer(user,many=False)
 return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
 data = request.data
 try:
  user = User.objects.create(
   first_name=data['name'],
   email=data['email'],
   username=data['email'],
   password= make_password(data['password'])
  )
 except:
  message = {'details':"User With Same Email Address Already Exists"}
  return Response(message,status=status.HTTP_400_BAD_REQUEST)
 serialzer = UserSerializerWithToken(user,many=False)
 return Response(serialzer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProducts(request):
  user = request.user
  userProducts = models.Product.objects.filter(user = user)
  serializer = ProductSerializer(userProducts,many=True)
  return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProduct(request,pk):
  data =request.data
  product = models.Product.objects.get(id=pk)
  product.delete()
  return Response('Product Deleted')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addProduct(request):
  data = request.data
  categoryList = []
  for category in data['category']:
    categoryId = models.Category.objects.get(name=category)
    categoryList.append(categoryId.id)
  user =request.user
  product = models.Product.objects.create(
    user = request.user,
    name = data['name'],
    price = decimal.Decimal(data['price']),
    description = data['description'],
    rentPrice = decimal.Decimal(data['rentPrice']),
    rentDuration = data['rentDuration']
  )
  
  product.category.set(categoryList)
  product.save()
  serialzer = ProductSerializer(product,many = False)
  return Response(serialzer.data)


