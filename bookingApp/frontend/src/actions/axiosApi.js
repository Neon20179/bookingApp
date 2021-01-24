import axios from "axios"
import { BOOK_ROOM, GET_ROOM_DATA, RESERVATION_CHECK } from "./types"
import { showAlert } from './alertActions'


export const getRoomData = () => (dispatch) => {
    axios.get("/api/rooms/")
        .then(res => {
            res.data.reverse()
            dispatch({
                type: GET_ROOM_DATA,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}


export const reservationCheck = (dates) => (dispatch) => {
    axios.post("/api/reservation_check/", dates)
        .then(res => {
            res.data.reverse()
            dispatch({
                type: RESERVATION_CHECK,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}


export const bookRoom = (reservation) => dispatch => {
    axios.post("/api/book_room/", reservation)
        .then(res => {
            dispatch({
                type: BOOK_ROOM,
                payload: res.data
            })
            dispatch(showAlert({
                type: "OK",
                color: "green",
                text: "You have successfully booked a room"
            }))
        })
        .catch(err => {
            dispatch(showAlert({
                type: "ERROR",
                color: "red",
                text: `Something went wrong. Error: ${err}`
            }))
        })
}
