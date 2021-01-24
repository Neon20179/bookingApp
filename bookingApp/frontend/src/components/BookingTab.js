import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bookRoom } from '../actions/axiosApi'
import { sendReservationProp } from '../actions/propActions'

class BookingTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone_number: '',
            guests: '',
            is_backspace: false,
        }
    }

    handlePhoneNumberKey = event => {
        if (event.keyCode == 8 || event.charCode == 46) {
            this.setState({ is_backspace: true })
        } else {
            this.setState({ is_backspace: false })
        }
    }

    handlePhoneNumberChange = event => {
        String.prototype.splice = function (from, num, str) {
            return this.slice(0, from) + str + this.slice(from + Math.abs(num));
        };

        let value = event.target.value.replace(/[^0-9.]/g, '');
        if (!this.state.is_backspace) {
            if (value.length < 12) {
                if (value.length > 1) {
                    value = value.splice(1, 0, ' ')
                    value = value.splice(2, 0, '(')
                    if (value.length > 6) {
                        value = value.splice(6, 0, ')')
                        if (value.length > 7) {
                            value = value.splice(7, 0, ' ')
                            if (value.length > 11) {
                                value = value.splice(11, 0, '-')
                                if (value.length > 14) {
                                    value = value.splice(14, 0, '-')
                                }
                            }
                        }
                    }
                }
                this.setState({ phone_number: value });
            }
        } else {
            this.setState({ phone_number: value });
        }
    }

    handleNameChange = event => {
        if (event.target.value.length <= 30) {
            this.setState({ name: event.target.value })
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
            guests: this.props.reservation_prop.guests,
            phone_number: this.state.phone_number,
        }
        this.props.bookRoom(reservation)
        this.props.sendReservationProp({})
        this.setState({
            name: '',
            phone_number: '',
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
                            <input type="text" required autoComplete="off" name="name" placeholder="Name" value={this.state.name} onChange={this.handleNameChange} />
                        </div>
                        <div className="phone-number-input">
                            <input type="text" required autoComplete="off" name="phone_number" value={this.state.phone_number} placeholder="X (XXX) XXX-XX-XX" onChange={this.handlePhoneNumberChange} onKeyDown={this.handlePhoneNumberKey} />
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