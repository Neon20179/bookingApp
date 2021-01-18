import React, { Component } from 'react'
import Rooms from './Rooms'
import Booking from './Booking/Booking'

class Home extends Component {
    render() {
        return (
            <main>
                <h1>Booking App</h1>
                <Rooms />
                <Booking />
            </main>
        )
    }
}

export default Home
