from django.urls import path
from .views import MyObtainTokenPairView, RegisterView, ChangePasswordView, UpdateUserView, UserView, UserIsAdminView
from rest_framework_simplejwt.views import TokenRefreshView

app_name = 'authentication'

urlpatterns = [
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('change_password/', ChangePasswordView.as_view(), name='auth_change_password'),
    path('profile/update/', UpdateUserView.as_view(), name='auth_update_profile'),
    path('user/', UserView.as_view(), name='user'),
    path('userIsAdmin/', UserIsAdminView.as_view(), name='user'),
]
