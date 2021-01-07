from rest_framework import serializers
from .models import Room, Reservation


class RoomSerializer(serializers.ModelSerializer):
    """Room serializer"""
    room_image = serializers.StringRelatedField(many=True)

    class Meta:
        model = Room
        fields = '__all__'


class PostReservationSerializer(serializers.ModelSerializer):
    """Reservation serializer for post request method from guest user"""
    class Meta:
        model = Reservation
        fields = '__all__'
