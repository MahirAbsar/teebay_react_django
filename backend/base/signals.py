from profile import Profile
from django.db.models.signals import pre_save,post_save
from django.contrib.auth.models import User
from .models import Profile

# def createUser(sender,instance,created,**kwargs):
#   if created:
#     user = instance
#     User.objects.create(
#       username=user.email,
#       first_name=user.firstName+" "+user.lastName,
#       password=user.passWord,
#       email=user.email,
#     )


# def updateUser(sender,instance,**kwargs):
#   user = instance
#   getUser = User.objects.get(username=user.email)
#   if user.firstName!="":
#     getUser.first_name=user.firstName
#   if user.lastName!="":
#     getUser.last_name = user.lastName
#   if user.email!="":
#     getUser.email = user.email
#   if user.passWord!="":
#     getUser.password = user.passWord

# pre_save.connect(updateUser,sender=Profile)
# post_save.connect(createUser,sender=Profile)
