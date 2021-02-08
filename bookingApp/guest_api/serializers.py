from rest_framework import serializers
from .models import Room, Reservation, RoomImage


class RoomImageSerializer(serializers.ModelSerializer):
    """ Thumbnail image for room serializer """
    
    class Meta:
        model = RoomImage
        fields = ['id', 'image']


class RoomSerializer(serializers.ModelSerializer):
    """Room serializer"""
    room_image = RoomImageSerializer(many=True)

    class Meta:
        model = Room
        fields = '__all__'


class PostReservationSerializer(serializers.ModelSerializer):
    """Reservation serializer for post request method from guest user"""

    class Meta:
        model = Reservation
        fields = ['room', 'name', 'email', 'phone_number', 'arrival_date', 'leaving_date', 'guests']
