from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
urlpatterns = [
    path('products/',views.getProducts,name='getProducts'),
    path('products/<str:pk>/',views.getProduct,name="getProduct"),
    path('userproducts/',views.getUserProducts,name="getUserProducts"),
    path('deleteproduct/<str:pk>',views.deleteProduct,name="deleteProduct"),
    path('addproduct/',views.addProduct,name = "addProduct"),
    path('search/',views.searchProducts,name="searchProducts"),
    path('updateproduct/<str:pk>/',views.updateProduct,name="updateProduct"),
    path('users/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/info/',views.getUserInfo,name="getUserInfo"),
    path('users/registeruser/',views.registerUser,name='registerUser'),
    path('users/updateuser/',views.updateUserInfo,name="updateUser"),
    

    path('users/addtocart/',views.addToCart,name="addToCart"),
    path('users/cart/<str:pk>/',views.getUserCart,name="getUserCart")
]
