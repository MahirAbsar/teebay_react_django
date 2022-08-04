from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from base.serializers import  UserSerializer,UserSerializerWithToken,CartItemSerializer
from django.contrib.auth.hashers import make_password
from rest_framework import status
from base import models
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from datetime import datetime

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


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserInfo(request):
  user = request.user
  getProfile = models.Profile.objects.get(user=user)
  data = request.data
  user.first_name = data['firstName']
  user.last_name  = data['lastName']
  user.username = data['email']
  user.email = data['email']
  if data['password'] != '':
    user.password = make_password(data['password'])
  user.save()
  getProfile.address = data['address']
  getProfile.phoneNumber = data['phoneNumber']
  getProfile.save()
  serializer = UserSerializer(user,many=False)
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
    first_name=data['firstName'],
    last_name=data['lastName'],
    email=data['email'],
    username=data['email'],
    password= make_password(data['password'])
    )
    user.profile.address = data['address']
    user.profile.phoneNumber = data['phoneNumber']
    user.save()
    models.Cart.objects.create(user = User.objects.get(username=data['email']))
  except:
    message = {'details':"User With Same Email Address Already Exists"}
    return Response(message,status=status.HTTP_400_BAD_REQUEST)
  serialzer = UserSerializerWithToken(user,many=False)
  return Response(serialzer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addToCart(request):
  data = request.data
  cart = models.Cart.objects.get(user = request.user)
  product = models.Product.objects.get(id=data['id'])
  if data['type'] == 'buy':
    obj1,created = models.CartItem.objects.get_or_create(
      cart = models.Cart.objects.get(user = product.user),
      product = product,
      type="Sold"
    )
    obj2,created = models.CartItem.objects.get_or_create(
    cart = cart,
    product = product,
    type="Purchased",
  )
    return Response("Product Added to the cart") if created else Response("Prodcut Already Added")
      
  if data['type'] == 'rent':
    obj1,created = models.CartItem.objects.get_or_create(
      cart = models.Cart.objects.get(user = product.user),
      product = product,
      type="Lented",
      rentStart=data['rentStart'],
      rentEnd = data['rentEnd']
    )
    d1 = datetime.strptime(data['rentStart'],"%Y-%m-%d")
    d2 = datetime.strptime(data['rentEnd'],"%Y-%m-%d")
    delta = d2 - d1
    obj3,created = models.CartItem.objects.get_or_create(
    cart = cart,
    product = product,
    type="Rented",
    rentStart= data['rentStart'],
    rentEnd= data['rentEnd']
  )
    return Response("Product Added to the cart") if created else Response("Prodcut Already Added")
      
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserCart(request,pk):
  cart = models.CartItem.objects.filter(cart=models.Cart.objects.get(user=request.user))
  serializer = CartItemSerializer(cart,many=True)
  return Response(serializer.data)