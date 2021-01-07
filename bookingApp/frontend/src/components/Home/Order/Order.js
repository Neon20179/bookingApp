import React, { Component } from 'react'
import Form from './Form'

class Order extends Component {
    render() {
        return (
            <div className="order-container">
                <h2>Make your order</h2>
                <Form />
            </div>
        )
    }
}

export default Order