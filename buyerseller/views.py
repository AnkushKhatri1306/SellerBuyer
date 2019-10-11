from django.shortcuts import render
from rest_framework import viewsets
from .controllers import HomeController
from django.http import HttpResponse
from rest_framework import status
# Create your views here.

class homeviewset(viewsets.ModelViewSet, HomeController):
    # function to get home page
    def get_home_page(self, request):
        return render(request, 'index.html', {})

    # saving the item data
    def save_item_data(self, request):
        data = self.save_item(request)
        return HttpResponse(data, status=status.HTTP_200_OK)

    # for saving the category
    def save_category_data(self, request):
        data = self.save_category(request)
        return HttpResponse(data, status=status.HTTP_200_OK)

    # for getting the list of categories and items
    def get_list_details(self, request):
        data = self.get_list_data(request)
        return HttpResponse(data, status=status.HTTP_200_OK)

    # getting the list of all filtered item list
    def get_filter_item_list_data(self, request):
        data = self.get_filter_item_list_details(request)
        return HttpResponse(data, status=status.HTTP_200_OK)