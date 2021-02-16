from datetime import datetime

from .models import Reservation


def _get_now_date() -> str:
    """ Get today date in YYYY-MM-DD """
    return str(datetime.today().strftime('%Y-%m-%d'))


def _is_not_expired(reservation: Reservation) -> bool:
    return True if str(reservation.leaving_date) >= _get_now_date() else False


def _get_actual_reservations() -> list:
    """ It returns reservations that are not expired. """
    return list(filter(lambda reserv: _is_not_expired(reserv), list(Reservation.objects.all())))


def _can_be_booked(reservation: Reservation, user_arrival_date, user_leaving_date) -> bool:
    if user_arrival_date >= str(reservation.leaving_date) or user_leaving_date <= str(
            reservation.arrival_date):
        return True
    else:
        return False


def _room_is_free(reservations, request) -> bool:
    """ Checks if the room is free """
    same_reservations = [rv for rv in reservations if
                         rv.room.id == request.data["room"] and not _can_be_booked(rv, request.data["arrival_date"],
                                                                                   request.data["leaving_date"])]
    return True if not same_reservations else False
