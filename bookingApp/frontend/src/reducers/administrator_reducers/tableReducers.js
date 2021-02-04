import { GET_RESERVATIONS, GET_ROOM_DATA } from '../../actions/types'


const initialState = {
    reservations: [],
    rooms: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RESERVATIONS:
            return {
                ...state,
                reservations: action.payload

            }
        case GET_ROOM_DATA:
            return {
                ...state,
                rooms: action.payload

            }
        default:
            return state

    }
} 