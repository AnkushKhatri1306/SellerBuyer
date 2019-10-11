import json
from .models import *

class HomeController():
    def save_item(self, request):
        """
        function for saving the item to db in this first converting the post data in normal data using json.loads
        :param request: request data
        :return: returning success or eror message
        """
        data = []
        try:
            data = json.loads(request.body)
            obj = Item()
            obj.name = data.get('name')
            obj.price = data.get('price')
            obj.save()
            if data.get('categories'):
                self.save_category_mapping_data(request, obj.id, data.get('categories'))
            data = {'status': 'Success'}
        except Exception as e:
            print(e)
        return json.dumps(data)

    def save_category(self, request):
        """
        function for saving the category
        :param request: request data
        :return: retruning success or error message
        """
        data = []
        try:
            data = json.loads(request.body)
            obj = Category()
            obj.name = data.get('name')
            obj.save()
            data = {'status': 'Success'}
        except Exception as e:
            print(e)
        return json.dumps(data)

    def save_category_mapping_data(self, request, item_id, category_list):
        """
        function for saving the mapping of category and item in one mapping table
        :param request: request data
        :param item_id: item id for which categories going to be saved
        :param category_list: list of all categories ids confgured in UI
        :return: nothing
        """
        try:
            save_list = []
            for category in category_list:
                obj = CategoryMapping()
                obj.item_id = item_id
                obj.category_id = category
                save_list.append(obj)
            if save_list:
                CategoryMapping.objects.bulk_create(save_list)
        except Exception as e:
            print(e)

    def get_list_data(self, request):
        """
        getting the list of all categories and item present in db with proper details
        :param request: request data
        :return: list data with both the lists
        """
        response_data = {}
        try:
            response_data['category_list'] = list(Category.objects.filter().values('id', 'name'))
            response_data['item_list'] = self.get_item_list_data(request)
        except Exception as e:
            print(e)
        return json.dumps(response_data)

    def get_item_list_data(self, request):
        """
        gettingthe list of all items with configured data getting from ampping table to identify whcih item is mapped
        with which categories
        :param request: request data
        :return:  list of items with categories related to it
        """
        data = []
        try:
            if request.GET.get('data'):
                ids = json.loads(request.GET.get('data'))
                objs = CategoryMapping.objects.filter(category_id__in=ids)
            else:
                objs = list(CategoryMapping.objects.all())
            if objs:
                temp = {}
                for obj in objs:
                    if temp.get(obj.item.name):
                        temp.get(obj.item.name)['category'] += ', ' + obj.category.name
                    else:
                        temp[obj.item.name] = {}
                        temp.get(obj.item.name)['name'] = obj.item.name
                        temp.get(obj.item.name)['price'] = obj.item.price
                        temp.get(obj.item.name)['category'] = obj.category.name
                data = [v for k, v in temp.items()]
        except  Exception as e:
            print(e)
        return data

    def get_filter_item_list_details(self, request):
        """
        getting the list of all item by calling one function
        :param request: request data
        :return:  returning the list to UI
        """
        responsse_data = self.get_item_list_data(request)
        return json.dumps(responsse_data)