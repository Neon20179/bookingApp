from django.test import TestCase
from datetime import datetime
from api.models import RoomImage, Room, get_upload_path


class RoomImageTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Room.objects.create(name="Base", price=10000, main_image="/image_path/Room/img.jpg", show=True)
        RoomImage.objects.create(name="test_image", image="image_path/my_image.png", room=Room.objects.get(id=1))

    def test_str(self):
        room_image = RoomImage.objects.get(id=1)
        expacted_objact_name = "test_image: /media/image_path/my_image.png"
        self.assertEqual(expacted_objact_name, str(room_image))


class SupportFunctionsTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Room.objects.create(name="Base", price=10000, main_image="/image_path/Room/img.jpg", show=True)

    def test_get_upload_path(self):
        now = datetime.now()
        room = Room.objects.get(id=1)
        expacted_path = f"Room/{now.year}/{now.month}/{now.day}/img.jpg"
        self.assertEqual(expacted_path, get_upload_path(room, "img.jpg"))
