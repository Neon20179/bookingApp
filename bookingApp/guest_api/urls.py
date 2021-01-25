from django.urls import path
from .views import get_rooms, book_room, reservation_check_for_free_rooms


urlpatterns = [
    path('rooms/', get_rooms),
    path('book_room/', book_room),
    path('reservation_check/', reservation_check_for_free_rooms)
]
