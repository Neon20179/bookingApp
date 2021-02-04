import { RESERVATION_PROP } from '../types'

export const sendReservationProp = reservation_prop => dispatch => {
    dispatch({
        type: RESERVATION_PROP,
        payload: reservation_prop
    })
}