import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import { reservationCheck } from '../../../actions/guest_actions/guestApi'
import { sendReservationProp } from '../../../actions/guest_actions/propActions'


class BookingForm extends Component {
    static propTypes = {
        free_rooms: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {
            arrival_date: '',
            leaving_date: ''
        }
    }

    handleChange = event => this.setState({ [event.target.name]: event.target.value });

    handleSubmit = event => {
        event.preventDefault()
        this.props.reservationCheck(this.state)
    }

    sendFreeRoomPropToBookingTab = free_room => {
        const reservation_prop = Object.assign({}, this.state, free_room)
        this.props.sendReservationProp(reservation_prop)
    }

    render() {
        const { arrival_date, leaving_date } = this.state
        return (
            <section className="booking-section">
                <div className="booking-form-container">
                    <form onSubmit={this.handleSubmit}>
                        <input type="date" name="arrival_date" required onChange={this.handleChange} value={arrival_date} />
                        <input type="date" name="leaving_date" required onChange={this.handleChange} value={leaving_date} />
                        <button value="" type="submit">Find</button>
                    </form>
                    {this.props.free_rooms.length !== 0 ?
                        <div className="reservation-data-result">
                            {this.props.free_rooms.map(free_room => (
                                <div className="reservation-data-result__block" key={free_room.id}>
                                    <img src={free_room.main_image} alt="" />
                                    <div className="thumbnail-images">
                                        {free_room.room_image.map(thumbnailImage => {
                                            return (
                                                <div className="thumbnail-image">
                                                    <img src={thumbnailImage.image} key={thumbnailImage.id}></img>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <h3>{free_room.name}</h3>
                                    <h5>price: {free_room.price}&#36;</h5>
                                    <button className="booking-btn" onClick={() => this.sendFreeRoomPropToBookingTab(free_room)}>
                                        Book room
                                </button>
                                </div>
                            ))}
                        </div>
                        : <h2>select booking dates</h2>}
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    free_rooms: state.roomReducer.free_rooms
})

export default connect(mapStateToProps, { reservationCheck, sendReservationProp })(BookingForm)
