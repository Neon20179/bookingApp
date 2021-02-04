import React, { Component } from 'react'
import BookingTab from './BookingTab'
import Home from './Home/Home'

class Guest extends Component {
    render() {
        return (
            <main>
                <BookingTab />
                <Home />
            </main>
        )
    }
}

export default Guest
