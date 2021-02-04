import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import { getRoomData } from '../../../actions/guest_actions/guestApi'


class Rooms extends Component {
    static propTypes = {
        roomData: PropTypes.array.isRequired,
    }

    componentDidMount() {
        this.props.getRoomData()

        const leftController = document.querySelector('.controller-left')
        const rightController = document.querySelector('.controller-right')
        let idx = 0

        const prevSlide = () => {
            const images = document.querySelectorAll('.slides .room-slide')
            images[idx].classList.remove('active')
            idx = (idx - 1 + images.length) % images.length
            images[idx].classList.add('active')
        }

        const nextSlide = () => {
            const images = document.querySelectorAll('.slides .room-slide')
            images[idx].classList.remove('active')
            idx = (idx + 1) % images.length
            images[idx].classList.add('active')
        }

        leftController.addEventListener('click', prevSlide)
        rightController.addEventListener('click', nextSlide)

    }

    render() {
        return (
            <section className="rooms-section">
                <div className="container">
                    <div className="slider">
                        <div className="slides">
                            {this.props.roomData.map(room => {
                                if (this.props.roomData.indexOf(room) == 0) {
                                    return (
                                        <div className="room-slide active" key={room.id}>
                                            <div className="single-room-container">
                                                <img src={room.main_image} alt="" />
                                                <div className="content">
                                                    <h3>{room.name}</h3>
                                                    <p>{room.description}</p>
                                                    <h5>guests: {room.guests}</h5>
                                                    <h5>price: {room.price}&#36;</h5>
                                                </div>
                                            </div>
                                        </div>)
                                } else {
                                    return (<div className="room-slide" key={room.id}>
                                        <div className="single-room-container">
                                            <img src={room.main_image} alt="" />
                                            <div className="content">
                                                <h3>{room.name}</h3>
                                                <p>{room.description}</p>
                                                <h5>guests: {room.guests}</h5>
                                                <h5>price: {room.price}&#36;</h5>
                                            </div>
                                        </div>
                                    </div>)
                                }
                            }
                            )}
                        </div>
                        <div className="controllers">
                            <div className="controller-left">
                                <div className="arrow-head-left"></div>
                            </div>

                            <div className="controller-right">
                                <div className="arrow-head-right"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    roomData: state.roomReducer.roomData
})

export default connect(mapStateToProps, { getRoomData })(Rooms)
