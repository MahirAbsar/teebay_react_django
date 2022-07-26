from django.urls import path
from . import views as views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
urlpatterns = [
    path('products/',views.getProducts,name='getProducts'),
    path('products/<str:pk>/',views.getProduct,name="getProduct"),
    path('userproducts/',views.getUserProducts,name="getUserProducts"),
    path('deleteproduct/<str:pk>/',views.deleteProduct,name="deleteProduct"),
    path('addproduct/',views.addProduct,name = "addProduct"),
    path('search/',views.searchProducts,name="searchProducts"),
    path('updateproduct/<str:pk>/',views.updateProduct,name="updateProduct"),
]
