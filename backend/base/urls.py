from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
urlpatterns = [
    path('products/',views.getProducts,name='getProducts'),
    path('products/<str:pk>/',views.getProduct,name="getProduct"),
    path('users/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('users/info/',views.getUserInfo,name="getUserInfo"),
    path('users/registeruser/',views.registerUser,name='registerUser')
]
