import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import { reservationCheck } from '../../../actions/axiosApi'


class Form extends Component {
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
        const { arrival_date, leaving_date } = this.state
        const dates = { arrival_date, leaving_date }
        this.props.reservationCheck(dates)
    }

    render() {
        const { arrival_date, leaving_date } = this.state
        let thumbnailIdx = 0
        return (
            <div className="booking-form-container">
                <form onSubmit={this.handleSubmit}>
                    <input type="date" name="arrival_date" required onChange={this.handleChange} value={arrival_date} />
                    <input type="date" name="leaving_date" required onChange={this.handleChange} value={leaving_date} />
                    <button value="" type="submit">Find</button>
                </form>
                <div className="reservation-data-result">
                    {this.props.free_rooms.map(free_room => (
                        <div className="reservation-data-result__block" key={free_room.id}>
                            <img src={free_room.main_image} alt="" />
                            <div className="thumbnail-images">
                                {free_room.room_image.map(thumbnailImage => {
                                    thumbnailIdx++
                                    return (
                                        <div className="thumbnail-image">
                                            <img src={thumbnailImage.split(': ')[1]} key={thumbnailIdx}></img>
                                        </div>
                                    )
                                })}
                            </div>
                            <h3>{free_room.name}</h3>
                            <h5>price: {free_room.price}&#36;</h5>
                            <a className="booking-btn">
                                <div className="btn-circle">
                                    <div className="btn-arrow"></div>
                                </div>
                                <span className="btn-text">Book room</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    free_rooms: state.roomReducer.free_rooms
})

export default connect(mapStateToProps, { reservationCheck })(Form)
