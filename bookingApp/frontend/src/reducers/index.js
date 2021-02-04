import { combineReducers } from "redux"
// GUEST
import roomReducer from './guest_reducers/roomReducer'
import bookingTabReducer from './guest_reducers/bookingTabReducer'
// ADMINISTRATOR
import tableReducers from './administrator_reducers/tableReducers'
import reservationFormReducers from './administrator_reducers/reservationFormReducer'
//ALL
import alertReducer from './alertReducer'

export default combineReducers({
    roomReducer,
    bookingTabReducer,
    tableReducers,
    reservationFormReducers,
    alertReducer
})
