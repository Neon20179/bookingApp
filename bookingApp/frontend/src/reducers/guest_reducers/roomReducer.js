import { GET_ROOM_DATA, RESERVATION_CHECK } from '../../actions/types'


const initialState = {
    roomData: [],
    free_rooms: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ROOM_DATA:
            return {
                ...state,
                roomData: action.payload
            }
        case RESERVATION_CHECK:
            return {
                ...state,
                free_rooms: action.payload
            }
        default: {
            return state
        }
    }
}
