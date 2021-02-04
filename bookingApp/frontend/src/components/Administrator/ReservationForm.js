import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendPropToForm } from '../../actions/administrator_actions/propActions'
import { createReservation, updateReservation } from '../../actions/administrator_actions/administratorApi'
import { handlePhoneNumberKeyBackspaceWrapper, handlePhoneNumberChangeWrapper, objectsAreEqual } from '../supportFunctions'


const { handlePhoneNumberKeyBackspace } = handlePhoneNumberKeyBackspaceWrapper
const { handlePhoneNumberChange } = handlePhoneNumberChangeWrapper

const initialState = {
    id: "",
    name: "",
    email: "",
    phone_number: "",
    arrival_date: "",
    leaving_date: "",
    guests: "",
    room: "",
    accepted: true,
    mode: "Create"
}

class ReservationForm extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
        this.handlePhoneNumberKeyBackspace = handlePhoneNumberKeyBackspace.bind(this)
        this.handlePhoneNumberChange = handlePhoneNumberChange.bind(this)
    }

    componentDidUpdate(nextProp) {
        if (!objectsAreEqual(nextProp.reservation, this.props.reservation)) {
            this.setState(this.props.reservation)
        }
    }

    openTab() {
        const reservationTab = document.querySelector('.admin-reservation-form-tab .wrapper')
        reservationTab.style.bottom = 0
    }

    openTabInCreateMode = () => {
        this.openTab()
        this.setState(initialState)
    }

    closeTab() {
        const reservationTab = document.querySelector('.admin-reservation-form-tab .wrapper')
        reservationTab.style.bottom = "-450px"
    }

    handleAccept = () => {
        this.setState({ accepted: !this.state.accepted })
        document.querySelector('.accept-input').checked = !this.state.accepted
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault()
        if (this.state.mode === "Edit") {
            this.props.updateReservation(this.state, this.state.id)
            this.closeTab()
        } else if (this.state.mode === "Create") {
            this.props.createReservation(this.state)

            this.closeTab()
        }
    }

    render() {
        if (Object.keys(this.props.reservation).length !== 0) {
            this.openTab()
        }
        return (
            <div className="admin-reservation-form-tab">
                <button className="control-btn open-btn" onClick={this.openTabInCreateMode}>create</button>
                <div className="wrapper">
                    <button className="control-btn close-btn" onClick={this.closeTab}>close &#x2715;</button>
                    <div className="container">
                        <h2>{this.state.mode}</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="info">
                                <div className="contact-info">
                                    <h3>Contact info</h3>
                                    <input type="text" required className="text-input" value={this.state.name} name="name" onChange={this.handleChange} placeholder="Name" />
                                    <input type="text" required className="text-input" value={this.state.phone_number} name="phone_number" placeholder="X (XXX) XXX-XX-XX" onChange={this.handlePhoneNumberChange} onKeyDown={this.handlePhoneNumberKeyBackspace} />
                                    <input type="text" required className="text-input" value={this.state.email} name="email" onChange={this.handleChange} placeholder="email@gmail.com" />
                                </div>
                                <div className="dates">
                                    <h3>Dates</h3>
                                    <input type="date" required className="date-input" name="arrival_date" value={this.state.arrival_date} onChange={this.handleChange} />
                                    <input type="date" required className="date-input" name="leaving_date" value={this.state.leaving_date} onChange={this.handleChange} />
                                </div>
                                <div className="extra">
                                    <h3>Additional info</h3>
                                    <input type="text" required className="text-input" name="room" value={this.state.room} onChange={this.handleChange} placeholder="Room id" />
                                    <input type="text" required className="text-input" name="guests" value={this.state.guests} onChange={this.handleChange} placeholder="Guests" />
                                </div>
                            </div>
                            <div className="buttons">
                                <button className="submit-btn" type="submit">
                                    <div className="btn-circle">
                                        <div className="btn-arrow"></div>
                                    </div>
                                    <span className="btn-text">Submit</span>
                                </button>
                                <div className="accept-input">
                                    <label>
                                        <input type="radio" name="accepted" id="accept" className="accept-input" checked={this.state.accepted} value={this.state.accepted} onClick={this.handleAccept} readOnly />
                                        <span>Confirm reservation</span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    reservation: state.reservationFormReducers.prop_reservation
})

export default connect(mapStateToProps, { sendPropToForm, createReservation, updateReservation })(ReservationForm)