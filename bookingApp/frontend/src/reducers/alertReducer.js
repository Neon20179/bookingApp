import { SHOW_ALERT } from '../actions/types'


const initialState = {
    alert_info: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                alert_info: action.payload
            }

        default:
            return state
    }
}