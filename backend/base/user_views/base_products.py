from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from base.serializers import ProductSerializer
from base import models
import decimal
from django.db.models import Q


@api_view(['GET'])
def getProducts(request):
  products = models.Product.objects.all()
  serialzer = ProductSerializer(products,many =True)
  return Response(serialzer.data)

@api_view(['GET'])
def getProduct(request,pk):
  product = models.Product.objects.get(id=pk)
  serializer=  ProductSerializer(product,many=False)
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProducts(request):
 user = request.user
 userProducts = models.Product.objects.filter(user = user)
 serializer = ProductSerializer(userProducts,many=True)
 return Response(serializer.data)


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



