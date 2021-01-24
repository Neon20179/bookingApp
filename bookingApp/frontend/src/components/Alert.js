import React, { Component } from 'react'
import { connect } from 'react-redux'

class Alert extends Component {
    render() {
        if (Object.keys(this.props.alert_info).length !== 0) {
            const alert = document.querySelector('.alert')
            const alertType = document.querySelector('.alert h3')
            alert.style.display = "flex"
            alert.style.opacity = 1
            alertType.style.color = this.props.alert_info.color

            setTimeout(() => {
                alert.style.opacity = 0
                setTimeout(() => {
                    alert.style.display = "none"
                }, 1000)
            }, 3000)
        }
        return (
            <div className="alert">
                <h3>{this.props.alert_info.type}</h3>
                <p>{this.props.alert_info.text}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    alert_info: state.alertReducer.alert_info
})

export default connect(mapStateToProps)(Alert)
