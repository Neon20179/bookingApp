from django.db import models
from datetime import datetime

def get_upload_path(instance, filename):
    now = datetime.now()
    return f'{instance.__class__.__name__}/{now.year}/{now.month}/{now.day}/{filename}'


class Room(models.Model):
    """Room model"""
    name = models.CharField('Name', max_length=255)
    price = models.PositiveIntegerField('Price')
    main_image = models.ImageField('Main image', upload_to=get_upload_path)
    show = models.BooleanField('Show', default=True)

    def __str__(self):
        return self.name


class Reservation(models.Model):
    """Booking order model"""
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, related_name='order_room', blank=True)
    name = models.CharField('Name', max_length=255)
    phone_number = models.PositiveIntegerField('Phone number')
    arrival_date = models.DateField('Arrival Date', blank=True, null=True)
    leaving_date = models.DateField('Leaving Date', blank=True, null=True)
    guests = models.PositiveIntegerField('Guests')

    def __str__(self):
        return f'Name: {self.name} / Room: {self.room}' 


class RoomImage(models.Model):
    """Thumbnail image for room"""
    name = models.CharField('Name', max_length=255)
    image = models.ImageField('Image', upload_to=get_upload_path)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='room_image', null=True)

    def __str__(self):
        return f'{self.name}: /media/{self.image}'
