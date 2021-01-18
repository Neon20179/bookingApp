import React, { Component } from 'react'
import Form from './Form'

class Booking extends Component {
    render() {
        return (
            <section className="booking-section">
                <h2>Book room</h2>
                <Form />
            </section>
        )
    }
}

export default Booking