import { CREATE_RESERVATION, UPDATE_RESERVATION, SEND_RESERVATION_PROP_TO_FORM } from '../../actions/types'


const initialState = {
    action_reservation: {},
    prop_reservation: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_RESERVATION:
            return {
                ...state,
                action_reservation: action.payload
            }
        case UPDATE_RESERVATION:
            return {
                ...state,
                action_reservation: action.payload
            }
        case SEND_RESERVATION_PROP_TO_FORM:
            return {
                ...state,
                prop_reservation: action.payload
            }
        default:
            return state
    }
}