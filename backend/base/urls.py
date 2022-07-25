from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('products/',views.getProducts,name='getProducts'),
    path('products/<str:pk>/',views.getProduct,name="getProduct"),

    path('users/info/',views.getUserInfo,name="getUserInfo"),
    path('users/registeruser/',views.registerUser,name='registerUser')
]
