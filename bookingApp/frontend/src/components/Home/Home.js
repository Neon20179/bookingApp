import React, { Component } from 'react'
import Rooms from './Rooms'
import Order from './Order/Order'

class Home extends Component {
    render() {
        return (
            <main>
                <h1>Home</h1>
                <Order />
                <Rooms />

            </main>
        )
    }
}

export default Home
