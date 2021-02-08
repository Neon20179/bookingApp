import React, { Component } from 'react'
import Rooms from './Rooms'
import BookingForm from './BookingForm'

class Home extends Component {
    render() {
        return (
            <main>
                <Rooms />
                <BookingForm />
            </main>
        )
    }
}

export default Home
