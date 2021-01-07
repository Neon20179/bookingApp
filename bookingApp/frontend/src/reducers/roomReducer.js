import { GET_ROOM_DATA, GET_RESERVATION_DATA } from '../actions/types'


const initialState = {
    roomData: [],
    reservation_data: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ROOM_DATA:
            return {
                ...state,
                roomData: action.payload
            }
        case GET_RESERVATION_DATA:
            return {
                ...state,
                reservation_data: action.payload
            }
        default: {
            return state
        }
    }
}
