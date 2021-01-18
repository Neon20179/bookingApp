import axios from "axios"
import { GET_ROOM_DATA, RESERVATION_CHECK } from "./types"


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
