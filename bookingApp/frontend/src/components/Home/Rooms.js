import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRoomData } from '../../actions/axiosApi'
import PropTypes from "prop-types"

class Rooms extends Component {
    static propTypes = {
        roomData: PropTypes.array.isRequired,
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log("submit!", event)
    }

    componentDidMount() {
        this.props.getRoomData()
    }

    render() {
        let image_idx = 0
        return (
            <div className="rooms">
                {this.props.roomData.map(room => (
                    <div className="single-room-container" key={room.id}>
                        <img src={room.main_image} alt="" />
                        <h3>{room.name}</h3>
                        {room.room_image.map(image => {
                            image_idx++
                            return (
                                <div className="thumbnail-img-container" key={image_idx}>
                                    <img src={image.split(" ")[1]}></img>
                                    <h4>{image.split(" ")[0]}</h4>
                                </div>
                            )
                        })}
                        <h5>{room.price}</h5>
                    </div>
                )
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    roomData: state.roomReducer.roomData
})

export default connect(mapStateToProps, { getRoomData })(Rooms)
