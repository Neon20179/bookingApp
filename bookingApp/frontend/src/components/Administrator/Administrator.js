import React, { Component } from 'react'
import Table from './ReservationTable/Table'
import ReservationForm from './ReservationForm'

class Administrator extends Component {
    render() {
        return (
            <main className="administrator">
                <h1>Reservations</h1>
                <Table />
                <ReservationForm />
            </main>
        )
    }
}

export default Administrator
