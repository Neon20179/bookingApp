from django.urls import path
from .views import RoomViewSet, book_room, reservation_check_for_free_rooms

urlpatterns = [
    path('rooms/', RoomViewSet.as_view()),
    path('book_room/', book_room),
    path('reservation_check/', reservation_check_for_free_rooms),
]
