import { RESERVATION_PROP, BOOK_ROOM } from '../../actions/types'


const initialState = {
    reservation_prop: {},
    book_room: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RESERVATION_PROP:
            return {
                ...state,
                reservation_prop: action.payload
            }
        case BOOK_ROOM:
            return {
                ...state,
                book_room: action.payload
            }
        default: {
            return state
        }
    }
}
