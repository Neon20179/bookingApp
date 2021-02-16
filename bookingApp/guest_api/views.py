from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Room
from .serializers import RoomSerializer, PostReservationSerializer
from .api_support_functions import _can_be_booked, _room_is_free, _get_actual_reservations, _get_now_date


class RoomViewSet(generics.ListAPIView):
    """ Returns all rooms. """
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


@api_view(["GET"])
def reservation_check_for_free_rooms(request):
    """ Reservation check for free rooms. It returns rooms that are not occupied on the request date. """
    arrival_data = request.query_params.get("arrival_date")
    leaving_date = request.query_params.get("leaving_date")
    if leaving_date > arrival_data >= _get_now_date():
        reservations = list(
            filter(lambda reserv: not _can_be_booked(reserv, arrival_data, leaving_date), _get_actual_reservations()))
        room_ids_of_reservations = [reserv.room.id for reserv in reservations]
        free_rooms = [room for room in Room.objects.all() if room.id not in room_ids_of_reservations]
        serializer = RoomSerializer(free_rooms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def book_room(request):
    """ Creates new reservation. """
    if request.data["leaving_date"] > request.data["arrival_date"] >= _get_now_date():
        if request.data['guests'] <= Room.objects.get(pk=request.data['room']).guests:
            if _room_is_free(_get_actual_reservations(), request):
                serializer = PostReservationSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
