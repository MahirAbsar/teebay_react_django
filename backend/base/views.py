from statistics import mode
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ProductSerializer, UserSerializer,UserSerializerWithToken,CartItemSerializer
from django.contrib.auth.hashers import make_password
from rest_framework import status
from . import models
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import decimal
from django.db.models import Q
from datetime import datetime

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
  print(request.data)
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
    

    # user.profile.address = data['address']
    # user.profile.phoneNumber = data['phoneNumber']
    # userProf = models.Profile.objects.create(
    #   user = User.objects.get(username=data['email']),
    #   address = data['address'],
    #   phoneNumber = data['phoneNumber'],
    # )
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
    createCat,created = models.Category.objects.get_or_create(name=category)
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


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProduct(request,pk):
  data = request.data
  getProduct = models.Product.objects.get(id=pk)
  if data['name'] !="":
    getProduct.name = data['name']
  if data['price'] != "":
    getProduct.price = decimal.Decimal(data['price'])
  if data['description'] != '':
    getProduct.description = data['description']
  if data['rentPrice']!= "":
    getProduct.rentPrice = decimal.Decimal(data['rentPrice'])
  if data["rentDuration"]  != "":
    getProduct.rentDuration = data['rentDuration']
  if len(data['category'])!=0:
    categoryList = []
    for category in data['category']:
      categoryId = models.Category.objects.get(name=category)
      categoryList.append(categoryId.id) 
      getProduct.category.set(categoryList)
  getProduct.save()
  serialzer = ProductSerializer(getProduct,many = False)
  return Response(serialzer.data)


@api_view(['GET'])
def searchProducts(request):
  name  = request.GET.get('name')
  category = request.GET.get('category')
  buy = request.GET.get('buy')
  rent =request.GET.get('rent')
  for i in category:
    createCat,created = models.Category.objects.get_or_create(name=i)
  lowPrice=  request.GET.get('lowPrice')
  highPrice = request.GET.get('highPrice')
  rentType = request.GET.get('rentType')
  getProductsName = models.Product.objects.filter(name__icontains=name)
  getProductsCat = getProductsName.filter(category__name__in=[category])
  if buy == "false" and rent == "false":
    getProducts = getProductsCat
    serializer = ProductSerializer(getProducts,many=True)
    return Response(serializer.data)
  if buy == "true" and rent=="false":
    getProducts = getProductsCat.distinct().filter((Q(price__gte=lowPrice)&Q(price__lte=highPrice)))
    serializer = ProductSerializer(getProducts,many=True)
    return Response(serializer.data)
  elif buy == "false" and rent=="true":
    getProducts = getProductsCat.distinct().filter((Q(rentPrice__gte=lowPrice)&Q(rentPrice__lte=highPrice))&Q(rentDuration=rentType))
    serializer = ProductSerializer(getProducts,many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addToCart(request):
  data = request.data
  cart = models.Cart.objects.get(user = request.user)
  product = models.Product.objects.get(id=data['id'])
  # print("DATA:::::",data)
  print("PRODUCT:::",product)
  if data['type'] == 'buy':
    obj1,created = models.CartItem.objects.get_or_create(
      cart = models.Cart.objects.get(user = product.user),
      product = product,
      type="Sold"
    )
    print(obj1,created)
    obj2,created = models.CartItem.objects.get_or_create(
    cart = cart,
    product = product,
    type="Purchased",
  )
    print(obj2,created)
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
    print(f'Difference is {delta.days} days')
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
  print("CART::::",cart)
  serializer = CartItemSerializer(cart,many=True)
  return Response(serializer.data)

