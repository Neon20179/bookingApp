import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getReservationData } from '../../../actions/axiosApi'

class Form extends Component {
    handleSubmit(event) {
        event.preventDefault()

    }

    componentDidMount() {
        this.props.getReservationData()
    }

    render() {
        return (
            <div className="order-form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className=""></div>
                    <button value="" type="submit">Find</button>
                </form>
                <div className="reservationDataResult">

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reservationData: state.roomReducer.reservationData
})

export default connect(mapStateToProps, { getReservationData })(Form)
