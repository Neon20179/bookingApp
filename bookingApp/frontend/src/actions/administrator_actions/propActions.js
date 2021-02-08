import { SEND_RESERVATION_PROP_TO_FORM } from '../types'


export const sendPropToForm = prop_reservation => dispatch => {
    dispatch({
        type: SEND_RESERVATION_PROP_TO_FORM,
        payload: prop_reservation
    })
}
