from django.conf.urls import url
from . import views
home = views.homeviewset()
# urls for each things
urlpatterns = [
    url(r'home/', home.get_home_page),
    url(r'item/save', home.save_item_data),
    url(r'category/save', home.save_category_data),
    url(r'category/list', home.get_filter_item_list_data),
    url(r'data/list', home.get_list_details),
]