import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bookRoom } from '../../actions/guest_actions/guestApi'
import { sendReservationProp } from '../../actions/guest_actions/propActions'
import { handlePhoneNumberKeyBackspaceWrapper, handlePhoneNumberChangeWrapper } from '../supportFunctions'


const { handlePhoneNumberKeyBackspace } = handlePhoneNumberKeyBackspaceWrapper
const { handlePhoneNumberChange } = handlePhoneNumberChangeWrapper

class BookingTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone_number: '',
            email: '',
            guests: '',
            is_backspace: false,
        }
        this.handlePhoneNumberKeyBackspace = handlePhoneNumberKeyBackspace.bind(this)
        this.handlePhoneNumberChange = handlePhoneNumberChange.bind(this)
    }

    handleChange = event => {
        if (event.target.value.length <= 30) {
            this.setState({ [event.target.name]: event.target.value })
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        const reservation = {
            room: this.props.reservation_prop.id,
            price: this.props.reservation_prop.price,
            arrival_date: this.props.reservation_prop.arrival_date,
            leaving_date: this.props.reservation_prop.leaving_date,
            name: this.state.name,
            email: this.state.email,
            guests: this.props.reservation_prop.guests,
            phone_number: this.state.phone_number,
        }
        this.props.bookRoom(reservation)
        this.props.sendReservationProp({})
        this.setState({
            name: '',
            phone_number: '',
            email: '',
            guests: '',
            is_backspace: false,
        })
        const bookingTab = document.querySelector('.booking-tab')
        bookingTab.style.right = '-350px'
    }

    render() {
        if (Object.keys(this.props.reservation_prop).length !== 0) {
            const bookingTab = document.querySelector('.booking-tab')
            bookingTab.style.right = 0
        }
        return (
            <div className="booking-tab">
                <div className="booking-tab-container">
                    <h2>Booking</h2>
                    <form onSubmit={this.handleSubmit}>
                        <img src={this.props.reservation_prop.main_image} alt="" />
                        <h3><font>Room:</font> <span>{this.props.reservation_prop.name}</span></h3>
                        <h5><font>Price:</font> <span>{this.props.reservation_prop.price}&#36;</span></h5>
                        <div className="dates">
                            <div className="date"><font>Arrival date:</font> <span>{this.props.reservation_prop.arrival_date}</span></div>
                            <div className="date"><font>Leaving date:</font> <span>{this.props.reservation_prop.leaving_date}</span></div>
                        </div>
                        <div className="name-input">
                            <input type="text" required autoComplete="off" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                        <div className="phone-number-input">
                            <input type="text" required autoComplete="off" name="phone_number" value={this.state.phone_number} placeholder="X (XXX) XXX-XX-XX" onChange={this.handlePhoneNumberChange} onKeyDown={this.handlePhoneNumberKeyBackspace} />
                        </div>
                        <div className="email-input">
                            <input type="text" required autoComplete="off" name="email" value={this.state.email} placeholder="email@gmail.com" onChange={this.handleChange} />
                        </div>
                        <button className="booking-btn" type="submit">
                            <div className="btn-circle">
                                <div className="btn-arrow"></div>
                            </div>
                            <span className="btn-text">Submit</span>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reservation_prop: state.bookingTabReducer.reservation_prop
})

export default connect(mapStateToProps, { bookRoom, sendReservationProp })(BookingTab)