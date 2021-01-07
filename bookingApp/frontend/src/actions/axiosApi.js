import axios from "axios"
import { GET_ROOM_DATA, GET_RESERVATION_DATA } from "./types"


export const getRoomData = () => (dispatch) => {
    axios.get("/api/rooms/")
        .then(res => {
            dispatch({
                type: GET_ROOM_DATA,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}


export const getReservationData = () => (dispatch) => {
    axios.get("/api/orders/")
        .then(res => {
            dispatch({
                type: GET_RESERVATION_DATA,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}
