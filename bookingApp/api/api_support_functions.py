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


def _can_be_booked(reservation: Reservation, request) -> bool:
    if request.data["arrival_date"] >= _get_now_date():
        if request.data["arrival_date"] >= str(reservation.leaving_date) or request.data["leaving_date"] <= str(
                reservation.arrival_date):
            return True
        else:
            return False
    else:
        return False


def _room_is_free(reservations, request) -> bool:
    same_reservations = [rv for rv in reservations if
                         rv.room.id == request.data["room"] and not _can_be_booked(rv, request)]
    return True if not same_reservations else False
