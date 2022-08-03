from django.urls import path
from base.views import base_products as views

urlpatterns = [
    path('',views.getProducts,name='getProducts'),
    path('<str:pk>/',views.getProduct,name="getProduct"),
    path('userproducts/',views.getUserProducts,name="getUserProducts"),
    path('deleteproduct/<str:pk>/',views.deleteProduct,name="deleteProduct"),
    path('addproduct/',views.addProduct,name = "addProduct"),
    path('search/',views.searchProducts,name="searchProducts"),
    path('updateproduct/<str:pk>/',views.updateProduct,name="updateProduct"),
]
