import { combineReducers } from "redux"
import roomReducer from './roomReducer'
import bookingTabReducer from './bookingTabReducer'
import alertReducer from './alertReducer'

export default combineReducers({
    roomReducer,
    bookingTabReducer,
    alertReducer
})
