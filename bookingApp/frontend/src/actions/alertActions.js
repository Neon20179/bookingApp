import { SHOW_ALERT } from './types'

export const showAlert = (alert_info) => dispatch => {
    dispatch({
        type: SHOW_ALERT,
        payload: alert_info
    })
}