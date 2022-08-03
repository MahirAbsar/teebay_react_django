from django.urls import path
from base.user_views import base_user as views



urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('info/',views.getUserInfo,name="getUserInfo"),
    path('registeruser/',views.registerUser,name='registerUser'),
    path('updateuser/',views.updateUserInfo,name="updateUser"),
    path('addtocart/',views.addToCart,name="addToCart"),
    path('cart/<str:pk>/',views.getUserCart,name="getUserCart")
]
