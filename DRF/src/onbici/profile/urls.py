from django.urls import include, path, re_path

from .views import ProfileRetrieveAPIView, ProfileFollowAPIView

app_name = 'onbici.profile'

urlpatterns = [
    
    path('profile/<str:username>/', ProfileRetrieveAPIView.as_view()),
    path('profile/<str:username>/follow/',  ProfileFollowAPIView.as_view()),
]

""" path('profile/{pk}/', ProfileRetrieveAPIView.as_view()),
path('profile/{pk}/follow/',  ProfileFollowAPIView.as_view()), """