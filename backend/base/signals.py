from profile import Profile
from urllib import request
from django.db.models.signals import pre_save,post_save
from django.contrib.auth.models import User
from .models import Profile
from django.contrib.auth.hashers import make_password
from django.dispatch import receiver

@receiver(post_save,sender=User)
def createProfile(sender,instance,created,**kwargs):
  if created:
    Profile.objects.create(user=instance)

@receiver(post_save,sender=User)
def saveProfile(sender,instance,**kwargs):
  instance.profile.save()



# def createUser(sender,instance,created,**kwargs):
#   print("Instance:::::",instance)
  # if created:
  #  print("SIGNAL WILL RUN,,,,")
  #  user = instance
  #  print("USER::::",user)
  #  userUser = User.objects.create(
  #    username=user.email,
  #    first_name=user.firstName+" "+user.lastName,
  #    password=make_password(user.password),
  #    email=user.email,
  #  )
  #  user.user = User.objects.get(username=user.email)
  #  user.save()


# def updateUser(sender,instance,**kwargs):
#   profile = instance
#   user = User.objects.get(username=profile.email)
#   user.username = profile.email
#   user.first_name = profile.firstName+" "+profile.lastName
#   user.email = profile.email
#   if profile.password != "":
#     user.password = make_password(profile.password)
#   user.save()

# post_save.connect(updateUser,sender=Profile)
# post_save.connect(createUser,sender=Profile)
