from tkinter.tix import Tree
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer
from . import models
from . import products


@api_view(['GET'])
def getProducts(request):
 products = models.Product.objects.all()
 serialzer = ProductSerializer(products,many =True)
 # return JsonResponse(serialzer.data,safe=False)
 return Response(serialzer.data)

@api_view(['GET'])
def getProduct(request,pk):
 product = models.Product.objects.get(id=pk)
 serializer=  ProductSerializer(product,many=False)
 return Response(serializer.data)
