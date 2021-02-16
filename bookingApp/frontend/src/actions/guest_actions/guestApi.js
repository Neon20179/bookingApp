import axios from "axios"
import { BOOK_ROOM, GET_ROOM_DATA, RESERVATION_CHECK } from "../types"
import { showAlert } from '../alertActions'


export const getRoomData = () => (dispatch) => {
    axios.get("/guest_api/rooms/")
        .then(res => {
            dispatch({
                type: GET_ROOM_DATA,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(showAlert({
                type: "ERROR",
                color: "red",
                text: `Check your internet connection Error: (${err})`
            }))
        })
}


export const reservationCheck = (arrival_date, leaving_date) => (dispatch) => {
    axios.get(`/guest_api/reservation_check/?arrival_date=${arrival_date}&leaving_date=${leaving_date}`)
        .then(res => {
            dispatch({
                type: RESERVATION_CHECK,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}


export const bookRoom = (reservation) => dispatch => {
    axios.post("/guest_api/book_room/", reservation)
        .then(res => {
            dispatch({
                type: BOOK_ROOM,
                payload: res.data
            })
            dispatch(
                showAlert({
                    type: "OK",
                    color: "green",
                    text: "You have successfully booked a room"
                })
            )
        })
        .catch(err => {
            dispatch(showAlert({
                type: "ERROR",
                color: "red",
                text: `Something went wrong. Error: ${err}`
            }))
        })
}
