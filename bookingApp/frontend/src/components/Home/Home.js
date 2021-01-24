import React, { Component } from 'react'
import Rooms from './Rooms'
import Booking from './Booking/Booking'

class Home extends Component {
    render() {
        return (
            <main>
                <Rooms />
                <Booking />
            </main>
        )
    }
}

export default Home
