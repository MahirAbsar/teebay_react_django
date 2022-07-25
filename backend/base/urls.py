from django.urls import path
from . import views

urlpatterns = [
    path('products/',views.getProducts,name='getProducts'),
    path('products/<str:pk>',views.getProduct,name="getProduct")
]
