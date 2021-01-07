from datetime import datetime, timedelta

from django.test import TestCase

from api.models import Reservation, Room


class TestBooking(TestCase):
    def test_reservation_check(self):
        response_no_method = self.client.get("/api/reservation_check/")
        self.assertEqual(response_no_method.status_code, 405)

        response_arr_b_leaving = self.client.post("/api/reservation_check/", {"arrival_date": f"{datetime.now() + timedelta(days=1)}", "leaving_date": f"{datetime.now()}"})
        self.assertEqual(response_arr_b_leaving.status_code, 400)

        response_ok = self.client.post("/api/reservation_check/", {"arrival_date": f"{datetime.now()}", "leaving_date": f"{datetime.now() + timedelta(days=1)}"})
        self.assertEqual(response_ok.status_code, 200)

    def test_book_room(self):
        response_no_method = self.client.get("/api/book_room/")
        self.assertEqual(response_no_method.status_code, 405)

        post_data_400 = {
            "name": "Neon",
            "phone_number": 123,
            "room": 2,
            "arrival_date": f"{datetime.now() + timedelta(days=1)}",
            "leaving_date": f"{datetime.now()}",
            "guests": 1
        }

        post_data_200 = {
            "name": "Neon",
            "phone_number": 123,
            "room": 2,
            "arrival_date": f"{datetime.now()}",
            "leaving_date": f"{datetime.now() + timedelta(days=1)}",
            "guests": 1
        }

        response_arr_b_leaving = self.client.post("/api/reservation_check/", post_data_400)
        self.assertEqual(response_arr_b_leaving.status_code, 400)

        response_ok = self.client.post("/api/reservation_check/", post_data_200)
        self.assertEqual(response_ok.status_code, 200)
