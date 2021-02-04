import axios from 'axios'
import { GET_RESERVATIONS, UPDATE_RESERVATION, CREATE_RESERVATION } from '../types'
import { showAlert } from '../alertActions'


export const getReservations = () => dispatch => {
    axios.get('/administrator_api/reservations/')
        .then(res =>
            dispatch({
                type: GET_RESERVATIONS,
                payload: res.data
            })
        )
        .catch(err => dispatch(
            showAlert({
                type: "ERROR",
                text: `Something went wrong. Error ${err}`,
                color: "red"
            })
        ))
}

export const createReservation = (data) => dispatch => {
    axios.post('/administrator_api/reservations/', data)
        .then(res => {
            dispatch({
                type: CREATE_RESERVATION,
                payload: res.data
            })
            dispatch(
                showAlert({
                    type: "OK",
                    text: "You are successfully created new reservation",
                    color: "green"
                })
            )
        }).catch(err => dispatch(
            showAlert({
                type: "ERROR",
                text: `Something went wrong. Error ${err}`,
                color: "red"
            })
        ))
}

export const updateReservation = (data, pk) => dispatch => {
    axios.patch(`/administrator_api/reservations/${pk}/`, data)
        .then(res => {
            dispatch({
                type: UPDATE_RESERVATION,
                payload: res.data
            })
            dispatch(
                showAlert({
                    type: "OK",
                    text: "You are successfully update reservation",
                    color: "green"
                })
            )
        }
        ).catch(err =>
            dispatch(
                showAlert({
                    type: "ERROR",
                    text: `Something went wrong. Error ${err}`,
                    color: "red"
                })
            )
        )
}
