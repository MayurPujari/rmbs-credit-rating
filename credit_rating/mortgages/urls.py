from django.urls import path
from .views import MortgageListCreate

urlpatterns = [
    path('mortgages/', MortgageListCreate.as_view(), name='mortgage-list-create'),
]
