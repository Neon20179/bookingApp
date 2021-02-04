import { SEND_RESERVATION_PROP_TO_FORM, UPDATE_TABLE_RESERVATION } from '../types'


export const sendPropToForm = prop_reservation => dispatch => {
    dispatch({
        type: SEND_RESERVATION_PROP_TO_FORM,
        payload: prop_reservation
    })
}

export const updateTableReservation = action_reservation => dispatch => {
    dispatch({
        type: UPDATE_TABLE_RESERVATION,
        payload: action_reservation
    })
}
