import React, { Component } from "react"
import { connect } from 'react-redux'
import { getReservations } from '../../../actions/administrator_actions/administratorApi'
import { getRoomData } from '../../../actions/guest_actions/guestApi'
import { sendPropToForm } from '../../../actions/administrator_actions/propActions'
import { reservationDataInit, reservationTableInit, createSingleDataBlock, getCell } from './tableInit'


class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableInit: false
        }
    }

    componentDidMount() {
        this.props.getRoomData()
        this.props.getReservations()
    }

    dataInit = () => {
        const reservationTable = document.querySelector(".reservationTable")
        const cells = document.querySelectorAll("td");
        const table = document.querySelector(".table-container table");

        reservationDataInit(this.props.reservations, cells, table, reservationTable, this.props.sendPropToForm)
    }

    componentDidUpdate() {
        // FIRST UPDATE
        if (this.state.tableInit === false) {
            if (Object.keys(this.props.reservations).length !== 0 && Object.keys(this.props.rooms).length !== 0) {
                const roomNames = this.props.rooms.map(room => room.name)
                const roomIds = this.props.rooms.map(room => room.id)
                reservationTableInit(roomNames, roomIds)
                this.dataInit()
                this.setState({
                    tableInit: true
                })
            }
        }

        // UPDATE SINGLE BLOCK
        if (Object.keys(this.props.action_reservation).length !== 0 && this.state.tableInit === true) {
            const oldDataBlock = document.getElementById(`${this.props.action_reservation.id}`)
            const table = document.querySelector("table")

            if (oldDataBlock) {
                oldDataBlock.remove()
            }
            const cells = document.querySelectorAll("td")
            const cell = getCell(this.props.action_reservation, cells)

            createSingleDataBlock(this.props.action_reservation, table, this.props.sendPropToForm, cell)
        }
    }

    render() {
        return (
            <div className="reservationTable">
                <div className="table-wrapper">
                    <div className="nav-container"></div>
                    <div className="table-container"></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    reservations: state.tableReducers.reservations.sort(function (a, b) {
        return ('' + `${a.room}-${a.arrival_date}`).localeCompare(`${b.room}-${b.arrival_date}`);
    }),
    rooms: state.tableReducers.rooms,
    action_reservation: state.reservationFormReducers.action_reservation
})


export default connect(mapStateToProps, { getReservations, getRoomData, sendPropToForm })(Table)
