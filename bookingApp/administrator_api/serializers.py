from rest_framework import serializers
from guest_api.models import Reservation


class ReservationSerializer(serializers.ModelSerializer):
    """ Serializer for reservations """
    
    class Meta:
        model = Reservation
        fields = '__all__'
